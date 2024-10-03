import axios from 'axios';
import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiRequest from '../lib/apiRequest';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Write = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const upload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "blogApp");
    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dneg17tpk/image/upload", data);
      const { url } = res.data;
      return url;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) {
      imgUrl = await upload(file);
      if (!imgUrl) {
        alert('Image upload failed. Please try again.');
        return;
      }
    }

    try {
      await apiRequest.post(
        `/posts/`,
        {
          title,
          desc: value,
          img: file ? imgUrl : "",
          username: currentUser.username,
          categories: cat ? [cat] : []
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}` // Add token in headers
          }
        }
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='add'>
      <div className="content">
        <input type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
        <div className="editorContainer">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
      </div>

      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>

        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
