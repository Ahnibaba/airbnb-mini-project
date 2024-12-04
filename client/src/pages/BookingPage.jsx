import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import AddressLink from "../components/AddressLink"
import BookingDate from "../components/BookingDate"
import PlaceGallery from "../components/PlaceGallery"

const BookingPage = () => {
   const { id } = useParams()
   const [booking, setBooking] = useState(null)
   useEffect(() => {
      if (id) {
         axios.get("/bookings", { withCredentials: true }).then(response => {
            if (response.data.success && response.statusText === "OK") {
               const foundBooking = response.data.allBookings.find(({ _id }) => _id === id)
               if (foundBooking) {
                  setBooking(foundBooking)
               }
            }
         })
      }
   }, [id])

   if(!booking) {
      return ""
   }

   return (
      <div className="my-8">
         <h1 className="text-3xl">{booking.placeId.title}</h1>
         <AddressLink className="my-2 block">{booking.placeId.address}</AddressLink>
         <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
            <div className="">
            <h2 className="text-2xl mb-4">Your booking information</h2>
            <BookingDate booking={booking.placeId} />
            </div>
            <div className="bg-primary p-4 text-white rounded-2xl">
               <div className="">Total price</div>
               <div className="test-3xl">${booking.placeId.price}</div>

            </div>
         </div>
         <PlaceGallery place={booking.placeId} />
      </div>
   )
}

export default BookingPage