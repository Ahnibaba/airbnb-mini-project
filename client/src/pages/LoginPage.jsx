import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { UserContext } from "../context/userContext"

const LoginPage = () => {

  const { setUser } = useContext(UserContext)

  const[data, setData] = useState({
      email: "",
      password: ""
  })

  const navigate = useNavigate()
  const { pathname } = useLocation()
  console.log(pathname);
  
 


  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = async(e) => {
     e.preventDefault()
     try {
       const response = await axios.post("/login", data, { withCredentials: true })
       console.log(response);
       
       if(response.data.success && response.statusText === "OK") {
         setUser(response.data.user)
         alert("Login successful")
        
         navigate(pathname)
         if(pathname === "/login") {
          navigate("/")
         }
         
       }

      
       
     } catch(err) {
       alert("Login failed " + err)
     }

     
  }
    return (
        <div className="mt-4 grow flex items-center justify-around">
          <div className="mb-64">
          <h1 className="text-4xl text-center mb-4">Login</h1>
            <form onSubmit={onSubmit} className="max-w-md mx-auto">
            <label htmlFor="email"></label>
                <input type="email" onChange={onChangeHandler} value={data.email} name="email" placeholder="your@email.com" />
                <input type="password" onChange={onChangeHandler} value={data.password} name="password" placeholder="password" />
                <button className="primary">Login</button>
                <div className="text-center py-2 text-gray-500">
                  Don&apos;t have an account yet? <Link className="underline text-black" to={"/register"}>Register now</Link>
                </div>
            </form>
          </div>
        </div>
    )
}

export default LoginPage