import React, { Component } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { createRoot } from "react-dom/client";
// , BiEdit
import { BiSearchAlt2 } from "react-icons/bi";
import axios from "axios";
import Roomdetail from "./roomdetail";
import style from "./room.module.css";

class Room extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = this.props.propState;
    this.state.arr = [];
    this.getroomdata = this.getroomdata.bind(this);
  }
  async getroomdata(status) {
    if (!status) {
      status = document.getElementById("status").value;
    }
    var RoomID = document.getElementById("RoomID").value;
    if (!RoomID) {
      RoomID = "None";
    }
    var query = await axios.get(
      "http://cs-mansion.thddns.net:9991/getroomdata/" +
        String(RoomID) +
        "/" +
        String(status)
    );
    this.setState({ arr: query.data });
  }
  componentDidMount() {
    this.getroomdata();
  }
  hinddetail() {
    var showdetail = createRoot(document.getElementById("showdetail"));
    var ele = <div></div>;
    showdetail.render(ele);
  }
  showdetail(data) {
    var showdetail = createRoot(document.getElementById("showdetail"));
    var ele = <Roomdetail data={data} hinddetail={this.hinddetail} getroomdata={this.getroomdata}/>;
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
                    defaultValue=""
                  ></input>
                  <select
                    name="status"
                    id="status"
                    defaultValue="-1"
                    className={style.input}
                    onChange={(e) => {
                      this.getroomdata(e.target.value);
                    }}
                  >
                    <option value="-1">ทั้งหมด</option>
                    <option value="0">ว่าง</option>
                    <option value="1">มีผู้เช่า</option>
                  </select>
                </div>
              </div>
              <div
                className={style.sendicon}
                onClick={() => {
                  this.getroomdata();
                }}
              >
                <AiOutlineSend />
              </div>
            </div>
          </div>
          <div className={style.unitlist}>
            {this.state.arr.length !== 0 ? (
              this.state.arr.map((el) => el[0]!==0&&(
                <div key={el[0]} className={style.numberbox} >
                  <button
                    className={style.numberbutton}
                    style={el[4]==="0"?{color:"blue"}:{color:"gray"}}
                    onClick={() => {
                      this.showdetail(el[0]);
                    }}
                  >{el[0]}
                  </button>
                </div>
              ))
            ) : (
              <div style={{ margin: "0 auto" }}>กำลังโหลด....</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Room;
