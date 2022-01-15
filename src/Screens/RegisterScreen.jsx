import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
function HomeScreen(){
    let [email, setEmail]=useState("");
    let [password, setPassword]=useState("");
    let [name, setName]=useState("");
    let [emailArray, setEmailArray]=useState([]);
    let [userExists, setUserExists]=useState();
    const navigate=useNavigate();


  useEffect(()=>{
    setUserExists(false);
    axios.get("http://localhost:4000/users").then((resp) => {
        let data = resp.data;
        let emailArray=[];
        data.forEach((user)=>{
            emailArray.push(user.email)
        })
        setEmailArray(emailArray)
      });
  })


 function postUser() {
    let details = {
      email: email,
      name: name,
      password: password
    };
    console.log(emailArray)
    if(emailArray.includes(email)){
        console.log("A,")
        setUserExists(true)
        return;
    }
    if(name!="" && email!="" && password!=""){
      
    axios.post("http://localhost:4000/users", details).then(()=>{
      navigate('/home');
        localStorage.setItem('user', email)
    }).catch((error) => {
      console.log(error);
    });

}
  };

    return (
      <div>
        <h2>SIGN-UP</h2>
        <div className="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          type="string"
          onChange={(e) => {
            setName(e.target.value)
          }}
          className="form-control"
          required
        />
        </div>
        <br></br>
        <div className="form-group">
        <label for="email">Email ID</label>
        <input
          id="email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          className="form-control"
          required
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
          required
        />
         </div>
       
          <br></br>
          
        <button className="form-control btn btn-primary btn-block btn-grad" onClick={postUser}>Sign Up</button>
        <p className="forgot-password text-right">
            Already an user?
        <Link to="/login">Login</Link>
        </p>
        {
            userExists? <p className="forgot-password">User already exists, Please login</p>: null
        }
      </div>
    );
}

export default HomeScreen;
