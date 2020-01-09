const options = require("./options");
const { merge, pipe, assoc, omit, __ } = require("ramda");

const REACT_NATIVE_VERSION = '0.61.0'

/**
 * Is Android installed?
 *
 * $ANDROID_HOME/tools folder has to exist.
 *
 * @param {*} context - The gluegun context.
 * @returns {boolean}
 */
const isAndroidInstalled = function(context) {
	const androidHome = process.env["ANDROID_HOME"];
	const hasAndroidEnv = !context.strings.isBlank(androidHome);
	const hasAndroid = hasAndroidEnv && context.filesystem.exists(`${androidHome}/tools`) === "dir";

	return Boolean(hasAndroid);
};

/**
 * Let's install.
 *
 * @param {any} context - The gluegun context.
 */
async function install(context) {
	const { filesystem, parameters, ignite, reactNative, print, system, prompt, template } = context;
	const { colors } = print;
	const { red, yellow, bold, gray, blue } = colors;

	const perfStart = new Date().getTime();

	const name = parameters.first
	const spinner = print.spin(`using the ${red("Axenu")} Ignite boilerplate ${red(name)}`).succeed();

	// attempt to install React Native or die trying
	const rnInstall = await reactNative.install({
		name,
		version: REACT_NATIVE_VERSION,
	});
	if (rnInstall.exitCode > 0) process.exit(rnInstall.exitCode);

	// copy our App, Tests & storybook directories
	spinner.text = "▸ copying files";
	spinner.start();
	filesystem.copy(`${__dirname}/boilerplate/src`, `${process.cwd()}/src`, {
		overwrite: true,
		matching: "!*.ejs",
	});
  
	spinner.stop();

	// --max, --min, interactive
	let answers;
	if (parameters.options.max) {
		answers = options.answers.max;
	} else if (parameters.options.min) {
		answers = options.answers.min;
	} else {
		answers = await prompt.ask(options.questions);
	}

	// generate some templates
	spinner.text = "▸ generating files";
	const templates = [
		{ template: "index.js.ejs", target: "index.js" },
		{ template: "App.js", target: "App.js" },
		{ template: "README.md", target: "README.md" },
		{ template: "ignite.json.ejs", target: "ignite/ignite.json" },
		{ template: ".editorconfig", target: ".editorconfig" },
		{ template: ".eslintrc.js", target: ".eslintrc.js" },
		// { template: "Tests/Setup.js.ejs", target: "Tests/Setup.js" },
		// { template: "storybook/storybook.ejs", target: "storybook/storybook.js" },
	];
	const templateProps = {
		name,
		igniteVersion: ignite.version,
		reactNativeVersion: rnInstall.version,
	};
	await ignite.copyBatch(context, templates, templateProps, {
		quiet: true,
		directory: `${ignite.ignitePluginPath()}/boilerplate`,
	});

	/**
   * Append to files
   */
	// https://github.com/facebook/react-native/issues/12724
	filesystem.appendAsync(".gitattributes", "*.bat text eol=crlf");

	/**
   * Merge the package.json from our template into the one provided from react-native init.
   */
	async function mergePackageJsons() {
		// transform our package.json in case we need to replace variables
		const rawJson = await template.generate({
			directory: `${ignite.ignitePluginPath()}/boilerplate`,
			template: "package.json.ejs",
			props: templateProps,
		});
		const newPackageJson = JSON.parse(rawJson);

		// read in the react-native created package.json
		const currentPackage = filesystem.read("package.json", "json");

		// deep merge, lol
		const newPackage = pipe(
			assoc("dependencies", merge(currentPackage.dependencies, newPackageJson.dependencies)),
			assoc("devDependencies", merge(currentPackage.devDependencies, newPackageJson.devDependencies)),
			assoc("scripts", merge(currentPackage.scripts, newPackageJson.scripts)),
			merge(__, omit(["dependencies", "devDependencies", "scripts"], newPackageJson))
		)(currentPackage);

		// write this out
		filesystem.write("package.json", newPackage, { jsonIndent: 2 });
	}
	await mergePackageJsons();

	spinner.stop();

	// pass long the debug flag if we're running in that mode
	const debugFlag = parameters.options.debug ? "--debug" : "";

	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	// NOTE(steve): I'm re-adding this here because boilerplates now hold permanent files
	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	try {
		// boilerplate adds itself to get plugin.js/generators etc
		// Could be directory, npm@version, or just npm name.  Default to passed in values
		const boilerplate = parameters.options.b || parameters.options.boilerplate || "ignite-ir-boilerplate";

		await system.spawn(`ignite add ${boilerplate} ${debugFlag}`, { stdio: "inherit" });

    spinner.text = `▸ adding react-native-vector-icons`
    spinner.start()
		await system.spawn(`ignite add ${ignite.ignitePluginPath()}/plugins/ignite-vector-icons-axenu ${debugFlag}`, {
			stdio: "inherit",
    });
    spinner.stop();

		// if (answers["i18n"] === "react-native-i18n") {
		// 	await system.spawn(`ignite add i18n@"~>1.0.0" ${debugFlag}`, { stdio: "inherit" });
    // }
    
	} catch (e) {
		ignite.log(e);
		throw e;
  }
  
  // react native link -- must use spawn & stdio: ignore
  spinner.text = `▸ linking native libraries`
  spinner.start()
  let showCocoapodsInstructions = false
  // if it's a mac
  if (process.platform === 'darwin') {
    // if cocoapods is installed, install the oauth dependencies
    const podVersionCommandResult = await system.spawn('pod --version', { stdio: 'ignore' })
    if (podVersionCommandResult.status === 0) {
      spinner.text = `▸ running pod install`
      try {
        await system.run('cd ios && pod install && cd ..', { stdio: 'ignore' })
        spinner.succeed(`pod install succeeded`)
      } catch (e) {
        spinner.stopAndPersist({ symbol: '🚨', text: 'pod install failed, please try again manually:' })
        print.info(`cd ios && pod install && cd ..`)
        print.error(e)
      }
    } else {
      showCocoapodsInstructions = true
    }
  }
  spinner.succeed(`linked native libraries`)
  spinner.stop()

	// git configuration
	const gitExists = await filesystem.exists("./.git");
	if (!gitExists && !parameters.options["skip-git"] && system.which("git")) {
		// initial git
		const spinner = print.spin("configuring git");

		// TODO: Make husky hooks optional
		const huskyCmd = ""; // `&& node node_modules/husky/bin/install .`
		system.run(`git init . && git add . && git commit -m "Initial commit." ${huskyCmd}`);

		spinner.succeed(`configured git`);
	}

	const perfDuration = parseInt((new Date().getTime() - perfStart) / 10) / 100;
	spinner.succeed(`ignited ${yellow(name)} in ${perfDuration}s`);

	const androidInfo = isAndroidInstalled(context)
		? ""
		: `\n\nTo run in Android, make sure you've followed the latest react-native setup instructions at https://facebook.github.io/react-native/docs/getting-started.html before using ignite.\nYou won't be able to run ${bold(
				"react-native run-android"
			)} successfully until you have.`;

	const successMessage = `
    ${red("Ignite CLI")} ignited ${yellow(name)} in ${gray(`${perfDuration}s`)}
    To get started:
      cd ${name}
      react-native run-ios
      react-native run-android${androidInfo}
      ignite --help
    ${gray(
		"Read the walkthrough at https://github.com/infinitered/ignite-ir-boilerplate/blob/master/readme.md#boilerplate-walkthrough"
	)}
    ${blue("Need additional help? Join our Slack community at http://community.infinite.red.")}
    ${bold("Now get cooking! 🍽")}
  `;

	print.info(successMessage);
}

module.exports = {
	install,
};