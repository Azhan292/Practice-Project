import React, { useState } from "react";
import "./uploadsection.style.css";

// components
import FullPageLoading from "../../../Screens/Loader/FullPageLoading";
import SelectField from "../../TextInputs/SelectField";

// data
import { categories, levelData, durationData } from "../../../Data/Data";

// API Functiontions
import { postJob } from "../../../Apis/API";

const UploadSection = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rate, setRate] = useState("");
  const [cat, setCat] = useState("");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");
  const [count, setCount] = useState(5000);
  const [loading, setLoading] = useState(false);

  const handleDesc = (e) => {
    setDesc(e.target.value);
    if (e.target.value.length > desc.length) setCount(count - 1);
    else setCount(count + 1);
  };

  const clearFields = () => {
    setTitle("");
    setDesc("");
    setRate("");
    setCat("");
    setLevel("");
    setDuration("");
  };

  const handleJobPost = async (cat, level, rate, duration, title, desc) => {
    if (title && desc && rate && cat && level && duration) {
      setLoading(true);
      try {
        await postJob(cat, level, rate, duration, title, desc);
        setLoading(false);
        clearFields();
        alert("Job Posted Successully");
      } catch (error) {
        setLoading(false);
      }
    } else {
      setError("Fill All the fields first");
    }
  };

  return (
    <div className="upload__project__sec">
      <h1 className="main__heading primary">Get Quotes</h1>
      <div id="error">{error && error}</div>
      <h2 className="medium__text">
        <strong>Choose a name for your project</strong>
      </h2>
      <input
        type="text"
        placeholder="E.g. I need graphic designer"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <h2 className="medium__text">
        <strong>Tell us more about your project</strong>
      </h2>
      <h3 className="small__text">
        Start with a little about your business and what you needd to be done
      </h3>
      <textarea
        cols="30"
        rows="10"
        maxLength="5000"
        placeholder="Describe your project here"
        onChange={handleDesc}
        value={desc}
      ></textarea>
      <div id="char__count">{count} Characters remaining</div>
      <SelectField
        placeholder={"Select a category"}
        values={categories}
        value={cat}
        handleChange={(e) => setCat(e.target.value)}
      />
      <SelectField
        placeholder={"Select a level"}
        values={levelData}
        value={level}
        handleChange={(e) => setLevel(e.target.value)}
      />
      <input
        type="number"
        placeholder={`Enter Price`}
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
      <SelectField
        placeholder={"Select project Duration"}
        values={durationData}
        value={duration}
        handleChange={(e) => setDuration(e.target.value)}
      />
      <div className="next__btn">
        {loading ? (
          <FullPageLoading />
        ) : (
          <button
            onClick={() =>
              handleJobPost(cat, level, rate, duration, title, desc)
            }
          >
            Post Job
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
