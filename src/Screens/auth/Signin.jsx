import React, { useContext, useState } from "react";
import "./style.css";

// components
import Authsidebar from "./Authsidebar";
import ForgetPassword from "./ForgetPassword";

// redux
import { useDispatch } from "react-redux";
import {
  userrequest,
  userfailure,
  setUserType,
} from "../../Redux/Actions/userActions";

// firebase
import { auth } from "../../firebase";

// error context
import AuthErrorContext from "../../Context/authErrorContext";
import { useFormik } from "formik";
import * as Yup from "yup";

// icons
import { FaEye } from "react-icons/fa";

const Signin = () => {
  const dispatch = useDispatch();
  const { authError, setAuthError } = useContext(AuthErrorContext);
  const [modal, setModal] = useState(false);
  const [passwordView, setPasswordView] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    radioOption: "",
  };

  const validationSchema = Yup.object({
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
      .signInWithEmailAndPassword(formik.values.email, formik.values.password)
      .then(() => {
        setAuthError("");
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

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="auth">
      {modal && <ForgetPassword handleModal={handleModal} />}
      <div className="auth__box">
        <div id="box__left">
          <Authsidebar
            headline="Don't Have Account"
            btnName="Sign Up"
            path="/Signup"
          />
        </div>
        <div id="box__right">
          <h2>Login</h2>
          {authError ? <div id="error">{authError}</div> : null}
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
            <div className="forget__password" onClick={handleModal}>
              Forget Password?
            </div>
            <div id="auth_btn">
              <button id="signin" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
