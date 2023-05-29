import React from "react";

// components
import Navbar from "../../Components/Headers/Navbar";
import Footer from "../../Components/Footer/Footer";
import WithdrawMethod from "../../Components/Withdraw/WithdrawMethod";

const Withdraw = () => {
  const [method, setMethod] = React.useState(null);

  return (
    <div className="page">
      <Navbar menu={true} />
      <div className="container main__section">
        <WithdrawMethod />
      </div>
      <Footer />
    </div>
  );
};

export default Withdraw;
