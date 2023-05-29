import { useEffect, useState } from "react";

// firebase
import { db, auth } from "../firebase";

const useFreelancerOrders = (modalData) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]);
    const receiveRequestRef = db.ref(`receiveRequest/${auth.currentUser.uid}`);
    receiveRequestRef.on("value", (snapshot) => {
      if (snapshot.val()) {
        setData([]);
        for (let i = 0; i < Object.values(snapshot.val()).length; i++) {
          const buyerRef = db.ref(
            `ClientUsers/${Object.values(snapshot.val())[i].from}`
          );
          buyerRef.on("value", (snapshot1) => {
            setData((prevData) => [
              ...prevData,
              Object.assign(Object.values(snapshot.val())[i], snapshot1.val()),
            ]);
          });
        }
      }
    });
  }, [modalData]);

  return { data };
};

export default useFreelancerOrders;
