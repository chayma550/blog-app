import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiRequest from '../lib/apiRequest'

const Register = () => {
  const[error,setError]=useState("")
  const navigate=useNavigate()
  const[loading,setLoading]=useState(false)

  const handleSubmit=async(e)=>{
  e.preventDefault()
  setLoading(true)
  const formData=new FormData(e.target)
  const username=formData.get("username");
  const email=formData.get("email");
  const password=formData.get("password")
  try{
    await apiRequest.post("/auth/register",{username,email,password})
    navigate("/login")

  }catch(err){
    setError(err.res.data.message)

  }finally{
    setLoading(false)
  }
  }
  return (
    <div className="auth">
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
      <input
        required
        type="text"
        placeholder="username"
        name="username"
      />
      <input
        required
        type="email"
        placeholder="email"
        name="email"
      />
      <input
        required
        type="password"
        placeholder="password"
        name="password"
      />
      <button disabled={loading} >Register</button>
      {error && <span>{error}</span>}

      <span>
        Do you have an account? <Link to="/login">Login</Link>
      </span>
    </form>
  </div>
  )
}

export default Register
