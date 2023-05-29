import React, { useState } from "react";
import "./submitprofile.style.css";
import { useHistory } from "react-router-dom";

// firebase
import {
  uploadFreelancerProfilePic,
  uploadFreelancerCV,
  addFreelancerProfileData,
} from "../../Apis/API.js";

// icons
import { FaUserAlt } from "react-icons/fa";

// redux
import { useSelector } from "react-redux";

const SubmitProfile = ({
  setShowSec,
  category,
  experience,
  resume,
  languages,
  rate,
  overview,
  photo,
  address,
  phone,
  setLoading,
}) => {
  const history = useHistory();
  const user = useSelector((state) => state.userReducer.user);

  const submitProfile = async (
    languages,
    overview,
    country,
    city,
    postal,
    phone,
    cate,
    experience,
    company,
    location,
    expCountry,
    experienceLevel
  ) => {
    try {
      setLoading(true);
      await addFreelancerProfileData(
        languages,
        overview,
        country,
        city,
        postal,
        phone,
        cate,
        experience,
        company,
        location,
        expCountry,
        experienceLevel
      );
      await uploadFreelancerProfilePic(photo);
      await uploadFreelancerCV(resume);
      setLoading(false);
      alert("Profile Setup Successfully");
      history.push("/jobs");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="submit__profile__sec">
        <div className="upper__box">
          <div id="upper__box__flex">
            <button id="edit__btn" onClick={() => setShowSec("category")}>
              <span>Edit</span>
            </button>
            <div className="photo">
              {photo ? <img src={photo.url} alt="user" /> : <FaUserAlt />}
            </div>
            <div className="intro">
              <h1 className="large__text center">
                {user && user.name ? user.name : "Your Name"}
              </h1>
              <h2 className="small__text">
                <strong>
                  {address && address.country && address.city
                    ? address.country + "," + address.city
                    : "Your Address"}
                </strong>
              </h2>
              <h2 className="small__text center">
                <strong>
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </strong>
              </h2>
            </div>
          </div>
          <p>
            {overview && overview.desc ? overview.desc : "No Overview to show"}
          </p>
          <hr />
          <h1 className="medium__text">Languages</h1>
          <div id="tags">
            {languages.length != 0
              ? languages.map((lang, index) => {
                  return (
                    <div id="tag" key={index}>
                      {lang}
                    </div>
                  );
                })
              : "No Lanuguages Selected"}
          </div>
        </div>
        <div className="lower__box">
          <button id="edit__btn" onClick={() => setShowSec("resume")}>
            <span>Edit</span>
          </button>
          <h1 className="medium__text">Resume File</h1>
          <hr />
          {resume && resume.name ? (
            <h3 className="small__text file__name">{resume.name}</h3>
          ) : null}
          {resume && !resume.name ? (
            <a href={resume}>Resume Uploaded (click to download)</a>
          ) : null}
        </div>
        <div className="submit__btn">
          <button
            onClick={() => {
              submitProfile(
                languages,
                overview.desc,
                address.country,
                address.city,
                address.zipCode,
                phone,
                category.cat,
                experience.title,
                experience.company,
                experience.location,
                experience.country,
                experience.level
              );
            }}
          >
            Submit Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default SubmitProfile;
