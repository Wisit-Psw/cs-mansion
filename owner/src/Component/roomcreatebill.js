import React, { Component } from "react";
import { IoWater } from "react-icons/io5";
import { AiTwotoneThunderbolt, AiOutlineSend } from "react-icons/ai";
// import { createRoot } from "react-dom/client";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import { MdDeleteForever } from "react-icons/md";
// import Billdetail from "./billdeatail";
// import Payment from "./payment";
import style from "./roomcreatebill.module.css";

class RoomCB extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state.arr = this.props.data;
    // this.state.arr = [];
    this.state.unitinputstatus = false;
    this.state.unitinputdata = [];
  }
  async postbill() {
    var waterunit = document.getElementById("waterunit"+String(this.state.arr[3])).value;
    var electricunit = document.getElementById("electricunit"+String(this.state.arr[3])).value;
    await axios.post(
      "http://cs-mansion.thddns.net:9991/postunit/" +
        String(this.state.arr[3]) +
        "/" +
        String(waterunit) +
        "/" +
        String(electricunit)
    );
    await this.ckeckdate();
  }
  async ckeckdate() {
    var status = await axios.get(
      "http://cs-mansion.thddns.net:9991/getinputbillstatus/" +
        String(this.state.arr[3])
    );
    await this.setState({ unitinputstatus: status.data["status"] });
    if (!this.state.unitinputstatus) {
      await this.setState({
        unitinputdata: [
          status.data["select"][0][0],
          status.data["select"][0][1],
          status.data["select"][0][2],
          status.data["select"][0][3],
          status.data["select"][0][7],
        ],
      });
    }
    // this.setState({ unitinputdata: [status.data["select"][0][2],status.data["select"][0][3] ]});
  }
  async deletebill() {
    await axios.delete(
      "http://cs-mansion.thddns.net:9991/deletebill/" +
        String(this.state.unitinputdata[0]) +
        "/" +
        String(this.state.unitinputdata[1])
    );
    await this.ckeckdate();
  }
  componentDidMount() {
    this.ckeckdate();
  }
  render() {
    return (
      <div>
        {this.state.unitinputstatus ? (
          <div className={style.inputbox}>
            <div className={style.inputbox2}>
              {this.state.arr[3]}
              <div className={style.inputunit}>
                <div className={style.inputcontainer}>
                  <IoWater color="blue" />
                  <input
                    className={style.input}
                    type="number"
                    id={"waterunit"+String(this.state.arr[3])}
                  ></input>
                  <AiTwotoneThunderbolt color="yellow" />
                  <input
                    className={style.input}
                    type="number"
                    id={"electricunit"+String(this.state.arr[3])}
                  ></input>
                </div>
              </div>
              <div
                className={style.sendicon}
                onClick={() => {
                  this.postbill();
                }}
              >
                <AiOutlineSend />
              </div>
            </div>
          </div>
        ) : (
          <div className={style.inputbox}>
            <div className={style.inputbox2}>
              {this.state.arr[3]}
              <div className={style.inputunit}>
                <div className={style.inputcontainer}>
                  <IoWater color="blue" />
                  <div className={style.input}>
                    {this.state.unitinputdata[2]}
                  </div>
                  <AiTwotoneThunderbolt color="yellow" />
                  <div className={style.input}>
                    {this.state.unitinputdata[3]}
                  </div>
                </div>
              </div>
              <div
                className={style.sendicon}
                onClick={() => {
                  this.postbill();
                }}
              >
                <div className={style.icon}>
                  {this.state.unitinputdata[5] !== 1 ? (
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        className={style.DropdownToggle}
                      >
                        <MdDeleteForever
                          className={style.MdDelete}
                          color="red"
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            this.deletebill();
                          }}
                        >
                          delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <MdDeleteForever className={style.MdDelete} color="gray" />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default RoomCB;
