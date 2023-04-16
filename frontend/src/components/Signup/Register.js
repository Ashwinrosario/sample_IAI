import React from "react";
import "./Register.css";
import image from "../../assets/register_img.png";

const Register = () => {
  return (
    <div className="register">
      <div className="row signup_main">
        <div className="col-md-6 d-none d-md-block signup_left--main">
          <h1>LOGO</h1>
          <div className="signup_left">
            <p>SIGN UP HERE</p>
            <img src={image} />
          </div>
        </div>
        <div className="col-md-6 col-12 signup_right--main">
          <h1>REGISTRATION</h1>
          <div className="signup_right">
            <div className="input_box">
              <input type="text" placeholder="Enter Your Name" />
            </div>
            <div className="input_box">
              <input type="text" placeholder="Email address" />
            </div>
            <div className="input_box">
              <input type="password" placeholder="Password" />
            </div>
            <div>
              
            </div>
            <div className="input_box">
              <input type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
