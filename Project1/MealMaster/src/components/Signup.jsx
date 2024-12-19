import React, { useState } from 'react';
import '../styles/Signup.css';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase'; // Make sure app is correctly configured

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State to store error message

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth(app); // Get Firebase Auth instance

        try {
            await createUserWithEmailAndPassword(auth, email, password); // Use correct method
            console.log('Account created');
            setErrorMessage(''); // Clear any previous error messages on successful signup
        } catch (error) {
            console.log(error.message); // For debugging
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage('This email is already registered. Please use a different email.'); // Custom error message for already registered email
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className='signup-container'>
            <form className='signup-form' onSubmit={handleSubmit}>
                <h2>Sign up</h2>
                <label htmlFor="email">
                    Email:
                    <input type="email" onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label htmlFor="password">
                    Password:
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type='submit'>Sign up</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if it exists */}
                <p>Already Registered? <Link to={"/login"}>Log in</Link></p>
            </form>
        </div>
    );
};

export default Signup;
