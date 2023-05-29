import React from 'react';
import { Link } from 'react-router-dom';
import './signup.style.css';

// icons
import { FcGoogle } from 'react-icons/fc';

// Components
import NormalBtn from '../../Buttons/NormalBtn';

// redux
import { useSelector } from 'react-redux';

const SignupForm = () => {
    const freelancer = useSelector(state => state.freelancersReducer.freelancer);
    return (
        <>
            <h2 className="medium__text">
                To Discuss your projects with {freelancer && freelancer.name}, 
                <Link to="/Signup"> Sign up</Link>
            </h2>  
            <div id="flex">
                <FcGoogle />
                <button id="google__btn">Sign Up with Google</button>
            </div>
            <div id="flex">
                <div id="line"></div>
                Or
                <div id="line"></div>
            </div>
            <Link to="/Signin"><NormalBtn value={'Continue with email'} /></Link>
        </>
    )
}

export default SignupForm
