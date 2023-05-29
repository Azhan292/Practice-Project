import React, { useContext, useState } from "react";
import "./style.css";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  userrequest,
  userfailure,
  setUserType,
} from "../../Redux/Actions/userActions";

// firebase
import { auth, db } from "../../firebase";

// components
import Authsidebar from "./Authsidebar";

// error context
import AuthErrorContext from "../../Context/authErrorContext";
import { useFormik } from "formik";
import * as Yup from "yup";

// icons
import { FaEye } from "react-icons/fa";

const Signup = () => {
  const userType = useSelector((state) => state.userReducer.userType);
  const dispatch = useDispatch();
  const { authError, setAuthError } = useContext(AuthErrorContext);
  const [passwordView, setPasswordView] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    radioOption: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    radioOption: Yup.string().required("Select a type"),
  });

  const onSubmit = () => {
    dispatch(setUserType(formik.values.radioOption));
    localStorage.setItem("userType", formik.values.radioOption);
    dispatch(userrequest());
    auth
      .createUserWithEmailAndPassword(
        formik.values.email,
        formik.values.password
      )
      .then(() => {
        // const rootRef = db.ref();
        const users = db
          .ref()
          .child(
            `${localStorage.getItem("userType")}Users/${auth.currentUser.uid}`
          );
        users
          .set({
            name: formik.values.name,
            email: formik.values.email,
            id: auth.currentUser.uid,
          })
          .then(() => {
            alert("Account created successfully");
          })
          .catch((err) => {
            auth.signOut();
            dispatch(userfailure(err.message));
            setAuthError(err.message);
          });
      })
      .catch((err) => {
        dispatch(userfailure(err.message));
        setAuthError(err.message);
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const signUp = (email, password, userName) => {
    dispatch(userrequest());
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const rootRef = db.ref();
        const users = rootRef.child(`${userType}Users/${auth.currentUser.uid}`);
        users
          .set({ name: userName, email: email, id: auth.currentUser.uid })
          .then(() => {
            alert("Account created successfully");
          })
          .catch((err) => {
            auth.signOut();
            dispatch(userfailure(err.message));
            setAuthError(err.message);
          });
      })
      .catch((err) => {
        dispatch(userfailure(err.message));
        setAuthError(err.message);
      });
  };

  return (
    <div className="auth">
      <div className="auth__box">
        <div id="box__left">
          <Authsidebar headline="Welcome Back" btnName="Login" path="/Signin" />
        </div>
        <div id="box__right">
          <h2>Create Account</h2>
          <div id="error">{authError && authError}</div>
          <form onSubmit={formik.handleSubmit}>
            <div className="radio__btns">
              <input
                type="radio"
                name="radioOption"
                id="Freelancer"
                value="Freelancer"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.radioOption === "Freelancer"}
              />
              <label htmlFor="Freelancer">Freelancer</label>
              <input
                type="radio"
                name="radioOption"
                id="Client"
                value="Client"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.radioOption === "Client"}
              />
              <label htmlFor="Client">Client</label>
            </div>

            {formik.touched.radioOption && formik.errors.radioOption ? (
              <div id="error">{formik.errors.radioOption}</div>
            ) : null}

            <div>
              <input
                type="text"
                placeholder="Username"
                id="name"
                name="name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div id="error">{formik.errors.name}</div>
              ) : null}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div id="error">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="password__field">
              <input
                type={passwordView ? "text" : "password"}
                placeholder="Password"
                id="password"
                name="password"
                {...formik.getFieldProps("password")}
              />
              <span onClick={() => setPasswordView(!passwordView)}>
                <FaEye />
              </span>
              {formik.touched.password && formik.errors.password ? (
                <div id="error">{formik.errors.password}</div>
              ) : null}
            </div>

            <div id="auth_btn">
              <button id="signin" type="submit">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
