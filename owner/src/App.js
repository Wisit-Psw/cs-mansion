import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./App.module.css";
import NavBar from "./Component/NavBar";
class App extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {};
    this.state.username = "0";
  }
  componentDidMount() {
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
            <NavBar id="nav" propState={this.state}  />
            <div>
              <Routes>
                {/* <Route path="/" element={{}} /> */}
                {/* <Route path="/bill" element={{}} /> */}
                {/* <Route path="/createbill" element={{}} /> */}
                {/* <Route
                  path="/report"
                  element={{}}
                /> */}
                {/* <Route
                  path="/room"
                  element={{}}
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