import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import DOMPurify from 'dompurify';
import apiRequest from '../lib/apiRequest';
import { AuthContext } from '../context/AuthContext';
const Home = () => {

const[posts,setPosts]=useState([]);
const {search}=useLocation()
const token = localStorage.getItem('accessToken');
const { currentUser } = useContext(AuthContext);

useEffect(()=>{
  const fetchPosts=async()=>{
    try{
      const res=await apiRequest.get("/posts"+search,{
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,  // Include the token in headers
        },
      })
     
      setPosts(res.data)
    }catch(error){
      console.log('Error fetching posts:', error);

    }
    }
   
  
  fetchPosts()
},[search,[currentUser.accessToken]])






  return (
    <div className='home'>
      <div className="posts">
{posts.map(post=>(
  <div className='post' key={post._id}>
<div className='img'>
<Link to={`/post/${post._id}`} className='link'>

  <img src={post.img} alt=""/>
  </Link>

</div>

<div className="content">
<Link to={`/post/${post._id}`} className='link'>
<h1>{post.title}</h1>
<div dangerouslySetInnerHTML={{
 __html:DOMPurify.sanitize(post.desc),
 }}>
  </div>

<button>Read More</button>
</Link>

</div>
  </div>
))}


      </div>
      
    </div>
  )
}

export default Home
