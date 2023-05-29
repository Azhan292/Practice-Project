import React from 'react'
import './signup.style.css'

// icons
import { FcGoogle } from 'react-icons/fc';

// Components
import NormalBtn from '../Buttons/NormalBtn';

const SignupForm = () => {
    return (
        <>
            <div id="flex">
                <FcGoogle />
                <button id="google__btn">Sign Up with Google</button>
            </div>
            <div id="flex">
                <div id="line"></div>
                Or
                <div id="line"></div>
            </div>
            <NormalBtn value={'Continue with email'} />
        </>
    )
}

export default SignupForm
