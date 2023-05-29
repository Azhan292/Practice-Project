import React from 'react';
import { Link } from 'react-router-dom';
import './topbar.style.css';

// logo
import LogoImage from '../../Assets/Logo/logo.png';

const TopBar = () => {
    return (
        <>
            <div className="top__bar">
                <div className="logo">
                    <img src={LogoImage} alt="Logo" />
                </div>
                <ul className="flex">
                    <Link to='/Signin'><li className="small__text">Login</li></Link>
                    <Link to='/Signup'><li className="small__text get__started">Get Started</li></Link>
                </ul>
            </div>
        </>
    )
}

export default TopBar;
