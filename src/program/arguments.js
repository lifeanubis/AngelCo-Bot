import puppeteer from "puppeteer"
import csv from "@/components/elements/csv"
import text from "@/components/elements/text"
import shell from "@/components/elements/shell"
import automation from "@/settings/automation.yaml"

async function angel(page, url, settings) {
  await page.goto(url, settings)
  await page.type("#user_email", "email", { delay: 100 })
  await page.type("#user_password", "password", { delay: 100 })
  await page.click("input[type=submit]", { delay: 10 })
  await page.waitForNavigation()

  // value of "i" does scrolling. Increase value to scroll more

  for (let i = 0; i <= 200; i++) {
    const i = await p.keyboard.press("Space", { delay: 10 })
  }

  const link = await p.$$eval(".component_4d072 a", (link) =>
    link.map((links) => {
      const obj = { value2: links.href }
      return obj
    })
  )

  return link
}

export default async (data) => {
  const { options } = data
  const { information, settings } = automation

  const browser = await puppeteer.launch(settings.browser)
  const page = await browser.newPage()

  const url = "https://angel.co/login"

  try {
    let pilled = await angel(page, url, settings.page.static)

    await csv.write(pilled, "data.csv")
    console.log(pilled)
    console.log("hare krishna")
  } catch (e) {
    throw new Error(e)
  } finally {
    await page.close()
    await browser.close()
  }
}
