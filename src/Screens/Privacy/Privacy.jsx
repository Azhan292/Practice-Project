import React from "react";
import Navbar from "../../Components/Headers/Navbar";
import Footer from "../../Components/Footer/Footer";

// Data
import { privacyData } from "./privacyData";

const Privacy = () => {
  return (
    <>
      <div className="main__section container">
        <h1 className="large__text">
          Your privacy is important at DSPR Connect, So we've developed a
          Privacy Policy that covers how we collect, use, disclose, transfer,
          and store your information. Please take a moment to familiarize
          yourself with our privacy practices and contact if you have any
          questions. Collection and Use of Personal information data that can be
          used to uniquely identify or contact a single person. You are asked to
          provide your personal information to sign Up at DSPR Connect. Here are
          some examples of the types of personal information DSPR Connect may
          collect and how we may use it.
        </h1>
        {privacyData.map((privacy) => {
          return (
            <div key={privacy.id}>
              <h2 className="medium__text__bold">{privacy.title}</h2>
              <p className="small_text">{privacy.description}</p>
            </div>
          );
        })}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Privacy;
