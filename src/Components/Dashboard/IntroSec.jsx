import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import "./introsec.style.css";

// icons
import { AiFillStar, AiOutlineDownload } from "react-icons/ai";
import { MdWork } from "react-icons/md";
import { ImPriceTags, ImStarEmpty } from "react-icons/im";
import { BsStarHalf } from "react-icons/bs";

// redux
import { useSelector } from "react-redux";

// components
import ReadMore from "../CommonComponents/ReadMore";
import Modal from "./Modal";

// firebase
import useFreelancerDashboardCount from "../../hooks/useFreelancerDashboardCount";
import useRating from "../../hooks/useRating";

const IntroSec = () => {
  const [modal, setModal] = useState(false);
  const user = useSelector((state) => state.userReducer.user);
  const { activeJobs, completedJobs, earnings } = useFreelancerDashboardCount(
    user.id
  );
  const { rating, reviewsCount } = useRating(user.reviews);

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="intro__sec">
      {modal && <Modal handleModal={handleModal} />}
      <a href={user && user.resume && user.resume} className="resume__btn">
        <AiOutlineDownload /> Download Resume
      </a>
      <div className="payment__verify">
        {user && user.PaymentDetails ? (
          <div className="payment__verified">Payment Verified</div>
        ) : (
          <div className="payment__not__verified" onClick={handleModal}>
            Payment Not Verified
          </div>
        )}
      </div>
      <div className="left__side">
        <div className="profile__img">
          <img src={user && user.profilePic && user.profilePic} alt="seller" />
        </div>
        <span className="small__text">
          {user &&
            user.personalInfo &&
            user.personalInfo.developmentCate &&
            user.personalInfo.developmentCate}
        </span>
        <h2 className="small__text">
          {user &&
            user.personalInfo &&
            user.personalInfo.city &&
            user.personalInfo.city}
          ,{" "}
          {user.personalInfo &&
            user.personalInfo.country &&
            user.personalInfo.country}
        </h2>
        <h2 className="small__text">
          Current Time:{" "}
          <span>
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </h2>
        <h2 className="small__text">Languages</h2>
        <div id="tags">
          {user && user.personalInfo && user.personalInfo.languages.length != 0
            ? user.personalInfo.languages.map((lang, index) => {
                return (
                  <div id="tag" key={index}>
                    {lang}
                  </div>
                );
              })
            : "No Lanuguages"}
        </div>
        <h2 className="small__text">
          Proficiency:{" "}
          <span>
            {user &&
              user.personalInfo &&
              user.personalInfo.experienceLevel &&
              user.personalInfo.experienceLevel}
          </span>
        </h2>
      </div>
      <div className="right__side">
        <h1 className="large__text capitalize">
          {user && user.name && user.name}
        </h1>
        <span className="medium__text">
          {user &&
            user.personalInfo.developmentCate &&
            user.personalInfo.developmentCate}
        </span>
        <h2 className="small__text rating">
          <Rating
            emptySymbol={<ImStarEmpty />}
            halfSymbol={<BsStarHalf />}
            fullSymbol={<AiFillStar />}
            initialRating={rating}
            readonly={true}
          />
          {rating && rating.toFixed(1)} ({reviewsCount ? reviewsCount : 0}{" "}
          reviews)
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
        {user && user.about && (
          <ReadMore maxCharacterCount={950}>
            {user && user.about && user.about}
          </ReadMore>
        )}
      </div>
    </div>
  );
};

export default IntroSec;
