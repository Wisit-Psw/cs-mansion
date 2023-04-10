import React, { Component } from "react";
import Menu from "./menu";
import { FaSortDown } from "react-icons/fa";
import style from "./NavBar.module.css";
import Dropdown from "react-bootstrap/Dropdown";
const logo = require("./img/logo.png");
class NavBar extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = this.props.propState;
  }
  componentDidMount() {}
  render() {
    return (
      <div className={style.page}>
        <div className={style.container}>
          <div className={style.logo}>
            <img src={logo} alt="Open Exam" className={style.logoimg}></img>
          </div>
          <div className={style.Menu}>
            <Menu propState={this.state} />
          </div>
          <div className={style.room_number}>
            <h3
              style={{ display: "flex", float: "right" }}
              onClick={() => {
                document.getElementById("dropdown-Logout").click();
              }}
            >
              <b>
                {this.state.username === 0 ? (
                  <div>owner</div>
                ) : (
                  <div>R{this.state.username}</div>
                )}
              </b>
              <FaSortDown className={style.arrow} />
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id={"dropdown-Logout"}
                  className={style.DropdownToggle}
                ></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      this.props.Logout();
                    }}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
