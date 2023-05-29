import React, { useState } from "react";
import "./filter.style.css";

// icons
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdSearch,
} from "react-icons/md";

// components
import SelectField from "../TextInputs/SelectField";

// optionsData
import { categories } from "../../Data/Data";

const Filter = ({
  categoryFilter,
  setCategoryFilter,
  duration,
  setDuration,
}) => {
  const [open, setOpen] = useState({
    category: false,
    duration: false,
  });

  return (
    <div className="filter__sec">
      <h1 className="large__heading">Filter By</h1>

      <div>
        <div id="filter__cat">
          <h2 className="small__text">
            <strong>Category</strong>
          </h2>
          <div onClick={() => setOpen({ ...open, category: !open.category })}>
            {open.category ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </div>
        </div>
        <div id="filter__input" className={open.category ? "show" : ""}>
          <MdSearch />
          <SelectField
            placeholder={"Select Category"}
            values={categories}
            value={categoryFilter}
            handleChange={(e) => setCategoryFilter(e.target.value)}
          />
        </div>
      </div>

      <div id="line"></div>

      <div>
        <div id="filter__cat">
          <h2 className="small__text">
            <strong>Project Length</strong>
          </h2>
          <div onClick={() => setOpen({ ...open, duration: !open.duration })}>
            {open.duration ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </div>
        </div>
        <div id="filter__input" className={open.duration ? "show" : ""}>
          <input
            type="radio"
            id="lessMonth"
            name="Duration"
            value="less then a month"
            onClick={(e) => setDuration(e.target.value)}
          />
          <label htmlFor="lessMonth">less then a month</label>
          <br />
          <input
            type="radio"
            id="1to3"
            name="Duration"
            value="1 - 3 months"
            onClick={(e) => setDuration(e.target.value)}
          />
          <label htmlFor="1to3">1 to 3 months</label>
          <br />
          <input
            type="radio"
            id="3to6"
            name="Duration"
            value="3 - 6 months"
            onClick={(e) => setDuration(e.target.value)}
          />
          <label htmlFor="3to6">3 to 6 months</label>
          <br />
          <input
            type="radio"
            id="more6Month"
            name="Duration"
            value="More than 6 month"
            onClick={(e) => setDuration(e.target.value)}
          />
          <label htmlFor="more6Month">More than 6 month</label>
        </div>
      </div>
      <div id="line"></div>
    </div>
  );
};

export default Filter;
