const express = require("express")
const { book, getAllBookings } = require("../controllers/bookController")
const auth = require("../middleware/auth")

const bookRouter = express.Router()

bookRouter.post("/new", auth, book)
bookRouter.get("/", auth, getAllBookings)

module.exports = bookRouter