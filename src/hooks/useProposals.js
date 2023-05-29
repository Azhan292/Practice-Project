import { useState, useEffect } from "react";

// firebase
import { db } from "../firebase";

const useProposals = (jobId) => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const ref = db.ref("Proposals");
    const ref1 = db.ref(`Proposals/${jobId}`);
    ref.on("value", (snapshot) => {
      if (snapshot.hasChild(jobId)) {
        ref1.on("value", (snapshot) => {
          if (snapshot.val()) {
            setProposals(Object.values(snapshot.val()));
          } else {
            setProposals([]);
          }
        });
      }
    });
  }, []);

  return { proposals };
};

export default useProposals;
