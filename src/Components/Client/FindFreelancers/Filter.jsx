import React, { useState } from "react";
import "./filter.style.css";

// icons
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdSearch,
} from "react-icons/md";

// components
import Checkbox from "../../TextInputs/Checkbox";
import SelectField from "../../TextInputs/SelectField";

// category data
import { categories } from "../../../Data/Data";

const Filter = ({
  setFreelancerLevel,
  freelancerCategory,
  setFreelancerCategory,
}) => {
  const [open, setOpen] = useState({
    category: false,
    freelancerLevel: false,
  });

  return (
    <div className="filter__sec">
      <h1 className="large__heading">Filter By</h1>
      <div id="filter__cat">
        <h2 className="small__text">
          <strong>Freelancer Level</strong>
        </h2>
        <div
          onClick={() =>
            setOpen({ ...open, freelancerLevel: !open.freelancerLevel })
          }
        >
          {open.freelancerLevel ? (
            <MdKeyboardArrowUp />
          ) : (
            <MdKeyboardArrowDown />
          )}
        </div>
      </div>
      <div id="filter__input" className={open.freelancerLevel ? "show" : ""}>
        <Checkbox
          handleClick={(e) => setFreelancerLevel(e.target.value)}
          value="beginner"
          label="Beginner"
        />
        <Checkbox
          handleClick={(e) => setFreelancerLevel(e.target.value)}
          value="intermidiate"
          label="Intermidiate"
        />
        <Checkbox
          handleClick={(e) => setFreelancerLevel(e.target.value)}
          value="expert"
          label="Expert"
        />
      </div>
      <div id="line"></div>
      <div id="filter__cat">
        <h2 className="small__text">
          <strong>Category</strong>
        </h2>
        <div onClick={() => setOpen({ ...open, category: !open.category })}>
          {open.category ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </div>
      </div>
      <div id="filter__input" className={open.category ? "show" : ""}>
        <SelectField
          placeholder="Category"
          values={categories}
          value={freelancerCategory}
          handleChange={(e) => setFreelancerCategory(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Filter;
