import { useState, useEffect } from "react";

// firebase
import { db, auth } from "../firebase";

const useSubmittedProposals = () => {
  const [submittedProposals, setSubmittedProposals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const allproposals = db.ref("SubmitProposals");
    const allproposalsNow = db.ref(`SubmitProposals/${auth.currentUser.uid}`);
    allproposals.on("value", (snapshot) => {
      if (snapshot.hasChild(auth.currentUser.uid)) {
        allproposalsNow.on("value", (snapshot) => {
          if (snapshot.val()) {
            setSubmittedProposals(Object.values(snapshot.val()));
            setLoading(false);
          } else {
            setSubmittedProposals([]);
          }
        });
      } else {
        setLoading(false);
      }
    });
  }, []);

  return { loading, submittedProposals };
};

export default useSubmittedProposals;
