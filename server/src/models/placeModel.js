const mongoose = require("mongoose")

const placeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  addedPhotos: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  perks: {
    type: [String],
    required: true
  },
  extraInfo: {
    type: String,
    required: true
  },
  checkIn: {
    type: Number,
    required: true
  },
  checkOut: {
    type: Number,
    required: true
  },
  maxGuests: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
  }
})

const placeModel = mongoose.models.Place || mongoose.model("Place", placeSchema)


module.exports = placeModel