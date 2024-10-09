import React from "react";
import man from "../../../src/assets/man5.png";
import { Link , useNavigate } from "react-router-dom";
import "../Forget_password/otb.css";
import '../Forget_password/successreset.css'
export const Successreset = () => {
    const navigate = useNavigate()
    const login  = ()=>{
        navigate('/')
    }
  return (
    <div className="forget success">
      <div className="up-img">
        <img className="img" src={man} alt="Welcome" />
      </div>
      <div className="text">
      <h1>
        <span>Password Reset Successful!</span>
      </h1>
      <p>Now you can login with new password</p>
      <input onClick={login} className="btn-login" type="submit" value="login" />
      </div>
    </div>
  );
};
