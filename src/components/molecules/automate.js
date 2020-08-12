import puppeteer from "puppeteer"

import csv from "@/components/elements/csv"
import text from "@/components/elements/text"
import shell from "@/components/elements/shell"
import automation from "@/settings/automation.yaml"

export default async data => {
  const { args, options, configuration } = data
  const { information, settings } = automation

  const browser = await puppeteer.launch(settings.browser)
  const page = await browser.newPage()
  try {
    /*
        ======================================
          This is where the automation or scraping
          code goes. Try to re-use the page variable
          whenever you want to visit multiple pages.
          You're supposed to remove this
          comment and start working here.
        ======================================
      */
    await page.goto(information.links.root, settings.page.static)
    await page.waitForNavigation()
  } catch (e) {
    /*
        ======================================
          After everything happens, we're trying
          to catch errors over here. Try to handle
          all errors for debugging ease.
        ======================================
      */
    throw new Error(e)
  } finally {
    /*
        ======================================
          And finally, after all this we're going
          to close our page and browser. You're
          supposed to cache URLs and reuse the 'page'
          variable instead of creating multiple pages.
          This will force you write faster code.
        ======================================
      */
    await page.close()
    await browser.close()
  }
  return {}
}
