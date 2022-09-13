import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './styles/auth.css'
import { auth } from '../firebase.js'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import backgroundImage from '../assets/pexels-tima-miroshnichenko-7991380.jpg'


function SignIn() {
    document.body.classList.add('signin-body');
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleClick = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log(user);
                sessionStorage.setItem('user', user);
                navigate('/');
            })
            .catch((error) => {
                alert(error);
            })
    };

    const sendPassword = () => {
        sendPasswordResetEmail(auth, email).then(() => { alert('Check your email to reset password') })
            .catch((error) => {
                alert(error)
            })
    }

    return (
        <>
            <div style={{ backgroundImage: `url(${backgroundImage})` }} className='signin-background'>
                <div className='auth-div'>
                    <div>
                        <h2>Sign In</h2>
                        <input className='input input_email' type="email" value={email} placeholder='Email Address' onChange={e => { setEmail(e.target.value) }} /> <br />
                        <input className='input input_password' type="password" value={password} placeholder='Password' onChange={e => { setPassword(e.target.value) }} /> <br />
                        <button onClick={handleClick} className='signin-button'>Sign In</button>
                        <p onClick={() => sendPassword()}>Forgot your password?</p>
                        <Link to='/register'>Don't have an account? Register</Link>
                        <br />
                        <br />
                        <Link to='/'>Back to home</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn