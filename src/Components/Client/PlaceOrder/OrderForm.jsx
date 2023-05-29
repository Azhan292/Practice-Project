import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./orderForm.style.css";

// firebase
import { placeOrder, placeMilestoneOrder } from "../../../Apis/API";
import usePlaceOrderProjectDetails from "../../../hooks/usePlaceOrderProjectDetails";

// components
import MilestoneForm from "./MilestoneForm";
import CompleteOrderForm from "./CompleteOrderForm";

const OrderForm = () => {
  const { freelancerId, projectId } = useParams();
  const { name, detail, price } = usePlaceOrderProjectDetails(projectId);
  const [projectName, setProjectName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [projectPrice, setProjectPrice] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orderType, setOrderType] = useState("full");
  const [milestoneData, setMilestoneData] = useState([
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

  const accurateDate = (date) => {
    var date1 = parseInt(new Date(date).getTime() / (1000 * 3600 * 24));
    var today = parseInt(new Date().getTime() / (1000 * 3600 * 24));
    if (date1 >= today) {
      return true;
    } else {
      return false;
    }
  };

  const clearFields = () => {
    setProjectDetails("");
    setProjectName("");
    setProjectPrice(0);
    setStartDate("");
    setEndDate("");
  };

  const clearMilestoneFields = () => {
    setMilestoneData([
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

  const addOrder = async () => {
    try {
      if (
        projectName &&
        projectDetails &&
        projectPrice &&
        startDate &&
        endDate &&
        freelancerId
      ) {
        if (accurateDate(startDate) && accurateDate(endDate)) {
          await placeOrder(
            projectName,
            projectDetails,
            projectPrice,
            startDate,
            endDate,
            freelancerId
          );
          alert("Order Request Submitted!");
          clearFields();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addMilestoneOrder = async () => {
    try {
      if (
        milestoneData[0].title &&
        milestoneData[0].desc &&
        milestoneData[0].price > 0 &&
        milestoneData[0].startDate &&
        milestoneData[0].endDate &&
        projectName &&
        freelancerId
      ) {
        placeMilestoneOrder(milestoneData, projectName, freelancerId);
        alert("Order Request Submitted!");
        clearMilestoneFields();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setProjectName(name);
    setProjectDetails(detail);
    setProjectPrice(price);
  }, [name && detail && price]);

  return (
    <div className="order__form">
      {orderType === "milestone" ? (
        <div className="order__type__btn">
          <button onClick={() => setOrderType("full")}>Complete Order</button>
        </div>
      ) : (
        <div className="order__type__btn">
          <button onClick={() => setOrderType("milestone")}>Milestone</button>
        </div>
      )}
      {orderType === "full" ? (
        <CompleteOrderForm
          addOrder={addOrder}
          addOrder={addOrder}
          projectName={projectName}
          projectDetails={projectDetails}
          projectPrice={projectPrice}
          startDate={startDate}
          endDate={endDate}
          setProjectName={setProjectName}
          setProjectDetails={setProjectDetails}
          setProjectPrice={setProjectPrice}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
        />
      ) : (
        <MilestoneForm
          projectName={projectName}
          setProjectName={setProjectName}
          milestoneData={milestoneData}
          addMilestoneOrder={addMilestoneOrder}
          setMilestoneData={setMilestoneData}
        />
      )}
    </div>
  );
};

export default OrderForm;
