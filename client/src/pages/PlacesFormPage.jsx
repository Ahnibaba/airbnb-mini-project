import { useContext, useEffect } from "react"
import { UserContext } from "../context/userContext"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import PhotosUploader from "../components/PhotosUploader"
import Perks from "../components/Perks"
import AccountNav from "./AccountNav"

const PlacesFormPage = () => {
    const { data, setData, handleOnChange } = useContext(UserContext)
    const { id } = useParams()


    const navigate = useNavigate()

    useEffect(() => {
        if (!id) {
            return
        }else {
            axios.get(`/places/${id}`, { withCredentials: true }).then(response => {
            const place = response.data.place
            const onLoad = () => {

                for (const key in place) {
                    
                    for (const datum in data) {
                        if (key === datum) {
                            console.log(key);
                            setData(prev => ({ ...prev, [datum]: place[key] }))
                        }
                    }
                }
            }
            onLoad()

        })
        }
        
    }, [id])

    const updateData = { ...data, id }

    async function savePlace(e) {
        e.preventDefault()
        if (id) {
          const response = await axios.put("/places/update", updateData, { withCredentials: true })
          console.log(response);
          
          if (response.data.success && response.statusText === "OK") {
            navigate("/account/places")
        }
        } else {
            const response = await axios.post("/places/add", data, { withCredentials: true })
            console.log(response);

            if (response.data.success && response.statusText === "Created") {
                navigate("/account/places")
            }
        }


    }

    return (
        <div className="">
            <AccountNav />
            <form onSubmit={savePlace}>
                <h2 className="text-2xl mt-4">Title</h2>
                <p className="text-gray-500 text-sm">Title for your place; should be brief and catchy</p>
                <input name="title" value={data.title} onChange={handleOnChange} type="text" placeholder="title, for example: My lovely apartment" />
                <h2 className="text-2xl mt-4">Address</h2>
                <p className="text-gray-500 text-sm">Address to your place</p>
                <input name="address" value={data.address} onChange={handleOnChange} type="text" placeholder="address" />
                <h2 className="text-2xl mt-4">Photos</h2>
                <p className="text-gray-500 text-sm">more = better</p>
                <PhotosUploader />
                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-gray-500 text-sm">description of the place</p>
                <textarea name="description" value={data.description} onChange={handleOnChange} />
                <h2 className="text-2xl mt-4">Perks</h2>
                <p className="text-gray-500 text-sm">Select all the perks in your place</p>
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={data.perks} onChange={setData} />
                </div>
                <h2 className="text-2xl mt-4">Extra info</h2>
                <p className="text-gray-500 text-sm">house rules, etc</p>
                <textarea name="extraInfo" value={data.extraInfo} onChange={handleOnChange} />
                <h2 className="text-2xl mt-4">Check in&out times</h2>
                <p className="text-gray-500 text-sm">add check in and out times, remember to have some time window for cleaning the room between guests</p>
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div className="">
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input name="checkIn" value={data.checkIn} onChange={handleOnChange} type="text" placeholder="14" />
                    </div>
                    <div className="">
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input name="checkOut" value={data.checkOut} onChange={handleOnChange} type="text" placeholder="11" />
                    </div>
                    <div className="">
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input name="maxGuests" value={data.maxGuests} onChange={handleOnChange} type="number" />
                    </div>
                    <div className="">
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input name="price" value={data.price} onChange={handleOnChange} type="number" />
                    </div>
                </div>
                <div className="">
                    <button className="primary my-4">Save</button>
                </div>
            </form>
        </div>
    )
}

export default PlacesFormPage