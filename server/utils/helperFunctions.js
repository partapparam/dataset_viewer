const csv = require("@fast-csv/parse")

// Save each dataset as a collection in MongoDB
// CollectionName = name of upload + time of upload
const createRecordsInMongo = async (client, collectionName, data) => {
  try {
    const parsedDataInJson = await parseDataFromBuffer(data)
    const db = await client.db(process.env.DBNAME)
    const collection = await db
      .collection(collectionName)
      .insertMany(parsedDataInJson)
    //   console.log(collection.insertedCount)
    return collection.insertedCount
  } catch (err) {
    // console.log(err)
    throw new Error("The csv file was empty")
  }
}
/**
 *
 * @param {Buffer} data
 */
const parseDataFromBuffer = (data) => {
  let allRows = []
  /**
   * discardUnmappedColumns - This is only valid in the case when the number
   * of parsed columns is greater than the number of headers.
   * ignoreEMpty - discard columns that are all white space or delimiters
   * escape - Will wrap inner quotations found in our csv
   *
   */
  csv
    .parseString(data, {
      headers: true,
      discardUnmappedColumns: true,
      ignoreEmpty: true,
      escape: '"',
    })
    .on("error", (error) => {
      console.log(error)
      throw new Error("Could not parse CSV data")
    })
    .on("data", (row) => {
      allRows.push(row)
    })
    .on("end", async (rowCount) => {
      console.log(`Parsed ${rowCount} rows`)
    })
  return allRows
}

module.exports = { createRecordsInMongo, parseDataFromMongoGFS }
