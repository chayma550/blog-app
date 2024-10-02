import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router'
import axios from 'axios'
import apiRequest from '../lib/apiRequest'

const Settings = () => {
  const{currentUser,updateUser}=useContext(AuthContext)
  const[error,setError]=useState("")
  const navigate=useNavigate()
  const [file, setFile] = useState(null);


  const upload=async(file)=>{
    const data=new FormData();
    data.append("file",file);
      data.append("upload_preset", "blogApp");
    try{
      const res=await axios.post("https://api.cloudinary.com/v1_1/dneg17tpk/image/upload",data)
      const{url}=res.data;
      return url
    }catch(err){
      console.log(err)
    }
  }
 
  
const handleSubmit=async(e)=>{
  e.preventDefault()
  e.preventDefault()
  let imgUrl = "";
  if (file) {
    imgUrl = await upload(file);
    if (!imgUrl) {
      alert('Image upload failed. Please try again.');
      return;
    }
  }
  const formData=new FormData(e.target)
  const{username,email,password}=Object.fromEntries(formData)
  try{
    const res=await apiRequest.put(`/users/${currentUser._id}`,{
      username,
      email,
      password,
      profilePic:file?imgUrl:"",
    })
    updateUser(res.data)
    navigate("/")

  }catch(err){
    setError(err.response.data.message)
  }

}
  return (
    <div className='settings'>
        <div className="settingsWrapper">
            <div className="settingTitles">
                <span className='updateTitle'>Update Your Account</span>
                <span className='deleteTitle' >Delete Account</span>
            </div>
            <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={currentUser.profilePic ||"/img/noavatar.jpg"}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}

            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={currentUser.username} name="username" />
          <label>Email</label>
          <input type="email" placeholder={currentUser.email} name="email" />
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {error && <span>{error}</span>}

        </form>

        </div>
        

    </div>
  )
}

export default Settings
