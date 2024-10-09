import React, { useState } from "react";
import "./login.css";
import google from "../../../src/assets/google.png";
import apple from "../../../src/assets/apple-logo.png";
import man from "../../../src/assets/man.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import config from "../../../config";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export const Login = () => {
  const [loading, setloading] = useState(false);
  // alert
  const MySwal = withReactContent(Swal);
  const showAlert = () => {
    MySwal.fire({
      title: "Welcome !",
      text: "You have successfully logged in.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  const showAlertfaild = () => {
    MySwal.fire({
      title: "sorry !",
      text: "You must register first.",
      icon: "warning",
      confirmButtonText: "OK",
    });
  };
   // navigate
   const navigate = useNavigate();
  // Auth valid
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setloading(true);
        const res = await axios.post(
          `${config.basUrl}/api/customers/login`,
          values
        );
        localStorage.setItem("userToken", res.data.token);
        showAlert();
        navigate('/home')
      } catch (error) {
        showAlertfaild();
        navigate('/Register')
      } finally {
        setloading(false);
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Your email is required!";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address!";
      }
      if (!values.password) {
        errors.password = "Your password is required!";
      }
      return errors;
    },
  });
  // navigate
  const naigate = useNavigate();

  return (
    <>
      <div className="Login">
        {/* login left */}
        <div className="form-login">
          <h2>Welcome Back!</h2>
          <h1>
            Login To <span>Reach</span>
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && (
              <small className="error">{formik.errors.email}</small>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && (
              <small className="error">{formik.errors.password}</small>
            )}
            {loading ? (
              <input className="btn-login" type="submit" value="sending...." />
            ) : (
              <input className="btn-login" type="submit" value="login" />
            )}

            <Link to="/Forget-password">Forgot Password?</Link>

            {/* login icons */}
            <div className="login-icon">
              <Link to="/">
                <img className="log-icon" alt="google" src={google} />
              </Link>
              <Link to="/">
                <img className="log-icon" alt="icloud" src={apple} />
              </Link>
            </div>

            <p>
              Don’t have an account?{" "}
              <Link to="/Register">
                <span>Signup</span>
              </Link>
            </p>
          </form>
        </div>

        {/* login right */}
        <div className="log-img">
          <img className="login-img" src={man} alt="Welcome" />
        </div>
      </div>
    </>
  );
};
