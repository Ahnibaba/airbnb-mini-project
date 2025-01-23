/* eslint-disable react/prop-types */

const PlaceImg = ({ place, index, className= null }) => {
    if (!place.addedPhotos?.length) {
        return "";
    }
    if(!className) {
        className = "object-cover"
    }
    return (

        <img key={index} className={className} src={`https://airbnb-mini-project-uuu2.onrender.com/uploads/${place.addedPhotos[index]}`} alt="" />

    )
}

export default PlaceImg