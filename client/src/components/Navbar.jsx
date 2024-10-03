import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../img/logo.png";
import { AuthContext } from '../context/AuthContext';
import apiRequest from '../lib/apiRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);
  const [open, setOpen] = useState(false);

  // Retrieve token from local storage

  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await apiRequest.get('/categories', {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,  // Include the token in headers
          },
        });
        setCats(res.data);
      } catch (error) {
        console.log('Error fetching categories:', error);
      }
    };
    getCats();
  }, [token]);

  const handleLogout = async () => {
    try {
      await apiRequest.post('/auth/logout');
      updateUser(null);  // Reset the user in the AuthContext
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='navbar'>
      <div className='container'>
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt='logo' />
          </Link>
        </div>

        <div className="links">
          {cats.map((cat) => (
            <Link className="link" to={`/?cat=${cat.name}`} key={cat._id}>
              <h6>{cat.name}</h6>
            </Link>
          ))}
        </div>

        <div className="buttons">
          {currentUser ? (
            <>
              <span className="write">
                <Link className="link" to="/write">write</Link>
              </span>
              <div className='user' onClick={() => setOpen(!open)}>
                <img
                  className="topImg"
                  src={currentUser.profilePic || "/img/noavatar.jpg"}
                  alt=""
                />
                <span style={{ fontWeight: "650" }}>{currentUser.username}</span>
                {open && (
                  <div className="options">
                    <Link to="/settings" className='link'>
                      <span><FontAwesomeIcon icon={faGear} /> Settings</span>
                    </Link>
                    <span className='logout' onClick={handleLogout}>
                      <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                    </span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className='buttonstyle'>Login</button>
              </Link>
              <Link to="/register">
                <button className='buttonstyle'>Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
