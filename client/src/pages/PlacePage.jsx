import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookingWidget from "../components/BookingWidget"
import PlaceGallery from "../components/PlaceGallery"
import AddressLink from "../components/AddressLink"


const PlacePage = () => {
    const [place, setPlace] = useState(null)
    
    const { id } = useParams()
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`places/${id}`, { withCredentials: true }).then(response => {
            if (response.data.success && response.statusText === "OK") {
                setPlace(response.data.place)
            }
        })
    }, [id])

    if (!place) return "";

    



    return (
        <div className="mt-8 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <PlaceGallery place={place} />

            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div className="">
                    <div className="">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.checkIn}<br />
                    check-out: {place.checkOut}<br />
                    Max number of guests: {place.maxGuests}
                </div>
                <div className="">
                    <BookingWidget place={place} />
                </div>  
            </div>
             <div className="bg-white mx-8 px-8 py-8 border-t">
             <div className="">
                <h2 className="font-semibold text-2xl">Extra info</h2>
            </div>
            <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
             </div>
        </div>
    )
}

export default PlacePage