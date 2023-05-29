import React from "react";
import "./modal.style.css";
import Select from "react-select";

// icons
import { FaTimes } from "react-icons/fa";

// data
import { modalCategories } from "../../Data/Data";

const Modal = ({
  modal,
  handleModal,
  categoryFilter,
  setCategoryFilter,
  setDuration,
}) => {
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
          onChange={(selectedOption) => setCategoryFilter(selectedOption.value)}
          defaultValue={categoryFilter}
        />
      </div>
      <div className="form__group">
        <h2 className="small__text">
          <strong>Project Length</strong>
        </h2>
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
          value="More than 6 months"
          onClick={(e) => setDuration(e.target.value)}
        />
        <label htmlFor="more6Month">More than 6 months</label>
      </div>
    </div>
  );
};

export default Modal;
