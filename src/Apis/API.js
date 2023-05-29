// firebase
import { db, auth, storage } from "../firebase";

const getTime = () => {
  var date = new Date();
  return date.toString();
};

/* -------------- Client Side APIS -------------  */

const postJob = async (
  developmentCate,
  freelancerLevel,
  rate,
  duration,
  title,
  desc
) => {
  const rootRef = db.ref();
  const addJob = rootRef.child("Jobs").child(auth.currentUser.uid);
  const addInAllJob = rootRef.child("AllJobs");
  var jobKey = rootRef.child("Jobs").child(auth.currentUser.uid).push().key;
  const sendJobNotification = db.ref(`SendJobNotification`);
  await addJob.child(jobKey).set({
    clientId: auth.currentUser.uid,
    jobKey: jobKey,
    developmentCate: developmentCate,
    freelancerLevel: freelancerLevel,
    rate: rate,
    duration: duration,
    title: title,
    description: desc,
    postedTime: getTime(),
  });
  await addInAllJob.child(jobKey).set({
    clientId: auth.currentUser.uid,
    jobKey: jobKey,
    developmentCate: developmentCate,
    freelancerLevel: freelancerLevel,
    rate: rate,
    duration: duration,
    title: title,
    description: desc,
    postedTime: getTime(),
  });
  await sendJobNotification.child(jobKey).set({
    clientId: auth.currentUser.uid,
    jobKey: jobKey,
    developmentCate: developmentCate,
    freelancerLevel: freelancerLevel,
    rate: rate,
    duration: duration,
    title: title,
    description: desc,
    postedTime: getTime(),
  });
};

const uploadClientProfilePicture = async (photo) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", photo.url, true);
    xhr.send(null);
  });
  alert(
    "We are uploding your profile picture, it may take some time depends on your internet connection. Please wait with us, until success message pops up. Thankyou!"
  );
  if (photo !== "") {
    try {
      const metadata = {
        contentType: photo.details.type,
      };
      await storage
        .ref("ClientProfilePics/" + auth.currentUser.uid)
        .put(blob, metadata)
        .then(async () => {
          await storage
            .ref("ClientProfilePics/" + auth.currentUser.uid)
            .getDownloadURL()
            .then(async (Url) => {
              const myData = db
                .ref()
                .child("ClientUsers")
                .child(auth.currentUser.uid);
              await myData.update({
                profilePic: Url,
              });
              this.setState({ pick: false });
            });
        });
      alert("Profile picture successfully updated");
    } catch (e) {
      console.log(e);
    }
  } else {
    alert("Kindly complete all fields");
  }
};

const updateClientLocation = async (city, country) => {
  const myData = db.ref().child("ClientUsers").child(auth.currentUser.uid);
  await myData.update({
    city: city,
    country: country,
  });
};

const rejectOrder = async (orderKey, freelancer, index) => {
  let sendRequestRef;
  let receiveRequestRef;
  if (index !== undefined) {
    sendRequestRef = db.ref(
      `sendRequest/${auth.currentUser.uid}/${orderKey}/milestone/${index}/deliever`
    );
    receiveRequestRef = db.ref(
      `receiveRequest/${freelancer}/${orderKey}/milestone/${index}/deliever`
    );
  } else {
    sendRequestRef = db.ref(
      `sendRequest/${auth.currentUser.uid}/${orderKey}/deliever`
    );
    receiveRequestRef = db.ref(
      `receiveRequest/${freelancer}/${orderKey}/deliever`
    );
  }

  await sendRequestRef.update({
    delievery: false,
    accepted: "reject",
  });

  await receiveRequestRef.update({
    delievery: false,
    accepted: "reject",
  });

  var notificationKey = db
    .ref()
    .child(`notifications/${freelancer}`)
    .push().key;
  const notificationRef = db.ref(
    `notifications/${freelancer}/${notificationKey}`
  );
  await notificationRef.set({
    id: notificationKey,
    from: auth.currentUser.uid,
    notification: `Your order is rejected, kindly contact client to know reason for rejection`,
    read: false,
  });
};

