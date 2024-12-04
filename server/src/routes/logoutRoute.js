const express = require("express")
const logout = require("../controllers/logoutController")

const logoutRouter = express.Router()

logoutRouter.post("/logout", logout)

module.exports = logoutRouter