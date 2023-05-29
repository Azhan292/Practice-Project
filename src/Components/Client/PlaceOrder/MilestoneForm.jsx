import React from "react";
import "./orderForm.style.css";

// components
import InputField from "../../TextInputs/InputField";
import TextArea from "../../TextInputs/TextArea";
import NormalBtn from "../../Buttons/NormalBtn";

const MilestoneForm = ({
  projectName,
  setProjectName,
  milestoneData,
  addMilestoneOrder,
  setMilestoneData,
}) => {
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...milestoneData];
    list[index][name] = value;
    setMilestoneData(list);
  };

  const handleAddMilestone = () => {
    setMilestoneData([
      ...milestoneData,
      {
        title: "",
        desc: "",
        price: "",
        startDate: "",
        endDate: "",
        active: false,
        payment: false,
      },
    ]);
  };

  const handleRemoveMilestone = (index) => {
    const list = [...milestoneData];
    list.splice(index, 1);
    setMilestoneData(list);
  };

  return (
    <>
      <div id="milestone__forms">
        <InputField
          type="text"
          placeholder="project name"
          value={projectName}
          handleChange={(e) => setProjectName(e.target.value)}
        />
        {milestoneData.map((item, index) => {
          return (
            <div key={index}>
              <h1 className="main__heading primary">Milestone {index + 1}</h1>
              <div className="milestone__form">
                <div id="mr10">
                  <h1 className="small__text primary">Name</h1>
                  <InputField
                    type="text"
                    placeholder="milestone name"
                    value={item.title}
                    name="title"
                    handleChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div id="mr10">
                  <h1 className="small__text primary">Description</h1>
                  <TextArea
                    placeholder="milestone description"
                    value={item.desc}
                    name="desc"
                    handleChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div id="mr10">
                  <h1 className="small__text primary">Price</h1>
                  <InputField
                    type="number"
                    placeholder="price"
                    value={item.price}
                    name="price"
                    handleChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>
              <div className="milestone__form">
                <div id="mr10">
                  <h1 className="small__text primary">Starting date</h1>
                  <InputField
                    type="date"
                    placeholder="Starting date"
                    value={item.startDate}
                    name="startDate"
                    handleChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div id="mr10">
                  <h1 className="small__text primary">Ending date</h1>
                  <InputField
                    type="date"
                    placeholder="Ending date"
                    value={item.endDate}
                    name="endDate"
                    handleChange={(e) => handleChange(e, index)}
                  />
                </div>
                {milestoneData.length !== 1 && (
                  <button
                    className="remove__milestone"
                    onClick={() => handleRemoveMilestone(index)}
                  >
                    Remove
                  </button>
                )}
                {milestoneData.length - 1 === index && (
                  <button
                    className="add__milestone"
                    onClick={handleAddMilestone}
                  >
                    Add Milestone
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="submit__btn">
        <NormalBtn value="Submit Request" handleSubmit={addMilestoneOrder} />
      </div>
    </>
  );
};

export default MilestoneForm;
