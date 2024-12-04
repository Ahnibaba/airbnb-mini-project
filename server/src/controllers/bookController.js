const bookModel = require("../models/bookModel")

const book = async (req, res) => {
    const { id } = req.body.user
    const { placeId, checkIn, checkOut, numberOfGuests, name, phoneNumber, price } = req.body

    bookModel.create({
        userId: id, 
        placeId,
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phoneNumber,
        price
    }).then(newBook => {
        res.status(201).json({ success: true, message: "Booking successful", newBook })
    }).catch(error => {
        res.status(201).json({ success: false, error: error })
    })

}

const getAllBookings = async(req, res) => {
    const { id } = req.body.user
    console.log(id);
    
    try{
        const allBookings = await bookModel.find({ userId: id }).populate("placeId")
        res.status(200).json({ success: true, allBookings })
    }catch(err){
        res.status(400).json({ success: false, err })
    }
}

module.exports = { book, getAllBookings }