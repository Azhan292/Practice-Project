import { useState, useEffect } from "react";

// firebase
import { db, auth } from "../firebase";

const useTransactions = () => {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const transactionsRef = db.ref(`Transactions/${auth.currentUser.uid}`);
    transactionsRef.on("value", (snapshot) => {
      if (snapshot.val()) {
        setTransactionData([]);
        Object.values(snapshot.val()).forEach((val) => {
          const clientRef = db.ref(`ClientUsers/${val.client}`);
          clientRef.on("value", (clientSnapshot) => {
            setTransactionData((prevState) => [
              ...prevState,
              {
                price: val.price,
                clientName: clientSnapshot.val().name,
                projectId: val.orderKey,
                status: val.status,
                id: val.key,
              },
            ]);
          });
        });
      }
    });
  }, []);

  return { transactionData };
};

export default useTransactions;
