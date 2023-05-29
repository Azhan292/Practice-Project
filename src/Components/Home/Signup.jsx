import React from 'react';
import './signup.style.css';

// icons
import { FcGoogle } from 'react-icons/fc';
import SignupForm from '../CommonComponents/SignupForm';

const Signup = () => {
    return (
        <div className="signup">
            <h2 className="medium__text">Signup for free Project Quotes</h2>
            <SignupForm />
        </div>
    )
}

export default Signup
