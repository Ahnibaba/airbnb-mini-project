const express = require("express")
const { profile } = require("../controllers/userController")
const auth = require("../middleware/auth")


const userRouter = express.Router()

userRouter.get("/profile", auth, profile)

module.exports = userRouter