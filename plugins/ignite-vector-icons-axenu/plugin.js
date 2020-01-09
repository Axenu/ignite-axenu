// Ignite CLI plugin for VectorIconsAxenu
// ----------------------------------------------------------------------------

const NPM_MODULE_NAME = 'react-native-vector-icons'
const NPM_MODULE_VERSION = '6.1.0'

// const PLUGIN_PATH = __dirname
// const APP_PATH = process.cwd()


const add = async function (toolbox) {
  // Learn more about toolbox: https://infinitered.github.io/gluegun/#/toolbox-api.md
  const { ignite, system } = toolbox

  // install an NPM module and link it
  await ignite.addModule(NPM_MODULE_NAME, { link: false, version: NPM_MODULE_VERSION })

  // link module
  // const spinner = print
  // .spin(`using the ${print.colors.cyan('VectorIconsAxenu')} boilerplate`)
  // .succeed()
  // spinner.text = `▸ linking native library`
  // spinner.start()
  let showCocoapodsInstructions = false
  // if it's a mac
  if (process.platform === 'darwin') {
    // if cocoapods is installed, install the oauth dependencies
    const podVersionCommandResult = await system.spawn('pod --version', { stdio: 'ignore' })
    if (podVersionCommandResult.status === 0) {
      // spinner.text = `▸ running pod install`
      try {
        await system.run('cd ios && pod install && cd ..', { stdio: 'ignore' })
        // spinner.succeed(`pod install succeeded`)
      } catch (e) {
        // spinner.stopAndPersist({ symbol: '🚨', text: 'pod install failed, please try again manually:' })
        // print.info(`cd ios && pod install && cd ..`)
        // print.error(e)
      }
    } else {
      showCocoapodsInstructions = true
    }
  }
  // spinner.succeed(`linked native libraries`)
  // spinner.stop()

  // Example of copying templates/VectorIconsAxenu to app/ignite-vector-icons-axenu
  // if (!toolbox.filesystem.exists(`${APP_PATH}/app/ignite-vector-icons-axenu`)) {
  //   toolbox.filesystem.copy(`${PLUGIN_PATH}/templates/ignite-vector-icons-axenu`, `${APP_PATH}/app/ignite-vector-icons-axenu`)
  // }

  // Example of patching a file
  // ignite.patchInFile(`${APP_PATH}/app/config/app-config.js`, {
  //   insert: `import '../ignite-vector-icons-axenu/ignite-vector-icons-axenu'\n`,
  //   before: `export default {`
  // })
}

/**
 * Remove yourself from the project.
 */
const remove = async function (toolbox) {
  // Learn more about toolbox: https://infinitered.github.io/gluegun/#/toolbox-api.md
  const { ignite } = toolbox

  // remove the npm module and unlink it
  await ignite.removeModule(NPM_MODULE_NAME, { unlink: false })

  // link module
  const spinner = print
  .spin(`using the ${print.colors.cyan('VectorIconsAxenu')} boilerplate`)
  .succeed()
  spinner.text = `▸ linking native library`
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

  // Example of removing app/VectorIconsAxenu folder
  // const removeignite-vector-icons-axenu = await toolbox.prompt.confirm(
  //   'Do you want to remove app/ignite-vector-icons-axenu?'
  // )
  // if (removeignite-vector-icons-axenu) { toolbox.filesystem.remove(`${APP_PATH}/app/ignite-vector-icons-axenu`) }

  // Example of unpatching a file
  // ignite.patchInFile(`${APP_PATH}/app/config/app-config.js`, {
  //   delete: `import '../ignite-vector-icons-axenu/ignite-vector-icons-axenu'\n`
  // )
}

// Required in all Ignite CLI plugins
module.exports = { add, remove }

