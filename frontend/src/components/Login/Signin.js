import React, { useState, useEffect } from "react";
import "./signin.css"; // import your CSS file here
import Axios from 'axios';
import Image from '../../assets/signup_image.avif'

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
  }, [name]);

  useEffect(() => {
  }, [email]);

  useEffect(() => {
  }, [password]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
        Axios({
            method:"post",
            url:"http://localhost:6080/login",
            data:{
                email:email,
                password:password
            }
        }).then((res)=>{
            if(res.data.message==="true"){
                Axios({
                    method:"post",
                    url:"http://localhost:6080/login_academy",
                    data:{
                        email:email,
                        password:password
                    }
                }).then((res)=>{
                    console.log('got response', res)
                    window.localStorage.setItem("token", res);
                    window.localStorage.setItem('is logged in', "true");
                })
            }
            else{
                Axios({
                    method:"post",
                    url:"http://localhost:6080/login_industry",
                    data:{
                        email:email,
                        password:password
                    }
                }).then((res)=>{
                    console.log('got response', res)
                    window.localStorage.setItem("token", res);
                    window.localStorage.setItem('is logged in', "true");
                })
            }
        })
    }
    catch(err) {
      console.log('error occured', err);
    };
  };

  return (
    <div className="split-page">
      <div className="left-section">
        <h1>LOGO</h1>
        <div className="left-main">
          <p>LOGIN HERE !!</p>
          <img src={Image} alt="login_image" />
        </div>
      </div>
      <div className="right-section">
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={name} onChange={handleNameChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
          </label>
          <br />
          <button type="submit" >Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;