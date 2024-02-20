const multer = require("multer")

/**
 * Multer will receive our FormData from Client
 * Adds req.file and req.body
 *
 * File is temporarily stored in ./uploads
 * Will be used for fs.createReadStream so it can be added to MongoGridFS
 */
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

module.exports = { upload }