const acceptOrder = async (orderKey, freelancer, price, index) => {
  let sendRequestRef;
  let receiveRequestRef;
  if (index !== undefined) {
    sendRequestRef = db.ref(
      `sendRequest/${auth.currentUser.uid}/${orderKey}/milestone/${index}/deliever`
    );
    receiveRequestRef = db.ref(
      `receiveRequest/${freelancer}/${orderKey}/milestone/${index}/deliever`
    );
  } else {
    sendRequestRef = db.ref(
      `sendRequest/${auth.currentUser.uid}/${orderKey}/deliever`
    );
    receiveRequestRef = db.ref(
      `receiveRequest/${freelancer}/${orderKey}/deliever`
    );
  }

  await sendRequestRef.update({
    delievery: true,
    accepted: "accepted",
  });

  await receiveRequestRef.update({
    delievery: true,
    accepted: "accepted",
  });

  var notificationKey = db
    .ref()
    .child(`notifications/${freelancer}`)
    .push().key;
  const notificationRef = db.ref(
    `notifications/${freelancer}/${notificationKey}`
  );
  await notificationRef.set({
    id: notificationKey,
    from: auth.currentUser.uid,
    notification: `Congratulations your order is accepted`,
    read: false,
  });

  // ref to save all transactions of payments
  const transactionRef = db.ref(`Transactions/${freelancer}`);
  const key = db.ref(`Transactions/${freelancer}`).push().key;
  await transactionRef.child(key).set({
    key: key,
    client: auth.currentUser.uid,
    freelancer: freelancer,
    orderKey: orderKey,
    price: price,
    status: "notPaid",
  });
};

const addClientReview = async (
  freelancerId,
  projectKey,
  customerComment,
  rate
) => {
  if (freelancerId && projectKey && customerComment && rate) {
    const reviewRef = db.ref(`FreelancerUsers/${freelancerId}`);
    await reviewRef.child("reviews").push({
      rating: rate,
      comment: customerComment,
      from: auth.currentUser.uid,
      projectId: projectKey,
    });
    alert("Thankyou for adding your Review");
  }
};

const freelancerEarnings = (id) => {
  const paymentRef = db.ref(`Transactions/${id}`);
  let paymentCount = 0;
  paymentRef.on("value", (snapshot) => {
    if (snapshot.val()) {
      Object.values(snapshot.val()).forEach((val) => {
        paymentCount += parseInt(val.price);
      });
    }
  });
  return paymentCount;
};

const contactFreelancer = async (
  projectName,
  projectDetail,
  budget,
  freelancerId
) => {
  if (projectName && projectDetail && budget) {
    const coverLetter =
      "Project Name: " +
      projectName +
      " ----- Project Details: " +
      projectDetail +
      " ----- Budget: " +
      budget;
    const directJob = db.ref(`directJobs`);
    var jobKey = db.ref().child("directJobs").push().key;
    await directJob
      .child(jobKey)
      .set({
        budget: budget,
        jobKey: jobKey,
        projectDetail: projectDetail,
        projectName: projectName,
      })
      .then(async () => {
        const clientRef = db.ref(
          `messages/${auth.currentUser.uid}/${freelancerId}/${jobKey}`
        );
        const freelancerRef = db.ref(
          `messages/${freelancerId}/${auth.currentUser.uid}/${jobKey}`
        );
        await clientRef.push({
          msg: coverLetter,
          from: auth.currentUser.uid,
          createdAt: getTime(),
        });
        await clientRef.update({
          from: freelancerId,
          projectId: jobKey,
          projectName: projectName,
          createdAt: getTime(),
        });
        await freelancerRef.push({
          msg: coverLetter,
          from: auth.currentUser.uid,
          createdAt: getTime(),
        });
        await freelancerRef.update({
          from: auth.currentUser.uid,
          projectId: jobKey,
          projectName: projectName,
          createdAt: getTime(),
        });
        var notificationKey = db
          .ref()
          .child(`notifications/${freelancerId}`)
          .push().key;
        const notificationRef = db.ref(
          `notifications/${freelancerId}/${notificationKey}`
        );
        await notificationRef.set({
          id: notificationKey,
          from: auth.currentUser.uid,
          projectId: jobKey,
          notification: `You have recived a new job request "${projectName}" whose budget is ${budget}$, please check your messages section`,
          read: false,
        });
      });
  }
};

const deleteMyJob = (jobKey) => {
  const ref = db.ref(`Jobs`);
  const ref1 = db.ref(`Jobs/${auth.currentUser.uid}`);
  const allJobsRef = db.ref(`AllJobs`);
  ref.on("value", (snapshot) => {
    if (snapshot.hasChild(auth.currentUser.uid)) {
      ref1.child(jobKey).remove();
    }
  });
  allJobsRef.on("value", (snapshot) => {
    if (snapshot.hasChild(jobKey)) {
      allJobsRef.child(jobKey).remove();
    }
  });
};

