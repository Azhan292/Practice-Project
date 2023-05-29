import { useState, useEffect } from "react";

// firebase
import { db, auth } from "../firebase";

const useClientDashboardCount = () => {
  const [activeJobs, setActiveJobs] = useState(0);
  const [inActiveJobs, setInActiveJobs] = useState(0);
  const [completedJobs, setCompletedJobs] = useState(0);
  const [totalJobsPosted, setTotalActiveJobsPosted] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  const getTodayDateStatus = (endDate) => {
    var deadline = new Date(endDate);
    var today = new Date();
    if (deadline - today < 0) {
      return "late";
    } else if (deadline === today) {
      return "notLate";
    } else {
      return "notLate";
    }
  };

  useEffect(() => {
    // Total job posted count
    const totalJobsPostedRef = db.ref(`Jobs/${auth.currentUser.uid}`);
    totalJobsPostedRef.once("value", (snapshot) => {
      if (snapshot.val()) {
        setTotalActiveJobsPosted(Object.values(snapshot.val()).length);
      }
    });

    // Active, Inactive and Completed jobs
    const jobsRef = db.ref(`sendRequest/${auth.currentUser.uid}`);
    jobsRef.once("value", (snapshot) => {
      let activeJobsCount = 0;
      let inActiveJobsCount = 0;
      let completedJobsCount = 0;
      if (snapshot.val()) {
        Object.values(snapshot.val()).forEach((val) => {
          if (val.milestone && Object.values(val.milestone).length > 0) {
            Object.values(val.milestone).forEach((milestoneVal) => {
              if (milestoneVal.active) {
                if (getTodayDateStatus(milestoneVal.endDate) !== "late") {
                  if (
                    milestoneVal.deliever &&
                    milestoneVal.deliever.accepted !== "accepted"
                  ) {
                    activeJobsCount = activeJobsCount + 1;
                  } else if (!milestoneVal.deliever) {
                    activeJobsCount = activeJobsCount + 1;
                  }
                }
              }
              if (!milestoneVal.active) {
                inActiveJobsCount = inActiveJobsCount + 1;
              }
              if (
                milestoneVal.deliever &&
                milestoneVal.deliever.accepted === "accepted"
              ) {
                completedJobsCount = completedJobsCount + 1;
              }
            });
          } else {
            if (val.active) {
              if (getTodayDateStatus(val.endDate) !== "late") {
                if (val.deliever && val.deliever.accepted !== "accepted") {
                  activeJobsCount = activeJobsCount + 1;
                } else if (!val.deliever) {
                  activeJobsCount = activeJobsCount + 1;
                }
              }
            }
            if (!val.active) {
              inActiveJobsCount = inActiveJobsCount + 1;
            }
            if (val.deliever && val.deliever.accepted === "accepted") {
              completedJobsCount = completedJobsCount + 1;
            }
          }
        });
        setActiveJobs(activeJobsCount);
        setInActiveJobs(inActiveJobsCount);
        setCompletedJobs(completedJobsCount);
      }
    });

    // Total Spent
    const paymentRef = db.ref(`sendPayment/${auth.currentUser.uid}`);
    let paymentCount = 0;
    paymentRef.on("value", (snapshot) => {
      snapshot.forEach((child) => {
        const paymentRef1 = db.ref(
          `sendPayment/${auth.currentUser.uid}/${child.key}`
        );
        paymentRef1.once("value", (snapshot1) => {
          Object.values(snapshot1.val()).forEach((amount) => {
            paymentCount += parseInt(amount.amount);
            console.log(amount.amount);
          });
        });
      });
    });
    const paymentInDollars = paymentCount / 100;
    setTotalSpent(paymentInDollars);
  }, []);

  return {
    activeJobs,
    inActiveJobs,
    completedJobs,
    totalJobsPosted,
    totalSpent,
  };
};

export default useClientDashboardCount;
