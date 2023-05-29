import React, { useContext } from "react";
import { Link } from "react-router-dom";

// style
import "./style.css";

// Logo image
import LogoImage from '../../Assets/Logo/logo.jpeg';

// error context
import AuthErrorContext from '../../Context/authErrorContext';

const Authsidebar = ({ headline, btnName, path }) => {
  const {setAuthError} = useContext(AuthErrorContext);
  return (
    <>
      <div id="shape1"></div>
      <div id="shape2"></div>
      <div id="shape3"></div>
      <div id="shape4"></div>
      <div className="logo">
        <img src={LogoImage} alt="logo" />
      </div>
      <div id="auth__sidebar__inner">
        <h2 className="medium__text"><strong>{headline}</strong></h2>
        <h6 className="small__text">To keep Connected with us please login with your personal info</h6>
        <Link to={path}>
          <button onClick={() => setAuthError('')}>{btnName}</button>
        </Link>
      </div>
    </>
  );
};

export default Authsidebar;