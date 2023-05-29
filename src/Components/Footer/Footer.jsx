import React from 'react';
import { Link } from 'react-router-dom';
import './footer.style.css';

// logo
import Logo from '../../Assets/Logo/logo.png';

// icons
import { AiFillFacebook, AiFillInstagram, AiFillTwitterSquare, AiOutlineCopyrightCircle } from 'react-icons/ai';

// redux
import { useSelector } from 'react-redux';

const Footer = () => {
    const user = useSelector(state => state.userReducer.user);
    return (
        <div className="footer">
            <div className="upper__sec">
                <div id="sec__one">
                    <img src={Logo} alt="logo" />
                    <div id="social__links">
                        <AiFillFacebook />
                        <AiFillInstagram />
                        <AiFillTwitterSquare />
                    </div>
                </div>
                <div id="sec__two">
                    <ul>
                        <li><span>Support</span></li>
                        <li>Contact Us</li>
                        <li>FAQ</li>
                        <li>Download</li>
                        <li>Locate a dealer</li>
                        <li>Product registration</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div id="sec__three">
                    <ul>
                        <li><span>About Company</span></li>
                        <li>Hire Freelancers</li>
                        <li>Post Jobs</li>
                        <li>Get Jobs</li>
                        <li>Contact Sellers</li>
                        <li>Chat Facility</li>
                    </ul>
                </div>
                {user && !user.email && 
                <div id="sec__four">
                    <Link to="signup">Get Started</Link>
                </div>}
            </div>
            <div className="lower__sec">
                <h1 className="small__text"><AiOutlineCopyrightCircle /> 2021 All Rights Reserved By DSPRConnect</h1>                
            </div>
        </div>
    )
}

export default Footer
