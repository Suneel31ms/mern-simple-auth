import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Home = ({props}) => {

    const navigate = useNavigate()

  const [user, setUser] = useState(null)

  const getUser = async () => {
    const res = await axios.get("/auth", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    setUser(res.data)
  }

  useEffect(() => {
    getUser()
    if (!localStorage.getItem("token")) {
       navigate("/login")
     }
   
  }, [navigate])

  //Logout
  const logout = () => {
    localStorage.removeItem("token")
    // props.history.push("/login")
    navigate("/login")
  }

  
  return (
    <div>
      <h1>{props}</h1>
      <p>Welcome {user && user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home