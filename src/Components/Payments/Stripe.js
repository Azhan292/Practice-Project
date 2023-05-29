import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import "./stripe.style.css";

// firebase
import { auth, db } from "../../firebase";

// redux
import { useSelector } from "react-redux";

// components
import FullPageLoading from "../../Screens/Loader/FullPageLoading";

const Stripe = ({ data, index }) => {
  const user = useSelector((state) => state.userReducer.user);
  const [project, setProject] = useState({
    name: !data.milestone
      ? data.projectName
      : `${data.projectName} Milestone ${index} ${data.milestone.title}`,
    currency: "usd",
    price: data.projectPrice ? data.projectPrice : data.milestone[index].price,
  });
  const [loading, setLoading] = useState(false);

  const makePayment = async (token) => {
    setLoading(true);
    const body = {
      token,
      project,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    await axios
      .post("https://dsprconnect-payments.herokuapp.com/stripe/payment", {
        headers,
        body,
      })
      .then(async (res) => {
        console.log(res.data);
        // payment details saving for both client and freelancer
        const sendPaymentRef = db.ref(
          `sendPayment/${auth.currentUser.uid}/${data.to}`
        );
        const receivePaymentRef = db.ref(
          `receivePayment/${data.to}/${auth.currentUser.uid}`
        );
        const key = db
          .ref(`sendPayment/${auth.currentUser.uid}/${data.to}`)
          .push().key;
        sendPaymentRef.child(key).set(res.data);
        sendPaymentRef.child(key).update({ key: data.key });
        receivePaymentRef.child(key).set(res.data);
        receivePaymentRef.child(key).update({ key: data.key });
        var notificationKey = db
          .ref()
          .child(`notifications/${data.to}`)
          .push().key;
        const notificationRef = db.ref(
          `notifications/${data.to}/${notificationKey}`
        );

        // active jobs handle
        if (data.milestone) {
          const sendActivePayment = db.ref(
            `sendRequest/${auth.currentUser.uid}/${data.key}/milestone/${index}`
          );
          sendActivePayment.update({ payment: true });
          const receiveActivePayment = db.ref(
            `receiveRequest/${data.to}/${data.key}/milestone/${index}`
          );
          receiveActivePayment.update({ payment: true });
          alert("Payment successful");
          setLoading(false);
          await notificationRef.set({
            id: notificationKey,
            from: auth.currentUser.uid,
            notification: `A new order is active now, please check your dashboard to avoid any late submissions`,
            read: false,
          });
        } else {
          const sendActivePayment = db.ref(
            `sendRequest/${auth.currentUser.uid}/${data.key}`
          );
          sendActivePayment.update({ payment: true });
          const receiveActivePayment = db.ref(
            `receiveRequest/${data.to}/${data.key}`
          );
          receiveActivePayment.update({ payment: true });
          alert("Payment successful");
          setLoading(false);
          await notificationRef.set({
            id: notificationKey,
            from: auth.currentUser.uid,
            notification: `A new order is active now, please check your dashboard to avoid any late submissions`,
            read: false,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div>
      {loading && <FullPageLoading />}
      <StripeCheckout
        stripeKey="pk_live_51JUB5tEcGKWlM4gWzPhCLzyYUUV3scsnTtHzEgaq8dw3GYfc5bAIFxqfDF4z6vyFk466CRtYUDsUHHi8SCz2pLxY00ip6qyl8q"
        token={makePayment}
        name="DSPRConnect"
        description="DSPRConnect payments area"
        amount={project.price * 100}
        allowRememberMe={true}
      >
        <button id="stripe__btn" disabled={loading}>
          Stripe Payment
        </button>
      </StripeCheckout>
    </div>
  );
};

export default Stripe;
