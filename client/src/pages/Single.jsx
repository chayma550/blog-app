import React, { useContext, useEffect, useState } from 'react'
import Delete from '../img/delete.png'
import Edit from '../img/edit.png'
import { Link,  useNavigate,  useParams } from 'react-router-dom'
import Menu from '../components/Menu'
import { AuthContext } from '../context/AuthContext'
import apiRequest from '../lib/apiRequest'
import DOMPurify from 'dompurify'

const Single = () => {
  const{currentUser}=useContext(AuthContext)
  const{id:postId}=useParams()
  const navigate=useNavigate()
  const[post,setPost]=useState({})
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        if (postId) {
          const res = await apiRequest.get(`/posts/${postId}`);
          setPost(res.data);
        } else {
          console.error('Post ID is undefined');
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await apiRequest.delete(`/posts/${post._id}?username=${currentUser.username}`);
  
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className='single'>
      <div className="content">
      <img 
          src={post.img}
          alt=''/>
<div className="user">
<img src={currentUser.profilePic || "/img/noavatar.jpg"} alt=''/>
<div className="info">
<Link to={`/?user=${post.username}`} className="link">      
  <span>{post.username}</span>
  </Link>
  <p>Posted {new Date(post.createdAt).toDateString()}</p>
</div>
<div className="edit">

<img src={Edit} alt='' />

 
<img src={Delete} alt='' onClick={handleDelete} />  

</div>
</div>
<h1>{post.title}</h1>
<div dangerouslySetInnerHTML={{
              __html:DOMPurify.sanitize(post.desc),
            }}>
            </div>




      </div>

<Menu categories={post.categories}/>



    </div>
  )
}

export default Single
