const fileRouter = require("express").Router()
const { MongoClient, GridFSBucket } = require("mongodb")
const MONGOURI = process.env.URI
const { upload } = require("../middleware/fileUpload")
const { Readable } = require("node:stream")
const {
  saveBufferToGridFs,
  saveDatasetContents,
} = require("../controllers/dataset")

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
    const db = client.db(process.env.DBNAME)
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

    console.log(response)
    return res.send("something happenend")
  } catch (err) {
    console.log("we have an error", err)
    res.status(400).send(err.message)
  }
})

// export fileRouter
module.exports = { fileRouter }
