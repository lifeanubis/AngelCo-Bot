/*
  ======================================
                                                                             /$$
                                                                            | $$
    /$$$$$$$  /$$$$$$  /$$$$$$/$$$$  /$$$$$$/$$$$   /$$$$$$  /$$$$$$$   /$$$$$$$  /$$$$$$$
   /$$_____/ /$$__  $$| $$_  $$_  $$| $$_  $$_  $$ |____  $$| $$__  $$ /$$__  $$ /$$_____/
  | $$      | $$  \ $$| $$ \ $$ \ $$| $$ \ $$ \ $$  /$$$$$$$| $$  \ $$| $$  | $$|  $$$$$$
  | $$      | $$  | $$| $$ | $$ | $$| $$ | $$ | $$ /$$__  $$| $$  | $$| $$  | $$ \____  $$
  |  $$$$$$$|  $$$$$$/| $$ | $$ | $$| $$ | $$ | $$|  $$$$$$$| $$  | $$|  $$$$$$$ /$$$$$$$/
   \_______/ \______/ |__/ |__/ |__/|__/ |__/ |__/ \_______/|__/  |__/ \_______/|_______/

  This file handles all sub-commands of this program.
  You specify the command handler in the 'commands'
  object below. 'key' in the command variable
  must match with `command.name` specified in some
  file in settings.

  ======================================
*/

import prompter from "@/components/elements/prompt"
import configuration from "@/settings/configuration.yaml"
import routes from "@/program/commands"

const commands = {
  __example: async data => {
    const { args, options, configuration } = data
  },
  ...routes
}

const sanitize = settings => command => async (...options) => {
  /*
    ======================================
      This function sanitizes arguments that
      our commands will get. Commands are specified
      above. First, if the user types the command
      name but doesn't provide any arguments
      or options, then the CLI should ask
      for the arguments and options interactively.
    ======================================
  */
  if (Array.isArray(options) && options.length > 0) {
    /*
        ======================================
          If the options is an array, it means
          that user has used the CLI in traditional way.
          If this is the case, then the arguments need
          to be filtered differently for core functionality
          to apply.
        ======================================
      */
    const info = options[options.length - 1]
    const parser = (e, i) => ({ [e.name]: options.slice(0, -1)[i] })
    const args = {}
    for (let p of info._args.map(parser)) {
      const key = Object.keys(p)[0]
      const value = p[key]
      args[key] = value
    }
    let questions = {
      arguments: settings.arguments.questions
        .filter(q => q.prompt && q.prompt === true)
        .filter(q => !args.hasOwnProperty(q.name) || args[q.name] === null || args[q.name] === q.initial),

      options: settings.options
        .map(o => o.question)
        .filter(q => q.prompt && q.prompt === true)
        .filter(
          q =>
            !info._optionValues.hasOwnProperty(q.name) ||
            info._optionValues[q.name] === null ||
            info._optionValues[q.name] === q.initial
        )
    }
    const inputs = {
      arguments: await prompter(questions.arguments),
      options: await prompter(questions.options)
    }
    delete inputs.arguments.command
    delete inputs.arguments.version
    delete inputs.options.command
    delete inputs.options.version
    await command({
      args: { ...args, ...inputs.arguments },
      configuration: settings,
      options: { ...info._optionValues, ...inputs.options }
    })
  } else {
    /*
      ======================================
        If the options is an array and its length
        is zero, it means there may not be enough
        data entered by the user for it to function.
        In that case it should ask relevant questions
        about the command.
      ======================================
    */
    let questions = settings.arguments.questions
    questions = [...questions, ...settings.options.map(o => o.question)]
    const input = await prompter(questions)
    delete input.command
    delete input.version
    await command({ input, settings })
  }
}

export default command => {
  /*
    ======================================
      All commands are higher order functions
      that accept some setting (that's inside
      the configuration file). And then we pass
      in the settings to that function so that it
      knows what needs to be done when it's called
      traditionally or through interactive CLI.
    ======================================
  */
  const settings = configuration.commands.filter(c => c.name === command)
  const selected = commands.hasOwnProperty(command) ? commands[command] : null
  return selected ? sanitize(...settings)(selected) : console.log
}
