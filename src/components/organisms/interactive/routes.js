/*
  ======================================

                           /$$     /$$
                          | $$    |__/
      /$$$$$$   /$$$$$$  /$$$$$$   /$$  /$$$$$$  /$$$$$$$   /$$$$$$$
     /$$__  $$ /$$__  $$|_  $$_/  | $$ /$$__  $$| $$__  $$ /$$_____/
    | $$  \ $$| $$  \ $$  | $$    | $$| $$  \ $$| $$  \ $$|  $$$$$$
    | $$  | $$| $$  | $$  | $$ /$$| $$| $$  | $$| $$  | $$ \____  $$
    |  $$$$$$/| $$$$$$$/  |  $$$$/| $$|  $$$$$$/| $$  | $$ /$$$$$$$/
     \______/ | $$____/    \___/  |__/ \______/ |__/  |__/|_______/
              | $$
              | $$
              |__/

    This is the script that does something with the options
    specified by the user either though traditional CLI or
    through interactive CLI modes. This file is simply for
    dealing with the logic for options of the program.

  ======================================
*/

import csv from "@/components/elements/csv"
import text from "@/components/elements/text"
import program from "@/program/arguments"

export default async options => {
  await program({ options })
}
