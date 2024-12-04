import { createContext, useEffect, useState } from "react";
import axios from "axios";


const UserContext = createContext(null)

// eslint-disable-next-line react/prop-types
function UserContextProvider({ children }) {

    const[user, setUser] = useState(null)
    const[loading, setLoading] = useState(true)
    const[error, setError] = useState(true)

    const[data, setData] = useState({
      title: "",
      address: "",
      addedPhotos: [],
      photoLink: "",
      description: "",
      perks: [],
      extraInfo: "",
      checkIn: "",
      checkOut: "",
      maxGuests: 1,
      price: 100

  })

  const handleOnChange = (e) => {
   const name = e.target.name
   const value = e.target.value
   setData(prev => ({ ...prev, [name]: value }))
}

    useEffect(() => {
        if(!user) {
             axios.get("/profile", { withCredentials: true })
             .then(response => {
                setUser(response.data.user)
                
             })
             .catch((err) => {
                console.log(err);
                setLoading(false)
                setError(err)
                setUser(null)
                
             })
             .finally(() => {
                setLoading(false)
             })
            
            
        }
    }, [])

    const userValues = {
       user,
       setUser,
       loading,
       setLoading,
       error,
       setError,
       data,
       setData,
       handleOnChange
    }

    return (
        <UserContext.Provider value={userValues}>
          {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider }

