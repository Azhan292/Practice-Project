import React from "react";
import "./orderForm.style.css";

// components
import InputField from "../../TextInputs/InputField";
import TextArea from "../../TextInputs/TextArea";
import NormalBtn from "../../Buttons/NormalBtn";

const CompleteOrderForm = ({
  addOrder,
  projectName,
  projectDetails,
  projectPrice,
  startDate,
  endDate,
  setProjectName,
  setProjectDetails,
  setProjectPrice,
  setEndDate,
  setStartDate,
}) => {
  return (
    <>
      <h1 className="main__heading primary">Place Order Request</h1>
      <InputField
        type="text"
        placeholder="project name"
        value={projectName}
        handleChange={(e) => setProjectName(e.target.value)}
      />
      <TextArea
        placeholder="project description"
        value={projectDetails}
        handleChange={(e) => setProjectDetails(e.target.value)}
      />
      <h1 className="small__text primary">Price</h1>
      <InputField
        type="number"
        placeholder="price"
        value={projectPrice}
        handleChange={(e) => setProjectPrice(e.target.value)}
      />
      <h1 className="small__text primary">Starting date</h1>
      <InputField
        type="date"
        placeholder="Starting date"
        value={startDate}
        handleChange={(e) => setStartDate(e.target.value)}
      />
      <h1 className="small__text primary">Ending date</h1>
      <InputField
        type="date"
        placeholder="Ending date"
        value={endDate}
        handleChange={(e) => setEndDate(e.target.value)}
      />
      <div className="submit__btn">
        <NormalBtn value="Submit Request" handleSubmit={addOrder} />
      </div>
    </>
  );
};

export default CompleteOrderForm;
