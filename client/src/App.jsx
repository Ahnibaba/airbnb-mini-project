import "./App.css"
import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import Layout from "./Layout"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import NotFoundPage from "./pages/NotFoundPage"
import axios from "axios"
import { useContext } from "react"
import { UserContext } from "./context/userContext"
import AccountPage from "./pages/AccountPage"
import PlacesPage from "./pages/PlacesPage"
import PlacesFormPage from "./pages/PlacesFormPage"
import PlacePage from "./pages/PlacePage"
import BookingsPage from "./pages/BookingsPage"
import BookingPage from "./pages/BookingPage"

axios.defaults.baseURL = "http://localhost:4321"

const App = () => {
  const { user, loading } = useContext(UserContext)

  if(loading) {
    return <div>Loading....</div>
  }
  return (
    
      <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/account" element={!user ? <LoginPage /> : <AccountPage />} />
      <Route path="/account" element={!user ? <LoginPage /> : <AccountPage />} />
      <Route path="/account/places" element={!user ? <LoginPage /> : <PlacesPage />} />
      <Route path="/account/places/new" element={!user ? <LoginPage /> : <PlacesFormPage />} />
      <Route path="/account/places/:id" element={!user ? <LoginPage /> : <PlacesFormPage />} />
      <Route path="/place/:id" element={!user ? <LoginPage /> : <PlacePage />} />
      <Route path="/account/bookings" element={!user ? <LoginPage /> : <BookingsPage />} />
      <Route path="/account/bookings/:id" element={!user ? <LoginPage /> : <BookingPage />} />

      <Route path="*" element={<NotFoundPage />} />
      </Route>
        
      </Routes>
    

  )
}

export default App