import fs from "fs"
import Writer from "json2csv"
import Reader from "csvtojson"

export default {
  write: async (array, location, options = {}) => {
    /*
      ======================================
        Data must be an array of objects.
        The keys of the object may or may
        not be same but they're the ones
        that'll form the columns of the CSV.
      ======================================
    */
    const converted = Writer.parse(array, { fields: Object.keys(array[0]) })
    if (location) await fs.writeFileSync(location, converted)
    return await converted
  },
  read: async (location) => {
    /*
      ======================================
        The file must exist, that's all.
        It'll read in a CSV and then return
        an object, which will be valid JSON data.
      ======================================
    */

    return await Reader().fromFile(location)
  }
}
