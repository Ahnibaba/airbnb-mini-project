import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const HomePage = () => {
  const [allPlaces, setAllPlaces] = useState([])
  useEffect(() => {
    axios.get("/places", { withCredentials: true }).then(response => {
      if(response.data.success && response.statusText === "OK") {
        setAllPlaces(response.data.places)
      }
    })
  }, [])
  console.log(allPlaces);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {allPlaces.length > 0 && allPlaces.map((place, index) => (
        <Link to={`/place/${place._id}`} key={index} className="">
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.addedPhotos?.[0] && (
              <img className="rounded-2xl object-cover aspect-square" src={`https://airbnb-mini-project-uuu2.onrender.com/uploads/${place.addedPhotos[0]}`} alt="" />
            )}
          </div>
          
          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  )
}
 
export default HomePage