const fileRouter = require("express").Router()
const { MongoClient, GridFSBucket } = require("mongodb")
const MONGOURI = process.env.URI
const { upload } = require("../middleware/fileUpload")
const {
  saveBufferToGridFs,
  saveDatasetContents,
  getDatasetTypes,
} = require("../controllers/dataset")
const { DBNAME, BUCKET } = process.env
// create MongoDB node client
const client = new MongoClient(MONGOURI)

/**
 * Post user submitted file and content to DB
 */
fileRouter.post("/dataset", upload.single("file"), async (req, res) => {
  const { buffer, size, originalname, mimetype } = req.file
  const { name } = req.body
  const submitDate = new Date(Date.now()).toLocaleDateString()
  const collectionName = `${name}-${submitDate}`
  try {
    const db = client.db(DBNAME)
    const response = await Promise.all([
      saveBufferToGridFs(
        db,
        collectionName,
        buffer,
        mimetype,
        size,
        originalname
      ),
      saveDatasetContents(db, buffer, collectionName, mimetype),
    ])

    return res.json({ message: "success", data: response })
  } catch (err) {
    console.log("we have an error", err)
    res.status(400).send(err.message)
  }
})

/**
 * Get Dataset data-types by CollectionName
 * @param {string} req.query.name - collectionName
 * @returns {object}
 */
fileRouter.get("/dataset/id", async (req, res) => {
  try {
    const db = client.db(DBNAME)
    const result = await getDatasetTypes(db, req.query.name)
    res.json({ status: "success", data: result })
  } catch (err) {
    res.json({ status: "error", data: err.message })
  }
})

/**
 * Get all datasets from DB
 * @returns {object}
 */
fileRouter.get("/datasets", async (req, res) => {
  const db = client.db(DBNAME)
  // connect to mongo db bucket
  const bucket = new GridFSBucket(db, { bucketName: BUCKET })
  const cursor = bucket.find({})
  const fileData = []
  // map through returned cursor object and get file data
  for await (const doc of cursor) {
    fileData.push(doc)
  }
  return res.status(200).json({ data: fileData })
})

// export fileRouter
module.exports = { fileRouter }
