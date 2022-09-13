import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './styles/header.css'
import { auth } from '../firebase.js'
import { signOut } from "firebase/auth";

export const Header = () => {
  const navigate = useNavigate();

  function signedInStatus() {
    if (sessionStorage.getItem('user') !== null) {
      return true
    }
    return false
  }

  //signout button
  const handleClick = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      sessionStorage.removeItem('user');
      navigate('/');

    }).catch((error) => {
      alert(error)
    })
  }

  return (
    <header>
      <nav>
        <Link to='/'><h1 className="header-logo">TV Classics</h1></Link>
        <div className="nav-items">
          <Link className="home" to="/">Home</Link>
          {signedInStatus() ? <Link onClick={handleClick} to="/"><button className='CTA-button'>Sign Out</button></Link> : <Link to="/sign-in"><button className='CTA-button'>Sign In</button></Link>}
        </div>
      </nav>
    </header>
  );
}

export default Header;