import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"


const Layout = () => {
  return (
    <div className="py-4 px-8 flex flex-col min-h-screen">
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Layout