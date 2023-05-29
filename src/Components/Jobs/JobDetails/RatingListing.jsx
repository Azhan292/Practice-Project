import React, { useState, useEffect } from "react";
import Rating from "react-rating";
import "./ratinglisting.style.css";

// firebase
import { db } from "../../../firebase";
import useReviewsById from "../../../hooks/useReviewsById";

// icons
import { AiFillStar } from "react-icons/ai";
import { ImStarEmpty } from "react-icons/im";
import { BsStarHalf } from "react-icons/bs";

// redux
import { useSelector } from "react-redux";

const RatingListing = () => {
  const jobData = useSelector((state) => state.jobsReducer.job);
  const { reviews } = useReviewsById(
    "ClientUsers",
    "FreelancerUsers",
    jobData.clientId
  );

  return (
    <div className="jobdetails__rating__sec">
      {reviews &&
        reviews.map((review, index) => {
          return (
            <div key={index}>
              <div id="rating__sec__flex">
                <div className="review__sec">
                  <div id="profile__img">
                    <img src={review.profilePic} alt="freelancer" />
                  </div>
                  <div>
                    <h2 className="medium__text">
                      <strong>{review.name}</strong>
                    </h2>
                    <p>{review.comment}</p>
                  </div>
                </div>
                <div className="rating__sec">
                  <div id="rating">
                    <Rating
                      emptySymbol={<ImStarEmpty />}
                      halfSymbol={<BsStarHalf />}
                      fullSymbol={<AiFillStar />}
                      initialRating={review.rating}
                      readonly={true}
                    />
                    {parseFloat(review.rating).toFixed(1)}
                  </div>
                </div>
              </div>
              <div id="line"></div>
            </div>
          );
        })}
    </div>
  );
};

export default RatingListing;
