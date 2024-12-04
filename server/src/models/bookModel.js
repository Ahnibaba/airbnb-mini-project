const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },  
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Place"
  },  
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  price: Number
})

const bookModel = mongoose.models.Book || mongoose.model("Book", bookingSchema)

module.exports = bookModel