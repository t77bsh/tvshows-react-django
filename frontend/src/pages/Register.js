import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'
import './styles/auth.css'
import backgroundImage from '../assets/pexels-tima-miroshnichenko-7991380.jpg'


function Register() {
    const [registerEmail, setRegisterEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dynamicHTML1, setDynamicHTML1] = useState(false);
    const [dynamicHTML2, setDynamicHTML2] = useState(false);
    const navigate = useNavigate();



    const signup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, registerEmail, confirmPassword);
            sessionStorage.setItem('user', auth.currentUser);
            setDynamicHTML1(false);
            setDynamicHTML2(true);
            setTimeout(() => {
                navigate('/')
            }, 2000)
        } catch (error) {
            alert(error)
        }
    };

    const handleSubmit = event => {
        if (password === confirmPassword) {
            signup();
            event.preventDefault();
        }
        else {
            setDynamicHTML1(true);
            setDynamicHTML2(false);
            event.preventDefault();
        }
    };

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})` }} className='signin-background'>
            <div className='auth-div'>
                <div>
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <input className='input input_email' type="email" value={registerEmail} placeholder='Email Address' onChange={e => { setRegisterEmail(e.target.value) }} required /> <br />
                        <input className='input input_password' type="password" value={password} placeholder='Create password' onChange={e => { setPassword(e.target.value) }} required /> <br />
                        <input className='input input_password' type="password" placeholder='Confirm password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                        <button className='signin-button'>Register</button>
                    </form><br />
                    <Link to='/sign-in'>Already have an account? Sign In</Link>
                    <br /> <br />
                    <Link to='/'>Back to home</Link>
                    {dynamicHTML1 && <div style={{ marginTop: '1rem' }}>Passwords do not match! Please try again.</div>}
                    {dynamicHTML2 && <div style={{ marginTop: '1rem' }}>Success!</div>}
                </div>
            </div>
        </div>
    )
}

export default Register