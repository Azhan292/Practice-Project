import React from "react";
import NormalBtn from "../Buttons/NormalBtn";
import InputField from "../TextInputs/InputField";
import SelectField from "../TextInputs/SelectField";
import "./style.css";

const Experience = ({ setShowSec, experience, setExperience }) => {
  const experienceLevels = ["Beginner", "Intermediate", "Expert"];
  const handleNext = () => {
    setShowSec("resume");
  };
  const handlePrev = () => {
    setShowSec("category");
  };
  const handleTitle = (e) => {
    setExperience({ ...experience, title: e.target.value });
  };
  const handleCompany = (e) => {
    setExperience({ ...experience, company: e.target.value });
  };
  const handleLevel = (e) => {
    setExperience({ ...experience, level: e.target.value });
  };
  const handleLocation = (e) => {
    setExperience({ ...experience, location: e.target.value });
  };
  const handleCountry = (e) => {
    setExperience({ ...experience, country: e.target.value });
  };

  return (
    <div className="dashboard__sec">
      <h1 className="large__text">Experience</h1>
      <h2 className="small__text">2/9</h2>
      <h3 className="small__text">
        <span>Tell us about your experience?</span>
      </h3>
      <InputField
        type={"text"}
        placeholder={"Experience Title"}
        handleChange={handleTitle}
        value={experience.title}
      />
      <InputField
        type={"text"}
        placeholder={"Experience Company"}
        handleChange={handleCompany}
        value={experience.company}
      />
      <InputField
        type={"text"}
        placeholder={"Experience City"}
        handleChange={handleLocation}
        value={experience.location}
      />
      <InputField
        type={"text"}
        placeholder={"Experience Country"}
        handleChange={handleCountry}
        value={experience.country}
      />
      <SelectField
        placeholder={"Experience Level"}
        values={experienceLevels}
        handleChange={handleLevel}
        value={experience.level}
      />
      <div id="btn__group">
        <NormalBtn value={"Prev"} handleSubmit={handlePrev} />
        <NormalBtn value={"Next"} handleSubmit={handleNext} />
      </div>
    </div>
  );
};

export default Experience;
