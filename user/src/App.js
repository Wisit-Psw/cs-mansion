import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./App.module.css";
import NavBar from "./Component/NavBar";
import Home from "./Component/Home";
import Bill from "./Component/bill";
import Report from "./Component/report";
import User from "./Component/user";

class App extends Component {
  state = {};
  async setLocalstorage() {
    var username = document.getElementById("RoomID").value;
    var password = document.getElementById("password").value;
    if(String(username)!=="0"){
      var session = await axios.get(
        "http://cs-mansion.thddns.net:9991/Login/" +
          String(username) +
          "/" +
          String(password)
      );
      if(session.data.login){
        await window.localStorage.setItem("Session", session.data.key);
        this.login();
      }
      else{
        var loginerror =  createRoot(document.getElementById("loginerror"))
        loginerror.render(<b style={{color:"red",marginTop:"-20px"}}>Login Error</b>)
      }
      
    }else{
      loginerror =  createRoot(document.getElementById("loginerror"))
      loginerror.render(<b style={{color:"red",marginTop:"-20px"}}>Login Error</b>)
    }
   
  }
  getLocalstorage() {
    return window.localStorage.getItem("Session");
  }
  async login() {
    var session = await this.getLocalstorage("Session");
    if (session != null) {
      var username = await axios.get(
        "http://cs-mansion.thddns.net:9991/getsession/" + session
      );
      if (username.data.length > 0) {
        this.setState({ username: username.data[0][1] });
      } else {
        await window.localStorage.setItem("Session", null);
        this.loginpage();
      }
    } else {
      this.loginpage();
    }
  }
  async logout() {
    var session = await window.localStorage.getItem("Session");
    if (session != null) {
      await axios.get("http://cs-mansion.thddns.net:9991/Logout/" + session);
    }
    this.setState({ username: "" });
    await window.localStorage.setItem("Session", null);
    this.login();
  }
  constructor(props) {
    super(props);
    this.state = {};
    this.state.username = "";
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.setLocalstorage = this.setLocalstorage.bind(this);
    this.getLocalstorage = this.getLocalstorage.bind(this);
  }
  componentDidMount() {
    this.login();
  }
  loginpage() {
    createRoot(document.getElementById("loginpage")).render(
      <div className={style.form}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>RoomID</label>
          <input
            type="text"
            className="form-control"
            placeholder="EnterRoomID"
            id="RoomID"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            id="password"
          />
        </div>
      <div id="loginerror" style={{height:"40px"}}></div>
        <div className="d-grid">
          <div className="btn btn-primary" onClick={this.setLocalstorage}>
            Login
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div id="app" className={style.App}>
        {this.state.username !== "" ? (
          <BrowserRouter>
            <div
              className="d-grid"
              style={{ position: "fixed", margin: "100px 0 0 80%" }}
            ></div>
            <NavBar id="nav" propState={this.state} Logout={this.logout} />
            <div>
              <Routes>
                <Route path="/" element={<Home propState={this.state} />} />
                <Route path="/bill" element={<Bill propState={this.state} />} />
                <Route
                  path="/report"
                  element={<Report propState={this.state} />}
                />
                <Route
                  path="/userinfo"
                  element={<User propState={this.state} />}
                />
              </Routes>
            </div>
          </BrowserRouter>
        ) : (
          <div id="loginpage"></div>
        )}
      </div>
    );
  }
}
export default App;
