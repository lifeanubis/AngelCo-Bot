/*
  ======================================

     /$$                 /$$
    |__/                | $$
     /$$ /$$$$$$$   /$$$$$$$  /$$$$$$  /$$   /$$
    | $$| $$__  $$ /$$__  $$ /$$__  $$|  $$ /$$/
    | $$| $$  \ $$| $$  | $$| $$$$$$$$ \  $$$$/
    | $$| $$  | $$| $$  | $$| $$_____/  >$$  $$
    | $$| $$  | $$|  $$$$$$$|  $$$$$$$ /$$/\  $$
    |__/|__/  |__/ \_______/ \_______/|__/  \__/

    This file is the entry point of this CLI tool.
    There are basically two ways to pass in information
    to the script -

    1) Command Flags

    The 'commands' function takes care of parsing the
    argument list and then passing the information to the
    main processor (which lies inside `scripts`)

    2) Interactive CLI.

    The 'interactive' function below calls an interactive CLI -
    it first creates a banner from application name, then does
    what needs to be done and then prints out an exit message
    once everything's done.

  ======================================
*/

import application from "@/settings/application.yaml"
import configuration from "@/settings/configuration.yaml"
import interactive from "@/components/organisms/interactive"
import traditional from "@/components/organisms/traditional"
import options from "@/components/organisms/interactive/routes"
import commands from "@/components/organisms/traditional/routes"

/*
  ======================================
    If any arguments are present, use
    the traditional CLI, otherwise use
    the interactive CLI with relevant data.
  ======================================
*/
;(async () => {
  const settings = { options, commands, data: { application, configuration } }
  process.argv.length > 2
    ? await traditional(settings)
    : await interactive(settings)
})()
