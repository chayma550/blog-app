import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import apiRequest from '../lib/apiRequest'
const Login = () => {
  const[error,setError]=useState("")
  const[loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const {updateUser}=useContext(AuthContext)

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true)
    const formData=new FormData(e.target)
    const username=formData.get("username")
    const password=formData.get("password")
    try{
      const res=await apiRequest.post("/auth/login",{username,password})
      updateUser(res.data)
      navigate("/")

    }catch(err){
      setError(err.response.data.message)
    }
    finally{
      setLoading(false)
    }

  }

  return (
   
    <div className="auth">
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <input
        required
        type="text"
        placeholder="username"
        name="username"
      />
      <input
        required
        type="password"
        placeholder="password"
        name="password"
      />
      <button  disabled={loading} >Login</button>
      {error && <span>{error}</span>}
      <span>
        Don't you have an account? <Link to="/register">Register</Link>
      </span>
    </form>
  </div>
  )
}

export default Login
