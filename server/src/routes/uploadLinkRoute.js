const express = require("express")
const { uploadLink } = require("../controllers/uploadLinkController")

const uploadLinkRouter = express.Router()

uploadLinkRouter.post("/uploadLink", uploadLink)

module.exports = uploadLinkRouter