const acceptProposal = async (submittedBy, coverLetter, jobKey, rate) => {
  coverLetter = "Cover Letter : " + coverLetter + " --- Rate : " + rate;
  const clientRef = db.ref(
    `messages/${auth.currentUser.uid}/${submittedBy}/${jobKey}`
  );
  const freelancerRef = db.ref(
    `messages/${submittedBy}/${auth.currentUser.uid}/${jobKey}`
  );
  var notificationKey = db
    .ref()
    .child(`notifications/${submittedBy}`)
    .push().key;
  const notificationRef = db.ref(
    `notifications/${submittedBy}/${notificationKey}`
  );
  await notificationRef.set({
    id: notificationKey,
    from: auth.currentUser.uid,
    notification: `Your job request is accepted by client, kindly check messages section for further details.`,
    read: false,
  });
  await clientRef.push({
    msg: coverLetter,
    from: auth.currentUser.uid,
    createdAt: getTime(),
  });
  await clientRef.update({
    from: submittedBy,
    projectId: jobKey,
    projectName: coverLetter,
    createdAt: getTime(),
  });
  await freelancerRef.push({
    msg: coverLetter,
    from: auth.currentUser.uid,
    createdAt: getTime(),
  });
  await freelancerRef.update({
    from: auth.currentUser.uid,
    projectId: jobKey,
    projectName: coverLetter,
    createdAt: getTime(),
  });
  alert("Proposal Accepted");
};

const rejectProposal = async (submittedBy, jobKey) => {
  const proposalsRef = db.ref(`Proposals/${jobKey}/${submittedBy}`);
  const submitProposalsRef = db.ref(`SubmitProposals/${submittedBy}/${jobKey}`);
  const receiveProposalsRef = db.ref(
    `ReceiveProposals/${auth.currentUser.uid}/${jobKey}`
  );
  await proposalsRef.remove();
  await submitProposalsRef.remove();
  await receiveProposalsRef.remove();
  alert("Rejected");
};

const placeOrder = async (
  projectName,
  projectDetails,
  projectPrice,
  startDate,
  endDate,
  freelancerId
) => {
  const sendRef = db.ref(`sendRequest/${auth.currentUser.uid}`);
  const key = db.ref(`sendRequest/${auth.currentUser.uid}`).push().key;
  const receiveRef = db.ref(`receiveRequest/${freelancerId}`);
  await sendRef.child(key).set({
    to: freelancerId,
    from: auth.currentUser.uid,
    key: key,
    projectName: projectName,
    projectDetails: projectDetails,
    projectPrice: projectPrice,
    startDate: startDate,
    endDate: endDate,
    active: false,
    payment: false,
  });
  await receiveRef.child(key).set({
    to: freelancerId,
    from: auth.currentUser.uid,
    key: key,
    projectName: projectName,
    projectDetails: projectDetails,
    projectPrice: projectPrice,
    startDate: startDate,
    endDate: endDate,
    active: false,
    payment: false,
  });
  var notificationKey = db
    .ref()
    .child(`notifications/${freelancerId}`)
    .push().key;
  const notificationRef = db.ref(
    `notifications/${freelancerId}/${notificationKey}`
  );
  await notificationRef.set({
    id: notificationKey,
    from: auth.currentUser.uid,
    notification: `You have recieved a new order "${projectName}" whose budget is ${projectPrice}$ and deadline is ${startDate} - ${endDate}, please check your job requests section`,
    read: false,
  });
};

const placeMilestoneOrder = async (
  milestoneData,
  projectName,
  freelancerId
) => {
  const sendRef = db.ref(`sendRequest/${auth.currentUser.uid}`);
  const key = db.ref(`sendRequest/${auth.currentUser.uid}`).push().key;
  const receiveRef = db.ref(`receiveRequest/${freelancerId}`);
  await sendRef.child(key).set({
    to: freelancerId,
    from: auth.currentUser.uid,
    key: key,
    projectName: projectName,
    milestone: milestoneData,
  });
  await receiveRef.child(key).set({
    to: freelancerId,
    from: auth.currentUser.uid,
    key: key,
    projectName: projectName,
    milestone: milestoneData,
  });
  var notificationKey = db
    .ref()
    .child(`notifications/${freelancerId}`)
    .push().key;
  const notificationRef = db.ref(
    `notifications/${freelancerId}/${notificationKey}`
  );
  await notificationRef.set({
    id: notificationKey,
    from: auth.currentUser.uid,
    notification: `You have recieved a new order "${projectName}", please check your job requests section`,
    read: false,
  });
};

