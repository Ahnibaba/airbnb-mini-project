/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react"
import { differenceInCalendarDays } from "date-fns"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"


const BookingWidget = ({ place }) => {
    
    
    const[book, setBook] = useState({
        checkIn: "",
        checkOut: "",
        numberOfGuests: "",
        name: "",
        phoneNumber: ""
    })

    const { user } = useContext(UserContext)
    
    useEffect(() => {
      if(user) {
        setBook(prev => ({ ...prev, name: user.name }))
      }
    }, [user])

    const navigate = useNavigate()

    let numberOfNights = 0
    if(book.checkIn && book.checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(book.checkOut), new Date(book.checkIn))
    }

    function handleOnchange(e) {
        const name = e.target.name
        const value = e.target.value
        setBook(prev => ({ ...prev, [name]: value }))
    }

    function bookThisPlace(){
        axios.post("/bookings/new", { placeId: place._id, ...book, price: numberOfNights*place.price }, { withCredentials: true }).then(response => {
           if(response.data.success && response.statusText === "Created") {
             const bookingId = response.data.newBook._id
             navigate(`/account/bookings/${bookingId}`)
           }
        })
    }
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: {place.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label htmlFor="checkin">Check in:</label>
                        <input id="checkin" name="checkIn" value={book.checkIn} onChange={handleOnchange} type="date" />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label htmlFor="checkout">Check out:</label>
                        <input id="checkout" name="checkOut" value={book.checkOut} onChange={handleOnchange} type="date" />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label htmlFor="date">Number of guests:</label>
                    <input id="guest" name="numberOfGuests" value={book.number} onChange={handleOnchange} type="number" />
                </div>
                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                    <label htmlFor="name">Your full name:</label>
                    <input id="name" name="name" value={book.name} onChange={handleOnchange} type="text" />
                    <label htmlFor="phone">Phone number:</label>
                    <input id="phone" name="phoneNumber" value={book.phoneNumber} onChange={handleOnchange} type="tel" />
                </div>
                )}
            </div>
            <button onClick={bookThisPlace} className="primary mt-4">
             Book this place
             {numberOfNights > 0 && (
                <span> ${numberOfNights * place.price}</span>
             )}
            </button>
        </div>
    )
}

export default BookingWidget