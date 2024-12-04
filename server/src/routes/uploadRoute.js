const express = require("express")
const multer = require("multer")
const { upload } = require("../controllers/uploadController")

const uploadRouter = express.Router()



const photos = multer({
    dest: "uploads"
})

uploadRouter.post("/upload", photos.array("photos", 100), upload)

module.exports = uploadRouter