import React, { useState, useEffect } from "react";
import Rating from "react-rating";
import "./introsec.style.css";

// icons
import { AiFillStar } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { ImPriceTags, ImStarEmpty } from "react-icons/im";
import { BsStarHalf } from "react-icons/bs";

// redux
import { useSelector } from "react-redux";

// components
import Modal from "./Modal";
import FullPageLoading from "../../../Screens/Loader/FullPageLoading";

// APIs
import useClientDashboardCount from "../../../hooks/useClientDashboardCount";
import useRating from "../../../hooks/useRating";
import { uploadClientProfilePicture } from "../../../Apis/API";

const IntroSec = () => {
  const user = useSelector((state) => state.userReducer.user);
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const {
    activeJobs,
    inActiveJobs,
    completedJobs,
    totalJobsPosted,
    totalSpent,
  } = useClientDashboardCount();
  const { rating, reviewsCount } = useRating(user.reviews);

  const handleModal = () => {
    setModal(!modal);
  };

  const handleImage = (e) => {
    setPhoto({
      ...photo,
      details: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
  };

  const uploadProfile = async () => {
    try {
      setLoading(true);
      if (photo && photo.url && photo.details) {
        await uploadClientProfilePicture(photo);
        setLoading(false);
      } else {
        alert("Please choose a photo");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="intro__sec">
      <div className="update__profile" onClick={handleModal}>
        Update Profile
      </div>
      {modal ? <Modal handleModal={handleModal} /> : null}
      <div className="left__side">
        <div className="profile__img">
          <input type="file" onChange={handleImage} />
          <div className="img__update">
            <button className="btn">
              <FaEdit />
            </button>
            <input
              type="file"
              onChange={handleImage}
              accept="image/png, image/jpg, image/jpeg"
            />
          </div>
          <img
            src={
              photo && photo.url && photo.details
                ? photo.url
                : user.profilePic && user.profilePic
            }
            alt="client"
          />
        </div>
        <div className="upload">
          {loading ? (
            <FullPageLoading />
          ) : (
            <input
              type="submit"
              value="Upload"
              onClick={() => uploadProfile()}
            />
          )}
        </div>
        <h2 className="small__text">
          {user && user.city && user.city}{" "}
          {user && user.country && user.country}
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
        <h1 className="large__text">{user && user.name && user.name}</h1>
        <h2 className="small__text rating">
          <Rating
            emptySymbol={<ImStarEmpty />}
            halfSymbol={<BsStarHalf />}
            fullSymbol={<AiFillStar />}
            initialRating={rating}
            readonly={true}
          />
          {rating && rating.toFixed(1)} ({reviewsCount} reviews)
        </h2>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>
                  <MdWork />
                  Jobs In Progress
                </strong>
              </td>
              <td id="percentage">{activeJobs}</td>
            </tr>
            <tr>
              <td>
                <strong>
                  <MdWork />
                  Inactive Jobs
                </strong>
              </td>
              <td id="percentage">{inActiveJobs}</td>
            </tr>
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
                  Total Jobs Posted
                </strong>
              </td>
              <td id="percentage">{totalJobsPosted}</td>
            </tr>
            <tr>
              <td>
                <strong>
                  <ImPriceTags />
                  Total Spent
                </strong>
              </td>
              <td id="percentage">$ {totalSpent}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IntroSec;
