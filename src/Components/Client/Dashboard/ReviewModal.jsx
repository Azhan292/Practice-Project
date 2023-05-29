import React, { useState } from "react";
import Rating from "react-rating";
import "./ReviewModal.style.css";

// icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

// firebase
import { addClientReview } from "../../../Apis/API";

const ReviewModal = ({ setModal, modalData, setModalData }) => {
  const [rate, setRate] = useState(null);
  const [customerComment, setCustomerComment] = useState(null);

  const clearFields = () => {
    setRate(null);
    setCustomerComment(null);
    setModalData({});
  };

  const handleModal = () => {
    setModal(false);
    document.body.style.overflowY = "auto";
  };

  const handleSubmit = async () => {
    try {
      await addClientReview(
        modalData.freelancerId,
        modalData.projectKey,
        customerComment,
        rate
      );
      clearFields();
      handleModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="review__modal">
      <h1 className="medium__text primary">
        Give your valuable feedback and rating
      </h1>
      <div id="line"></div>
      <Rating
        emptySymbol={<AiOutlineStar />}
        fullSymbol={<AiFillStar />}
        fractions={2}
        onChange={(rate) => setRate(rate)}
      />
      <textarea
        cols="30"
        rows="10"
        placeholder="Comments"
        value={customerComment}
        onChange={(e) => setCustomerComment(e.target.value)}
      ></textarea>

      <div className="send__btn">
        <button onClick={handleModal}>Close</button>
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
};

export default ReviewModal;
