import React, { useState, useEffect } from "react";
import "./introsec.style.css";
import Rating from "react-rating";

// icons
import { AiFillStar, AiOutlineDownload } from "react-icons/ai";
import { FcBusinessman } from "react-icons/fc";
import { MdWork } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { ImPriceTags, ImStarEmpty } from "react-icons/im";
import { BsStarHalf } from "react-icons/bs";

// redux
import ReadMore from "../../../CommonComponents/ReadMore";

// firebase
import useFreelancerDashboardCount from "../../../../hooks/useFreelancerDashboardCount";
import useRating from "../../../../hooks/useRating";

const IntroSec = ({ freelancer }) => {
  const { activeJobs, completedJobs, earnings } = useFreelancerDashboardCount(
    freelancer.id
  );
  const { rating, reviewsCount } = useRating(freelancer.reviews);

  return (
    <div className="intro__sec">
      <a
        href={freelancer && freelancer.resume && freelancer.resume}
        className="resume__btn"
      >
        <AiOutlineDownload /> Download Resume
      </a>
      <div className="left__side">
        <div className="profile__img">
          {freelancer && freelancer.profilePic ? (
            <img src={freelancer.profilePic} alt="Freelancer" />
          ) : (
            <FcBusinessman />
          )}
        </div>
        <span className="small__text">
          {freelancer &&
            freelancer.personalInfo &&
            freelancer.personalInfo.developmentCate &&
            freelancer.personalInfo.developmentCate}
        </span>
        <h2 className="small__text">
          {freelancer &&
            freelancer.personalInfo &&
            freelancer.personalInfo.city}
          ,
          {freelancer &&
            freelancer.personalInfo &&
            freelancer.personalInfo.country}
        </h2>
        <h2 className="small__text">
          Currently Time:{" "}
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </h2>
      </div>
      <div className="right__side">
        <h1 className="large__text">{freelancer && freelancer.name}</h1>
        <span className="medium__text">
          {freelancer &&
            freelancer.personalInfo &&
            freelancer.personalInfo.developmentCate &&
            freelancer.personalInfo.developmentCate}
        </span>
        <h2 className="small__text rating">
          <Rating
            emptySymbol={<ImStarEmpty />}
            halfSymbol={<BsStarHalf />}
            fullSymbol={<AiFillStar />}
            initialRating={rating}
            readonly={true}
          />
          {rating && rating.toFixed(1)} (
          {reviewsCount ? `${reviewsCount} reviews` : "0 reviews"})
        </h2>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>
                  <MdWork />
                  Jobs Completed
                </strong>
              </td>
              <td id="percentage">{completedJobs}</td>
            </tr>
            <tr>
              <td>
                <strong>
                  <MdWork />
                  Jobs in progress
                </strong>
              </td>
              <td id="percentage">{activeJobs}</td>
            </tr>
            <tr>
              <td>
                <strong>
                  <ImPriceTags />
                  Earnings
                </strong>
              </td>
              <td id="percentage">$ {earnings}</td>
            </tr>
          </tbody>
        </table>
        <h3 className="medium__text">About Me</h3>
        {freelancer && freelancer.about && (
          <ReadMore maxCharacterCount={950}>
            {freelancer && freelancer.about && freelancer.about}
          </ReadMore>
        )}
      </div>
    </div>
  );
};

export default IntroSec;
