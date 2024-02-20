const express = require("express")
const app = express()
require("dotenv").config()
const fs = require("fs")
const cors = require("cors")
const { fileRouter } = require("./routes/routes")
// Set cors Policy
app.use(
  cors({
    origin: ["http://localhost:5173"],
    preflightContinue: false,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  })
)
app.options("*", cors())
// Cant use express.json for multipart form type for image upload, Multer will cover that
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", fileRouter)

/**
 * Handles all failed routing that do not match or Auth is not met
 */
app.use((req, res) => {
  res.status(404).json({ message: "error", data: "Not Found - 400" })
})

app.listen(process.env.PORT, function () {
  console.log(`Application live on localhost:${process.env.PORT}`)
})
