import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (e) => {
     const name = e.target.name
     const value = e.target.value
     setData(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("/register", data)
      console.log(response);
      alert("Registration successful, now you can log in")
    } catch (err) {
       alert("Registration failed, please try again")
       console.log(err);
       
    }
    
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
          <div className="mb-64">
          <h1 className="text-4xl text-center mb-4">Register</h1>
            <form className="max-w-md mx-auto" onSubmit={onSubmit}>
                <input onChange={onChangeHandler} value={data.name} name="name" type="text" placeholder="John Doe" />
                <input onChange={onChangeHandler} value={data.email} name="email" type="email" placeholder="your@email.com" />
                <input onChange={onChangeHandler} value={data.password} name="password" type="password" placeholder="password" />
                <button className="primary">Register</button>
                <div className="text-center py-2 text-gray-500">
                  Already a member ? <Link className="underline text-black" to={"/login"}>Login</Link>
                </div>
            </form>
          </div>
        </div>
  )
}

export default RegisterPage