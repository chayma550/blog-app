import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import DOMPurify from 'dompurify';
import apiRequest from '../lib/apiRequest';
const Home = () => {

const[posts,setPosts]=useState([]);
const {search}=useLocation()
useEffect(()=>{
  const fetchPosts=async()=>{
    const res=await apiRequest.get("/posts"+search)
    setPosts(res.data)
  }
  
  fetchPosts()
},[search])






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
