import React, { useState } from "react";
import "./details.style.css";

// icons
import { AiOutlineFileAdd } from "react-icons/ai";

// components
import InputField from "../../TextInputs/InputField";
import TextArea from "../../TextInputs/TextArea";

// redux
import { useSelector } from "react-redux";

// moment
import moment from "moment";
import Modal from "./Modal";

// firebase
import useClientById from "../../../hooks/useClientById";

const Details = () => {
  const jobData = useSelector((state) => state.jobsReducer);
  const { profileData } = useClientById(jobData.job.clientId);

  const [price, setPrice] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const [modal, setModal] = useState(false);

  const handleAttached = (e) => {
    setAttachedFile(e.target.files[0]);
  };

  const handleModal = () => {
    if (coverLetter && price) setModal(!modal);
  };

  const clearFields = () => {
    setCoverLetter("");
    setPrice("");
  };

  return (
    <div className="jobdetails__sec">
      {modal ? (
        <Modal
          handleModal={handleModal}
          setModal={setModal}
          coverLetter={coverLetter}
          price={price}
          clientId={jobData.job.clientId}
          jobKey={jobData.job.jobKey}
          developmentCate={jobData.job.developmentCate}
          attachedFile={attachedFile}
          clearFields={clearFields}
        />
      ) : null}
      <h2 className="large__text">{jobData.job.title}</h2>
      <div id="tags">
        <div id="tag">{jobData.job.developmentCate}</div>
      </div>
      <strong>Description</strong>
      <p className="primary__light__background">{jobData.job.description}</p>
      <h2 className="small__text">
        <strong>Duration: </strong>
        {jobData.job.duration}
      </h2>
      <h2 className="small__text">
        <strong>Price: </strong>${jobData.job.rate}
      </h2>
      <h2 className="small__text">
        <strong>Proficiency: </strong>
        {jobData.job.freelancerLevel}
      </h2>
      <h2 className="small__text">
        <strong>Posted: </strong>
        {moment(jobData.job.postedTime).fromNow()}
      </h2>
      <h2 className="small__text">
        <strong>Posted By: </strong>
        {profileData.name && profileData.name}
      </h2>
      <h2 className="small__text">
        <strong>Location: </strong>
        {profileData.city && profileData.country
          ? profileData.city + ", " + profileData.country
          : "Location not found"}
      </h2>
      {/* <h3 className="small__text">
        <strong>Project ID: #{jobData.job.jobKey}</strong>
      </h3> */}
      <div id="line"></div>
      <h2 className="large__text">Offer to work on this job now!</h2>
      <h3 className="medium__text">Your offer for this project</h3>
      <div className="form">
        <InputField
          type={"number"}
          placeholder={"Enter Price"}
          value={price}
          handleChange={(e) => setPrice(e.target.value)}
        />
        <TextArea
          placeholder={"Cover Letter"}
          value={coverLetter}
          handleChange={(e) => setCoverLetter(e.target.value)}
        />
        <div className="upload__sec">
          <div className="upload-btn-wrapper">
            <button className="btn">
              <AiOutlineFileAdd />
              <h3 className="small__text">
                <span>Tap to add your file here</span>
              </h3>
            </button>
            <input
              type="file"
              name="myfile"
              onChange={handleAttached}
              accept="application/pdf, application/msword"
            />
          </div>
        </div>
        <div className="attached__file">
          {attachedFile ? attachedFile.name : "No files attached"}
        </div>
      </div>
      <div className="submit__btn">
        <button onClick={handleModal}>Submit</button>
      </div>
    </div>
  );
};

export default Details;
