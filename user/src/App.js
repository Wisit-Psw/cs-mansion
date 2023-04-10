import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./App.module.css";
import NavBar from "./Component/NavBar";
import Home from "./Component/Home";
import Bill from "./Component/bill";
import Report from "./Component/report";
class App extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {};
    this.state.username = "1005";
  }
  componentDidMount() {}
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
        <div id="loginerror" style={{ height: "40px" }}></div>
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
                {/* <Route
                  path="/userinfo"
                  element={}
                /> */}
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
