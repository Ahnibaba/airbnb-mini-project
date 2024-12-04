const placeModel = require("../models/placeModel")

const getAllPlaces = async(req, res) => {
    const places = await placeModel.find()
    res.status(200).json({ success: true, places })
}

const getUserPlaces = async (req, res) => {
    const { id } = req.body.user
    const userPlaces = await placeModel.find({ owner: id })
    res.status(200).json({ success: true, userPlaces })

}

const getPlace = async (req, res) => {
    const { id } = req.params
    const place = await placeModel.findById(id)
    console.log(place);
    
    res.status(200).json({ success: true, place })
}

const addPlace = async (req, res) => {
    const { id } = req.body.user
    const {
        title,
        address,
        addedPhotos,
        perks,
        description,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
    } = req.body

    const placeData = new placeModel({
        owner: id,
        title,
        address,
        addedPhotos,
        perks,
        description,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
    })

    const newPlace = await placeData.save();

    res.status(201).json({ success: true, newPlace })


}

const updatePlace = async (req, res) => {
    const { id: userId } = req.body.user
    const {
        id,
        title,
        address,
        addedPhotos,
        perks,
        description,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
    } = req.body
    const placeDoc = await placeModel.findById(id)
    if (userId === placeDoc.owner.toString()) {
        placeDoc.set({
            title,
            address,
            addedPhotos,
            perks,
            description,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        })
        await placeDoc.save();
        res.status(200).json({ success: true, placeDoc })
    }
}



module.exports = { addPlace, getUserPlaces, getPlace, updatePlace, getAllPlaces }