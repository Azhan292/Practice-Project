import { useEffect, useState } from "react";

// firebase
import { db, auth } from "../firebase";

const useClientOrders = (modalData) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const sendRequestRef = db.ref(`sendRequest/${auth.currentUser.uid}`);
    sendRequestRef.on("value", (snapshot) => {
      if (snapshot.val()) {
        setData([]);
        for (let i = 0; i < Object.values(snapshot.val()).length; i++) {
          const buyerRef = db.ref(
            `FreelancerUsers/${Object.values(snapshot.val())[i].to}`
          );
          buyerRef.on("value", (buyerRefSnapshot) => {
            setData((prevData) => [
              ...prevData,
              Object.assign(
                Object.values(snapshot.val())[i],
                buyerRefSnapshot.val()
              ),
            ]);
          });
        }
      }
    });
  }, [modalData]);

  return { data };
};

export default useClientOrders;
