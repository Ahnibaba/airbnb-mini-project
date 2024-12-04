const express = require("express")
const { register } = require("../controllers/registerController")

const registerRouter = express.Router()

registerRouter.post("/register", register)

module.exports = registerRouter