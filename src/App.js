import { useEffect, useState } from "react";

// firebase
import { auth, db } from "./firebase";

// Redux
import { useDispatch } from "react-redux";
import {
  userrequest,
  usersuccess,
  userfailure,
  setUserType,
} from "./Redux/Actions/userActions";

// Routes
import Routes from "./Routes/Routes";

// media css
import "./media.css";

//importing cotext
import AuthErrorContext from "./Context/authErrorContext";

// styles
import "./app.css";

const App = () => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userInfo, setUserInfo] = useState({
    completeStatus: null,
    type: "",
  });
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const handleAuth = () => {
      dispatch(userrequest());
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          if (localStorage.getItem("userType")) {
            dispatch(setUserType(localStorage.getItem("userType")));
            const check = db.ref(`${localStorage.getItem("userType")}Users`);
            check.on("value", async (snapshot) => {
              if (snapshot.hasChild(user.uid)) {
                dispatch(setUserType(localStorage.getItem("userType")));
                const allusers = db.ref(
                  `${localStorage.getItem("userType")}Users/${user.uid}`
                );
                allusers.on("value", async (snapshot) => {
                  dispatch(usersuccess(snapshot.val()));
                  setIsAuthenticated(true);
                  if (localStorage.getItem("userType") === "Freelancer") {
                    if (
                      snapshot.val() &&
                      snapshot.val().name &&
                      snapshot.val().email &&
                      snapshot.val().profilePic &&
                      snapshot.val().about &&
                      snapshot.val().resume &&
                      snapshot.val().personalInfo &&
                      snapshot.val().personalInfo.city &&
                      snapshot.val().personalInfo.country &&
                      snapshot.val().personalInfo.developmentCate &&
                      snapshot.val().personalInfo.experienceLevel &&
                      snapshot.val().personalInfo.languages &&
                      snapshot.val().personalInfo.languages.length > 0 &&
                      snapshot.val().personalInfo.phone &&
                      snapshot.val().personalInfo.postalCode &&
                      snapshot.val().workingExpeirence.experienceCompany &&
                      snapshot.val().workingExpeirence.experienceCountry &&
                      snapshot.val().workingExpeirence.experienceLocation &&
                      snapshot.val().workingExpeirence.experienceTitle
                    ) {
                      setUserInfo({
                        completeStatus: true,
                        type: "Freelancer",
                      });
                    } else {
                      setUserInfo({
                        completeStatus: false,
                        type: "Freelancer",
                      });
                    }
                  } else if (localStorage.getItem("userType") === "Client") {
                    setUserInfo({
                      completeStatus: true,
                      type: "Client",
                    });
                  }
                });
              } else {
                let rootRef = db.ref();
                if (localStorage.getItem("userType") === "Freelancer") {
                  await rootRef
                    .child(`ClientUsers/${user.uid}`)
                    .on("value", async (snapshot) => {
                      if (snapshot.val()) {
                        var profilePicture = "";
                        const usersExhangedRef = db
                          .ref()
                          .child(
                            `${localStorage.getItem("userType")}Users/${
                              user.uid
                            }`
                          );
                        if (snapshot.val().profilePic) {
                          profilePicture = snapshot.val().profilePic;
                        }
                        await usersExhangedRef
                          .set({
                            id: user.uid,
                            name: snapshot.val().name,
                            email: snapshot.val().email,
                            profilePic: profilePicture,
                          })
                          .then(() => {
                            dispatch(usersuccess(snapshot.val()));
                          })
                          .catch((err) => {
                            auth.signOut();
                            dispatch(userfailure(err.message));
                            setAuthError(err.message);
                          });
                      } else {
                        auth.signOut();
                        setIsAuthenticated(false);
                      }
                    });
                } else if (localStorage.getItem("userType") === "Client") {
                  await rootRef
                    .child(`FreelancerUsers/${user.uid}`)
                    .on("value", async (snapshot) => {
                      if (snapshot.val()) {
                        var profilePicture = "";
                        const usersExhangedRef1 = db
                          .ref()
                          .child(
                            `${localStorage.getItem("userType")}Users/${
                              user.uid
                            }`
                          );
                        if (snapshot.val().profilePic) {
                          profilePicture = snapshot.val().profilePic;
                        }
                        await usersExhangedRef1
                          .set({
                            id: user.uid,
                            name: snapshot.val().name,
                            email: snapshot.val().email,
                            profilePic: profilePicture,
                          })
                          .then(() => {
                            dispatch(usersuccess(snapshot.val()));
                          })
                          .catch((err) => {
                            auth.signOut();
                            dispatch(userfailure(err.message));
                            setAuthError(err.message);
                          });
                      } else {
                        auth.signOut();
                        setIsAuthenticated(false);
                      }
                    });
                }
              }
            });
          } else {
            auth.signOut();
            setIsAuthenticated(false);
            dispatch(
              userfailure("Dont touch the application local storage please")
            );
          }
        } else {
          setIsAuthenticated(false);
          dispatch(userfailure(""));
        }
      });
    };

    handleAuth();
  }, [localStorage.getItem("userType")]);

  return (
    <div className="app">
      <AuthErrorContext.Provider value={{ authError, setAuthError }}>
        <Routes isAuthenticated={isAuthenticated} userInfo={userInfo} />
      </AuthErrorContext.Provider>
    </div>
  );
};

export default App;
