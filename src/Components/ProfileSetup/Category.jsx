import React from "react";
import "./style.css";

// components
import NormalBtn from "../Buttons/NormalBtn";
import InputField from "../TextInputs/InputField";
import SelectField from "../TextInputs/SelectField";

// data
import { categories } from "../../Data/Data";

const Category = ({ setShowSec, category, setCategory }) => {
  const handleNext = () => {
    setShowSec("experience");
  };
  const handleCategory = (e) => {
    setCategory({ ...category, cat: e.target.value });
  };

  return (
    <div className="dashboard__sec">
      <h1 className="large__text">Category</h1>
      <h2 className="small__text">1/9</h2>
      <h3 className="small__text">
        <span>Tell us about what service you will offer?</span>
      </h3>
      <SelectField
        placeholder={"Category"}
        values={categories}
        handleChange={handleCategory}
        value={category.cat}
      />
      <div id="next__btn">
        <NormalBtn value={"Next"} handleSubmit={handleNext} />
      </div>
    </div>
  );
};

export default Category;
