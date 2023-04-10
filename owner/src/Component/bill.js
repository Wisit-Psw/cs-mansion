import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import { AiOutlineSend } from "react-icons/ai";
import {
  MdOutlinePriceCheck,
  MdDateRange,
  // MdOutlinePayments,FaHouseUser,
} from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import {
  BiDetail,
  BiSearchAlt2,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import { FaReceipt } from "react-icons/fa";
import axios from "axios";
import Billdetail from "./billdeatail";
import Payment from "./payment";
import Status from "./status";
import style from "./bill.module.css";

class Bill extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = this.props.propState;
    this.state.arr = [];
    this.state.unitinputstatus = false;
  }
  payment(data) {
    var showdetail = createRoot(document.getElementById("showdetail"));
    var ele = (
      <Payment
        data={data}
        hinddetail={this.hinddetail}
        postSubmit={this.postSubmit}
        querybill={this.querybill}
      />
    );
    showdetail.render(ele);
  }
  async querybill(status) {
    var RoomID = document.getElementById("RoomID").value;
    if (!RoomID) {
      RoomID = " ";
    }
    if (!status) {
      status = document.getElementById("status").value;
    }
    var query = await axios.get(
      "http://cs-mansion.thddns.net:9991/getbill/" +
        String(RoomID) +
        "/" +
        String(status)
    );
    this.setState({ arr: query.data });
    console.log(query.data)
  }
  componentDidMount() {
    this.querybill(-1);
  }
  hinddetail() {
    var showdetail = createRoot(document.getElementById("showdetail"));
    var ele = <div></div>;
    showdetail.render(ele);
  }
  showdetail(data) {
    var showdetail = createRoot(document.getElementById("showdetail"));
    var ele = <Billdetail data={data} hinddetail={this.hinddetail} />;
    showdetail.render(ele);
  }

  render() {
    return (
      <div className={style.page}>
        <div id="showdetail"></div>
        <div className={style.content}>
          <div className={style.inputbox}>
            <div className={style.inputbox2}>
              <div className={style.room_number}>
                <h3 style={{ margin: "0" }}>
                  <BiSearchAlt2 />
                </h3>
              </div>
              <div className={style.inputunit}>
                <div className={style.inputcontainer}>
                  <input
                    className={style.input}
                    type="number"
                    id="RoomID"
                    placeholder="เลขห้อง"
                  ></input>
                  <select
                    name="status"
                    id="status"
                    className={style.input}
                    onChange={(e) => {
                      this.querybill(e.target.value);
                    }}
                  >
                    <option value="-1">ทั้งหมด</option>
                    <option value="1">ยังไม่ชำระ</option>
                    <option value="2">ชำระแล้ว</option>
                    <option value="3">รอยืนยัน</option>
                  </select>
                </div>
              </div>
              <div
                className={style.sendicon}
                onClick={() => {
                  this.querybill();
                }}
              >
                <AiOutlineSend />
              </div>
            </div>
          </div>

          <div className={style.unitlist}>
            {this.state.arr.length!==0?this.state.arr
              .slice(0)
              .reverse()
              .map((el) => (
                <div key={el[0]} className={style.inputbox}>
                  <div className={style.inputbox2}>
                    <div className={style.mothunit}>
                      <div className={style.inputcontainer}>
                        {/* <FaHouseUser color="#306fe9" /> */}
                        {el[0]}
                      </div>
                      <div className={style.inputcontainer}>
                        <MdDateRange color="#306fe9" />
                        {el[1][8] + el[1][9] + "/" + el[1][5] + el[1][6]}
                      </div>

                      <div className={style.inputcontainer}>
                        <MdOutlinePriceCheck color="green" />
                        {el[6]}
                      </div>
                      <div className={style.inputcontainer}>
                        {<Status status={el[7]} />}
                      </div>
                      <div style={{ display: "flex" }}>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                            className={style.DropdownToggle}
                          >
                            <BiDotsHorizontalRounded />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => {
                                this.showdetail(el);
                              }}
                            >
                              <BiDetail color="#306fe9"/>
                              Detail
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                this.payment(el);
                              }}
                            >
                             <FaReceipt color="green" />
                             Slip
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </div>
              )):'ไม่พบบิล'}
          </div>
        </div>
      </div>
    );
  }
}

export default Bill;
