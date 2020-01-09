const NPM_MODULE_NAME = 'react-native-vector-icons'
const EXAMPLE_FILE = 'vectorExample.js.ejs'

/**
 * Add ourself to the project.
 */
const add = async function (context) {
  const { ignite } = context

  // install a npm module
  await ignite.addModule(NPM_MODULE_NAME, { version: '6.1.0', link: false })

  // link module
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

  // copy the example file (if examples are turned on)
  await ignite.addPluginComponentExample(EXAMPLE_FILE, { title: 'Vector Icons' })
}

/**
 * Remove ourself from the project.
 */
const remove = async function (context) {
  const { ignite } = context

  // remove the npm module
  await ignite.removeModule(NPM_MODULE_NAME, { unlink: false })

  // unlink module
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

  // remove the component example
  await ignite.removePluginComponentExample(EXAMPLE_FILE)
}

/**
 * Expose an ignite plugin interface.
 */
module.exports = { add, remove }
