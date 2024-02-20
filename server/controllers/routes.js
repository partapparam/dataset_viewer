const fileRouter = require("express").Router()
const { MongoClient, GridFSBucket } = require("mongodb")
const MONGOURI = process.env.URI
const { upload } = require("../middleware/fileUpload")
const { Readable } = require("node:stream")
const { parseAndSaveDataFromBuffer } = require("../utils/helperFunctions")

// create MongoDB node client
const client = new MongoClient(MONGOURI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})

/**
 * Return Dataset by name: string
 */
fileRouter.get("/datasets/id", async (req, res) => {
  const db = client.db(process.env.DBNAME)
  // get filename from query
  const { filename } = req.query
  // Get GFS bucket from mongo. If Bucket does not exist, it's created
  const bucket = new GridFSBucket(db, { bucketName: process.env.BUCKET })
  // begin download of our file
  let downloadStream = bucket.openDownloadStreamByName(filename)
  downloadStream.on("data", async function (data) {
    // Res.Write() will take a Buffer or String Data chunk and send it to the client as a CSV string
    return res.status(200).write(data)
  })
  // handle error event
  downloadStream.on("error", function (err) {
    console.log("here is an error", err)
    return res.status(404).send({ message: "File not found" })
  })

  downloadStream.on("end", () => {
    return res.end()
  })
})

/**
 * Return list of all datasets from Mongo
 */
fileRouter.get("/datasets", async (req, res) => {
  const db = client.db(process.env.DBNAME)
  // connect to mongo db bucket
  const bucket = new GridFSBucket(db, { bucketName: process.env.BUCKET })
  const cursor = bucket.find({})
  const fileData = []
  // map through returned cursor object and get file data
  for await (const doc of cursor) {
    fileData.push(doc)
  }
  // await client.close()
  return res.status(200).json({ data: fileData })
})

/**
 * Post user submitted file and content to DB
 */
fileRouter.post("/dataset", upload.single("file"), async (req, res) => {
  const { buffer, size, originalname, mimetype } = req.file
  const { name } = req.body
  // Multer adds body, file, and files object to our request object
  // start by connecting to the client and our bucket
  try {
    const db = client.db(process.env.DBNAME)
    const bucket = new GridFSBucket(db, {
      bucketName: process.env.BUCKET,
    })
    //   get date of submission
    const submitDate = new Date(Date.now()).toLocaleDateString()
    // create collectionName for MongoDb collection for this upload
    const collectionName = `${name}-${submitDate}`
    // start stream for uploaded file buffer
    let readStream = Readable.from(buffer)

    // bucket.openUploadStream will start uploading chunks to DB
    //   added metadata is stored on file
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
    //   handle data chunk event
    readStream.on("data", (chunk) => {
      // console.log(chunk)
      parseAndSaveDataFromBuffer(db, collectionName, chunk)
    })
    //   handle readStream End event
    //   delete stored file from ./uploads
    //   Send Return message to client
    readStream.on("end", () => {
      return res.status(200).send("Successfully loaded the file")
    })
  } catch (err) {
    console.log("we have an error", err)
    res.status(400).send(err.message)
  }
})

// export fileRouter
module.exports = { fileRouter }
