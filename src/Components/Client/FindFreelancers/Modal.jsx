import React from "react";
import Select from "react-select";
import "./modal.style.css";

// icons
import { FaTimes } from "react-icons/fa";

// data
import { modalCategories } from "../../../Data/Data";

const Modal = ({
  modal,
  handleModal,
  setFreelancerLevel,
  setFreelancerCategory,
}) => {
  const handleChange = (selectedOption) => {
    setFreelancerCategory(selectedOption.value);
  };
  return (
    <div className={`modal ${modal}`}>
      <h1 className="main__heading">Filter</h1>
      <div className="close__btn" onClick={handleModal}>
        <FaTimes />
      </div>
      <div className="form__group">
        <h2 className="small__text">
          <strong>Category</strong>
        </h2>
        <Select
          options={modalCategories}
          placeholder="Select Category"
          onChange={handleChange}
        />
      </div>
      <hr />
      <div className="form__group">
        <h2 className="small__text">
          <strong>Proficiency</strong>
        </h2>
        <input
          type="radio"
          id="beginner"
          name="level"
          value="beginner"
          onClick={(e) => setFreelancerLevel(e.target.value)}
        />
        <label htmlFor="beginner">Beginner</label>
        <br />
        <input
          type="radio"
          id="intermediate"
          name="level"
          value="intermediate"
          onClick={(e) => setFreelancerLevel(e.target.value)}
        />
        <label htmlFor="intermediate">Intermediate</label>
        <br />
        <input
          type="radio"
          id="expert"
          name="level"
          value="expert"
          onClick={(e) => setFreelancerLevel(e.target.value)}
        />
        <label htmlFor="expert">Expert</label>
      </div>
    </div>
  );
};

export default Modal;