/* -------------- Freelancer Side APIS -------------  */

const delieverOrder = async (freelancer, client, orderKey, file, index) => {
  let freelancerDelieverRef;
  let clientDelieverRef;
  if (index !== undefined) {
    freelancerDelieverRef = db.ref(
      `receiveRequest/${freelancer}/${orderKey}/milestone/${index}`
    );
    clientDelieverRef = db.ref(
      `sendRequest/${client}/${orderKey}/milestone/${index}`
    );
  } else {
    freelancerDelieverRef = db.ref(`receiveRequest/${freelancer}/${orderKey}`);
    clientDelieverRef = db.ref(`sendRequest/${client}/${orderKey}`);
  }
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", URL.createObjectURL(file), true);
    xhr.send(null);
  });

  if (file !== "") {
    try {
      const metadata = {
        contentType: file.type,
      };
      await storage
        .ref(`DeleiveryFile/${auth.currentUser.uid}/${orderKey}`)
        .child(file.name)
        .put(blob, metadata)
        .then(async () => {
          await storage
            .ref(`DeleiveryFile/${auth.currentUser.uid}/${orderKey}`)
            .child(file.name)
            .getDownloadURL()
            .then(async (Url) => {
              freelancerDelieverRef.update({
                deliever: {
                  time: getTime(),
                  delievery: true,
                  file: Url.toString(),
                  accepted: "delievered",
                },
              });
              clientDelieverRef.update({
                deliever: {
                  time: getTime(),
                  delievery: true,
                  file: Url.toString(),
                  accepted: "delievered",
                },
              });
            });
        });
      var notificationKey = db
        .ref()
        .child(`notifications/${client}`)
        .push().key;
      const notificationRef = db.ref(
        `notifications/${client}/${notificationKey}`
      );
      await notificationRef.set({
        id: notificationKey,
        from: auth.currentUser.uid,
        notification: `A new order submitted, kinldy check dashboard for further details.`,
        read: false,
      });
    } catch (e) {
      console.log(e);
    }
  }
};

const addFreelancerReview = async (
  clientId,
  projectKey,
  customerComment,
  rate
) => {
  if (clientId && projectKey && customerComment && rate) {
    const reviewRef = db.ref(`ClientUsers/${clientId}`);
    await reviewRef.child("reviews").push({
      rating: rate,
      comment: customerComment,
      from: auth.currentUser.uid,
      projectId: projectKey,
    });
    alert("Thankyou for adding your Review");
  }
};

const acceptRequest = async (from, key, index) => {
  let sendRef;
  let receiveRef;
  if (index === undefined) {
    sendRef = db.ref(`sendRequest/${from}/${key}`);
    receiveRef = db.ref(`receiveRequest/${auth.currentUser.uid}/${key}`);
  } else {
    sendRef = db.ref(`sendRequest/${from}/${key}`).child(`milestone/${index}`);
    receiveRef = db
      .ref(`receiveRequest/${auth.currentUser.uid}/${key}`)
      .child(`milestone/${index}`);
  }

  await sendRef.update({
    active: true,
  });
  await receiveRef.update({
    active: true,
  });
  var notificationKey = db.ref().child(`notifications/${from}`).push().key;
  const notificationRef = db.ref(`notifications/${from}/${notificationKey}`);
  await notificationRef.set({
    id: notificationKey,
    from: auth.currentUser.uid,
    notification: `Freelancer has accepted your job request, please pay for the job to further proceed, you can visit job requests section for payment`,
    read: false,
  });
};

const rejectRequest = (from, key) => {
  db.ref(`sendRequest/${from}/${key}`).remove();
  db.ref(`receiveRequest/${auth.currentUser.uid}/${key}`).remove();
};

