const express = require("express")
const { addPlace, getUserPlaces, getPlace, updatePlace, getAllPlaces } = require("../controllers/placesController")
const auth = require("../middleware/auth")


const placesRouter = express.Router()

placesRouter.post("/add", auth, addPlace)
placesRouter.get("/user", auth, getUserPlaces)
placesRouter.get("/:id", auth, getPlace)
placesRouter.put("/update", auth, updatePlace)
placesRouter.get("/", getAllPlaces)

module.exports = placesRouter