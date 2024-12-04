import { useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"
import axios from "axios"
import PlacesPage from "./PlacesPage"
import AccountNav from "./AccountNav"


const AccountPage = () => {

  const { user, setUser } = useContext(UserContext)

  const { subpage } = useParams()

  const navigate = useNavigate()

  async function Logout() {
    const response = await axios.post("/logout", {}, { withCredentials: true })
    if (response.data.success && response.statusText === "OK") {

      navigate("/")
      setUser({})
      window.location.reload()

    }
  }


  


  return (
    <div className="">
      <AccountNav />
      {subpage === undefined && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={Logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}

      {subpage === "places" && (
        <PlacesPage />
      )}
    </div>
  )
}

export default AccountPage