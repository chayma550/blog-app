import React, { useEffect, useState } from 'react'
import apiRequest from '../lib/apiRequest';
import { Link } from 'react-router-dom';

function Menu({categories}) {
   const[posts,setPosts]=useState([])

   useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await apiRequest.get(`/posts/?cat=${categories}`);
            setPosts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    fetchData();
}, [categories]);

        return (
            <div className="menu">
              <h1>Other posts you may like</h1>
              {posts.map((post) => (
                <div className="post" key={post._id}>
                  <Link to={`/post/${post._id}`} className='link'>

                  <img src={post.img} alt="" />
                  <h2>{post.title}</h2>
                  <button>Read More</button>
                  </Link>
                </div>
              ))}
            </div>
          );
        };
        

export default Menu
