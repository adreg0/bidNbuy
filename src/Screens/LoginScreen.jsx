import React, { Component, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function LoginScreen(){
  let [email, setEmail]=useState("");
  let [password, setPassword]=useState("");
  let [loginSuccessful, setLoginSuccessful]=useState(null);
  let [userArray, setUserArray]=useState([]);

  const navigate=useNavigate();

  useEffect(()=>{
    axios.get("http://localhost:4000/users").then((resp) => {
      let data = resp.data;
      let userObj={}
      let userArray=[]
      data.forEach((user)=>{
        userObj={
          email: user.email,
          password: user.password
        }
        userArray.push(userObj)
      })
      setUserArray(userArray)
  })
  })


  function login() {
    console.log("ma")
    userArray.forEach((user)=>{
      if(user.email==email && user.password==password){
        setLoginSuccessful(true)
        navigate('/home')
        localStorage.setItem("user", email);
      }else{
        console.log("Login error")
        setLoginSuccessful(false)
      }
    })
    
 
  };

    return (
      <div>
        <h2>Login</h2>
        <br></br>
        <br></br>
        
        <div className="form-group">
        <label for="email">Email ID</label>
        <input
          id="email"
          type="string"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          className="form-control"
          />
          </div>
          <br></br>
          <div className="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          className="form-control"
          />
          </div>
          <br></br>
          <br></br>
          <button type="submit" className="form-control btn btn-primary btn-block btn-grad" onClick={login}>
            Login
          </button>
          <p className="forgot-password text-right">
            Haven't signed up yet?
        <Link to="/">Register</Link>
        </p>
          {
            loginSuccessful==false?<div >Incorrect details, Please try again</div>:null
          }
      </div>
    );
}

export default LoginScreen;
