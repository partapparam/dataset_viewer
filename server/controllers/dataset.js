const csv = require("@fast-csv/parse")
const { Readable } = require("node:stream")
const { GridFSBucket, Db } = require("mongodb")

/**
 * Parse buffer string, get Datatypes of object, and save contents in DB
 *
 * @param {Db} db
 * @param {Buffer} buffer
 * @param {string} collectionName
 * @param {string} mimetype
 * @returns {Promise<string>}
 */
const saveDatasetContents = async (db, buffer, collectionName, mimetype) => {
  try {
    let parsedData = []
    if (mimetype === "application/json") {
      parsedData = _parseJSONFile(buffer)
    } else {
      parsedData = await _parseDataFromCSVBuffer(buffer)
    }
    const datasetObjectTypes = await _getDataTypesForObject(parsedData[0])
    const datasetObjectTypesDocument = {
      collection: collectionName,
      datatypes: datasetObjectTypes,
    }
    await _saveDocuments(db, collectionName, parsedData)
    await _saveDocument(db, datasetObjectTypesDocument)
    return "success"
  } catch (err) {
    throw new Error("Files could not be saved")
  }
}

/**
 * Save Buffer Stream into GRID FS Bucket
 * @param {Db} db
 * @param {string} collectionName
 * @param {Buffer} buffer
 * @param {string} mimetype
 * @param {number} size
 * @param {string} originalname
 * @returns {Promise}
 */
const saveBufferToGridFs = (
  db,
  collectionName,
  buffer,
  mimetype,
  size,
  originalname
) => {
  const bucket = new GridFSBucket(db, {
    bucketName: process.env.BUCKET,
  })
  return new Promise((resolve, reject) => {
    const readStream = Readable.from(buffer)
    // bucket.openUploadStream - MongoDB method
    readStream.pipe(
      bucket.openUploadStream(originalname, {
        metadata: {
          originalName: originalname,
          mimetype: mimetype,
          collectionName: collectionName,
          size_mb: size / (1024 * 1024),
        },
      })
    )
    readStream.on("error", (err) => {
      console.log(err)
      reject(`Failed: ${err.name} - ${err.message}`)
    })

    readStream.on("end", () => {
      resolve("success")
    })
  })
}

/**
 * Handle JSON File submissions, parse buffer into JSON
 * @param {string} bufferString
 * @return {array} array of objects from JSON file
 */
const _parseJSONFile = (bufferString) => {
  return JSON.parse(bufferString)
}

/**
 * Parse CSV File Buffer into Array
 * @param {string} bufferString
 * @returns {Promise<array>} Parsed rows from buffer as Promise
 */
const _parseDataFromCSVBuffer = (bufferString) => {
  const rows = []
  return new Promise((resolve, reject) => {
    csv
      .parseString(bufferString, {
        headers: true,
        discardUnmappedColumns: true,
        ignoreEmpty: true,
        escape: '"',
      })
      .on("error", (error) => {
        // console.log(error)
        reject("This file is not a valid CSV file.")
      })
      .on("data", (row) => {
        rows.push(row)
      })
      .on("end", (rowCount) => {
        // console.log(`Parsed ${rowCount} rows`)
        resolve(rows)
      })
  })
}

/**
 * Recursive function to determine the types for each key in the Dataset Object
 *
 * @param {object} datasetObject
 * @returns {Promise<object>} Values = Types for each key in original object
 */
const _getDataTypesForObject = async (datasetObject) => {
  const dataTypesObject = {}
  Object.keys(datasetObject).forEach(async (key) => {
    if (typeof datasetObject[key] == "object") {
      dataTypesObject[key] = await _getDataTypesForObject(datasetObject[key])
    } else {
      dataTypesObject[key] = typeof datasetObject[key]
    }
  })
  return dataTypesObject
}

/**
 *
 *
 * @param {*} db
 * @param {*} data
 */
const _saveDocument = async (db, data) => {
  try {
    const saved = await db
      .collection(process.env.DATASET_TYPE_COLLECTION)
      .insertOne(data)
    return saved
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Save dataset documents
 *
 * @param {*} db
 * @param {*} collectionName
 * @param {*} data
 * @returns
 */
const _saveDocuments = async (db, collectionName, data) => {
  try {
    const saved = await db.collection(collectionName).insertMany(data)
    return saved
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Fetch dataset data types from Db
 *
 * @param {Db} db
 * @param {string} collectionName
 * @returns
 */
const getDatasetTypes = async (db, collectionName) => {
  const datasetTypes = db.collection(process.env.DATASET_TYPE_COLLECTION)
  return await datasetTypes.findOne({ collection: collectionName })
}

/**
 * Fetch Dataset contents from DB
 *
 * @param {Db} db
 * @param {string} collectionName
 * @returns
 */
const getDatasetContents = async (db, collectionName) => {
  const datasets = db.collection(collectionName)
  const cursor = datasets.find({})
  const result = []
  for await (const doc of cursor) {
    result.push(doc)
  }
  return result
}

module.exports = {
  saveBufferToGridFs,
  saveDatasetContents,
  getDatasetTypes,
  getDatasetContents,
  _parseJSONFile,
  _getDataTypesForObject,
  _parseDataFromCSVBuffer,
}
