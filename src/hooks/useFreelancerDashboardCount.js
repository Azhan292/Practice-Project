import { useState, useEffect } from "react";

// firebase
import { db } from "../firebase";

const useFreelancerDashboardCount = (id) => {
  const [activeJobs, setActiveJobs] = useState(0);
  const [completedJobs, setCompletedJobs] = useState(0);
  const [earnings, setEarnings] = useState(0);

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
    // Active, Inactive and Completed jobs
    const jobsRef = db.ref(`receiveRequest/${id}`);
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
        setCompletedJobs(completedJobsCount);
      }
    });

    // Earnings
    const paymentRef = db.ref(`Transactions/${id}`);
    let paymentCount = 0;
    paymentRef.on("value", (snapshot) => {
      if (snapshot.val()) {
        Object.values(snapshot.val()).forEach((val) => {
          paymentCount += parseInt(val.price);
        });
      }
    });
    setEarnings(paymentCount);
  }, [id]);

  return {
    activeJobs,
    completedJobs,
    earnings,
  };
};

export default useFreelancerDashboardCount;