const submitBidOnJob = async (
  coverLetter,
  hourRate,
  clientId,
  jobKey,
  developmentCate
) => {
  if (coverLetter && hourRate && clientId) {
    let submitFromArray = [];
    let submitFromArrayEach = [];
    const date = getTime();
    const userId = auth.currentUser.uid;
    const submit = db
      .ref()
      .child("SubmitProposals")
      .child(userId)
      .child(jobKey);
    const receive = db
      .ref()
      .child("ReceiveProposals")
      .child(clientId)
      .child(jobKey);
    const addInJob = db.ref().child(`AllJobs/${jobKey}`);
    const proposals = db.ref(`Proposals/${jobKey}/${auth.currentUser.uid}`);
    const nowAppend = db.ref().child(`AllJobs/${jobKey}/submitFrom`);
    const addInEachJob = db.ref().child(`Jobs/${clientId}/${jobKey}`);
    const nowAppendEach = db
      .ref()
      .child(`Jobs/${clientId}/${jobKey}/submitFrom`);
    await addInJob.once("value", async (snapshot) => {
      if (snapshot.hasChild("submitFrom")) {
        nowAppend.once("value", (snapshot) => {
          submitFromArray = snapshot.val();
          submitFromArray.push(userId);
          nowAppend.set(submitFromArray);
        });
      } else {
        await nowAppend.set([userId]);
      }
    });
    await addInEachJob.once("value", async (snapshot) => {
      if (snapshot.hasChild("submitFrom")) {
        nowAppendEach.once("value", (snapshot) => {
          submitFromArrayEach = snapshot.val();
          submitFromArrayEach.push(userId);
          nowAppendEach.set(submitFromArrayEach);
        });
      } else {
        await nowAppendEach.set([userId]);
      }
    });
    await submit.set({
      coverLetter: coverLetter,
      hourRate: hourRate,
      submittedBy: userId,
      jobKey: jobKey,
      toClient: clientId,
      developmentCate: developmentCate,
      submittedDate: date,
    });
    await receive.set({
      coverLetter: coverLetter,
      hourRate: hourRate,
      submittedBy: userId,
      jobKey: jobKey,
      developmentCate: developmentCate,
      submittedDate: date,
    });
    await proposals.set({
      coverLetter: coverLetter,
      hourRate: hourRate,
      submittedBy: userId,
      jobKey: jobKey,
      developmentCate: developmentCate,
      submittedDate: date,
    });
    var notificationKey = db
      .ref()
      .child(`notifications/${clientId}`)
      .push().key;
    const notificationRef = db.ref(
      `notifications/${clientId}/${notificationKey}`
    );
    await notificationRef.set({
      id: notificationKey,
      from: auth.currentUser.uid,
      notification: `You have recieved a new proposal on your new Job, visit my jobs section for further details.`,
      read: false,
    });
  }
};

const bidOnJobAttachedFile = async (attachedFile, clientId, jobKey) => {
  if (attachedFile && attachedFile.type) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", URL.createObjectURL(attachedFile), true);
      xhr.send(null);
    });
    alert("Wait Uploadig...");
    if (attachedFile !== "") {
      try {
        const metadata = {
          contentType: attachedFile.type,
        };
        await storage
          .ref("SubmitProposals/" + auth.currentUser.uid)
          .child(jobKey)
          .put(blob, metadata)
          .then(async () => {
            await storage
              .ref("SubmitProposals/" + auth.currentUser.uid)
              .child(jobKey)
              .getDownloadURL()
              .then(async (Url) => {
                const submit = db
                  .ref()
                  .child("SubmitProposals")
                  .child(auth.currentUser.uid)
                  .child(jobKey);
                const receive = db
                  .ref()
                  .child("ReceiveProposals")
                  .child(clientId)
                  .child(jobKey);
                const proposals = await db.ref(
                  `Proposals/${jobKey}/${auth.currentUser.uid}`
                );
                await proposals.update({
                  attachedCover: Url.toString(),
                });
                await submit.update({
                  attachedCover: Url.toString(),
                });
                await receive.update({
                  attachedCover: Url.toString(),
                });
              });
          });
        alert("Profile has been stored");
      } catch (e) {
        console.log(e);
      }
    }
  } else {
    console.log("inside else");
  }
};

