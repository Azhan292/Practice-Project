import React from "react";
import Rating from "react-rating";
import "./details.style.css";

// icons
import { FaStar } from "react-icons/fa";
import { FcBusinessman } from "react-icons/fc";
import { AiFillStar } from "react-icons/ai";
import { ImStarEmpty } from "react-icons/im";
import { BsStarHalf } from "react-icons/bs";

// redux
import { useSelector } from "react-redux";

// firebase
import useFreelancerDashboardCount from "../../../hooks/useFreelancerDashboardCount";
import useReviews from "../../../hooks/useReviews";

// components
import Review from "../../Client/FindFreelancers/Details/Review";

const Details = () => {
  const freelancer = useSelector(
    (state) => state.freelancersReducer.freelancer
  );
  const { completedJobs, earnings } = useFreelancerDashboardCount(
    freelancer.id
  );
  const { reviews } = useReviews(freelancer, "ClientUsers");
  return (
    <>
      <div className="freelancer__intro__sec">
        <div className="profile__img__sec">
          <div id="img">
            {freelancer && freelancer.profilePic ? (
              <img src={freelancer.profilePic} alt="Freelancer" />
            ) : (
              <FcBusinessman />
            )}
          </div>
          <h3 className="small__text">${earnings ? earnings : 0}</h3>
        </div>
        <div className="name__sec">
          <h1 className="medium__text">{freelancer && freelancer.name}</h1>
          <h2 className="small__text" id="skills">
            {freelancer &&
            freelancer.personalInfo &&
            freelancer.personalInfo.developmentCate
              ? freelancer.personalInfo.developmentCate
              : "No Category defined"}
          </h2>
          <h3 className="small__text" id="job__success">
            <span>{completedJobs} Job(s) Completed</span>
          </h3>
          <h3 className="small__text">
            {freelancer &&
            freelancer.personalInfo &&
            freelancer.personalInfo.country
              ? freelancer.personalInfo.country
              : "No Location Found"}
          </h3>
        </div>
      </div>
      <hr />
      <h1 className="large__text">Overview</h1>
      <p className="small__text">{freelancer && freelancer.about}</p>
      <div id="tags">
        {freelancer &&
          freelancer.personalInfo &&
          freelancer.personalInfo.languages &&
          freelancer.personalInfo.languages.map((lang, index) => {
            return (
              <div id="tag" key={index}>
                {lang}
              </div>
            );
          })}
      </div>
      <Review freelancer={freelancer} />
    </>
  );
};

export default Details;
