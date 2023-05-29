import React from "react";
import "./style.css";

import NormalBtn from "../Buttons/NormalBtn";
import SelectField from "../TextInputs/SelectField";

const Languages = ({ setShowSec, languages, setLanguages }) => {
  const lang = [];
  const handleNext = () => {
    setShowSec("overview");
  };
  const handlePrev = () => {
    setShowSec("resume");
  };
  const handleLanguages = (e) => {
    if (!languages.includes(e.target.value))
      setLanguages((prevArray) => [...prevArray, e.target.value]);
  };

  return (
    <div className="dashboard__sec">
      <h1 className="large__text">Add your Language</h1>
      <h2 className="small__text">4/9</h2>
      <h3 className="small__text">
        <span>Select languages that you know</span>
      </h3>
      <SelectField
        placeholder={"Add Languages"}
        values={["English", "Urdu", "Hindi", "Spanish"]}
        handleChange={handleLanguages}
      />
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
      <div id="btn__group">
        <NormalBtn value={"Prev"} handleSubmit={handlePrev} />
        <NormalBtn value={"Next"} handleSubmit={handleNext} />
      </div>
    </div>
  );
};

export default Languages;
