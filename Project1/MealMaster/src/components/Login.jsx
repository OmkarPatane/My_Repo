import React, { useState } from 'react';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase'; // Make sure app is correctly configured

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State to store error message

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth(app); // Get Firebase Auth instance

        try {
            await signInWithEmailAndPassword(auth, email, password); // Use correct method
            console.log('Login Successfully');
            setErrorMessage(''); // Clear any previous error messages on successful login
        } catch (error) {
            console.log(error.message); // For debugging
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                setErrorMessage('Invalid email or password. Please try again.'); // Custom error message for invalid login
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label htmlFor="email">
                    Email:
                    <input type="email" onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label htmlFor="password">
                    Password:
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type='submit'>Login</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if it exists */}
                <p>Don't have an account? <Link to={"/signup"}>Register</Link></p>
            </form>
        </div>
    );
};

export default Login;
