import { useEffect, useState } from "react";

// firebase
import { db } from "../firebase";

const usePlaceOrderProjectDetails = (projectId) => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const directProjectRef = db.ref(`directJobs`);
    directProjectRef.on("value", (snapshot) => {
      if (snapshot.hasChild(projectId)) {
        directProjectRef.child(projectId).on("value", (snapshot) => {
          setName(snapshot.val().projectName);
          setDetail(snapshot.val().projectDetail);
          setPrice(snapshot.val().budget);
        });
      } else {
        const jobRef = db.ref(`AllJobs`);
        jobRef.on("value", (snapshot) => {
          if (snapshot.hasChild(projectId)) {
            jobRef.child(projectId).on("value", (snapshot1) => {
              setName(snapshot1.val().title);
              setDetail(snapshot1.val().description);
              setPrice(snapshot1.val().rate);
            });
          }
        });
      }
    });
  }, [projectId]);

  return { name, detail, price };
};

export default usePlaceOrderProjectDetails;
