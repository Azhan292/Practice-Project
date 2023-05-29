import React from "react";
import Rating from "react-rating";
import "./review.style.css";

// icons
import { AiFillStar } from "react-icons/ai";
import { ImStarEmpty } from "react-icons/im";
import { BsStarHalf } from "react-icons/bs";

// firebase
import useReviews from "../../../../hooks/useReviews";

const Review = ({ freelancer }) => {
  const { reviews } = useReviews(freelancer, "ClientUsers");

  return (
    <div className="freelancer__details__reviews">
      <h1 className="large__text">Reviews</h1>
      <div id="line"></div>
      {reviews &&
        reviews.map((review, index) => {
          return (
            <div key={index}>
              <div>
                <h2 className="small__text rating">
                  <Rating
                    emptySymbol={<ImStarEmpty />}
                    halfSymbol={<BsStarHalf />}
                    fullSymbol={<AiFillStar />}
                    initialRating={review.rating}
                    readonly={true}
                  />
                  {parseFloat(review.rating).toFixed(1)}
                </h2>
                <h2 className="small__text">{review.comment}</h2>
                <div className="flex">
                  <div className="profile__img">
                    <img src={review.image} alt="buyer" />
                  </div>
                  <h2 className="small__text">
                    <strong>{review.buyerName}</strong>
                  </h2>
                </div>
              </div>
              <div id="line"></div>
            </div>
          );
        })}
    </div>
  );
};

export default Review;