const uploadFreelancerProfilePic = async (photo) => {
  if (photo && photo.url && photo.details) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", photo.url, true);
      xhr.send(null);
    });
    if (photo !== "") {
      try {
        const metadata = {
          contentType: photo.details.type,
        };
        await storage
          .ref("FreeLancerProfilePics/" + auth.currentUser.uid)
          .put(blob, metadata)
          .then(async () => {
            await storage
              .ref("FreeLancerProfilePics/" + auth.currentUser.uid)
              .getDownloadURL()
              .then(async (Url) => {
                const myData = db
                  .ref()
                  .child("FreelancerUsers")
                  .child(auth.currentUser.uid);
                await myData.update({
                  profilePic: Url,
                });
              });
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Kindly complete all fields");
    }
  }
};

const uploadFreelancerCV = async (resume) => {
  if (resume && resume.name) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", URL.createObjectURL(resume), true);
      xhr.send(null);
    });
    alert("uploadig");
    const uploadUri = resume.toString();
    let fileName = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);

    if (resume !== "") {
      try {
        const metadata = {
          contentType: resume.type,
        };
        await storage
          .ref("Resumes/" + auth.currentUser.uid)
          .child(resume.name)
          .put(blob, metadata)
          .then(async () => {
            await storage
              .ref("Resumes/" + auth.currentUser.uid)
              .child(resume.name)
              .getDownloadURL()
              .then(async (Url) => {
                const myData = db
                  .ref()
                  .child("AllResumes")
                  .child(auth.currentUser.uid);
                // setResumeUrl(Url);
                const myOwnCV = db
                  .ref()
                  .child("FreelancerUsers")
                  .child(auth.currentUser.uid);
                await myData.set({
                  resume: Url.toString(),
                });
                await myOwnCV.update({
                  resume: Url.toString(),
                });
              });
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Kindly complete all fields");
    }
  }
};

const addFreelancerProfileData = async (
  languages,
  overview,
  country,
  city,
  postal,
  phone,
  cate,
  experience,
  company,
  location,
  expCountry,
  experienceLevel
) => {
  const rootRef = db.ref();

  const about = rootRef.child("FreelancerUsers").child(auth.currentUser.uid);
  about.update({ about: overview });

  const moreInfo = rootRef
    .child("FreelancerUsers")
    .child(auth.currentUser.uid)
    .child("personalInfo");
  await moreInfo
    .update({
      country: country,
      city: city,
      postalCode: postal,
      phone: phone,
      developmentCate: cate,
      experienceLevel: experienceLevel,
      languages: languages,
    })
    .then(async () => {
      const rootRef = db.ref();
      const moreInfo = rootRef
        .child("FreelancerUsers")
        .child(auth.currentUser.uid)
        .child("workingExpeirence");
      await moreInfo.update({
        experienceTitle: experience,
        experienceCompany: company,
        experienceLocation: location,
        experienceCountry: expCountry,
      });
    });
};

const handlePaymentStatus = (id) => {
  const transactionsRef = db.ref(`Transactions/${auth.currentUser.uid}/${id}`);
  transactionsRef.update({
    status: "requested",
  });
};

const sendChatMessage = (msg, selectedName) => {
  const clientRef = db.ref(
    `messages/${auth.currentUser.uid}/${selectedName.id}/${selectedName.projectId}`
  );
  const freelancerRef = db.ref(
    `messages/${selectedName.id}/${auth.currentUser.uid}/${selectedName.projectId}`
  );
  clientRef.update({
    createdAt: getTime(),
  });
  clientRef.push({
    msg: msg,
    from: auth.currentUser.uid,
    createdAt: getTime(),
  });
  freelancerRef.update({
    createdAt: getTime(),
  });
  freelancerRef.push({
    msg: msg,
    from: auth.currentUser.uid,
    createdAt: getTime(),
  });
};

const uploadAccountDetails = async (cardHolderName, cardNumber) => {
  const paymentRef = db
    .ref()
    .child("FreelancerUsers")
    .child(auth.currentUser.uid)
    .child("PaymentDetails");
  await paymentRef.update({
    cardHolderName,
    cardNumber,
  });
};

const updateNotificationReadStatus = async (userId, id) => {
  const notificationRef = db.ref(`notifications/${userId}/${id}`);
  await notificationRef.update({
    read: true,
  });
};

const deleteNotificationReadStatus = async (userId, id) => {
  const notificationRef = db.ref(`notifications/${userId}/${id}`);
  await notificationRef.remove();
};

export {
  postJob,
  uploadClientProfilePicture,
  updateClientLocation,
  rejectOrder,
  acceptOrder,
  addClientReview,
  freelancerEarnings,
  contactFreelancer,
  deleteMyJob,
  acceptProposal,
  rejectProposal,
  placeOrder,
  placeMilestoneOrder,
  delieverOrder,
  addFreelancerReview,
  acceptRequest,
  rejectRequest,
  submitBidOnJob,
  bidOnJobAttachedFile,
  uploadFreelancerProfilePic,
  uploadFreelancerCV,
  addFreelancerProfileData,
  handlePaymentStatus,
  sendChatMessage,
  uploadAccountDetails,
  updateNotificationReadStatus,
  deleteNotificationReadStatus,
};
