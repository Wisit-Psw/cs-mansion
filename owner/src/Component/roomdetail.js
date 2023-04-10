import React, { Component } from "react";
import axios from "axios";
import style from "./roomdetail.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
class Roomdetail extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state.data = this.props.data;
    this.state.room = "";
    this.state.tenant = "";
    this.state.user1 = "";
    this.state.user2 = "";
    this.state.editstatus = false;
    this.state.addstatus = false;
  }
  async querroom() {
    var res = await axios.get(
      "http://cs-mansion.thddns.net:9991/getroomdata/" + this.state.data + "/-1"
    );
    await this.setState({ room: res.data[0] });
  }
  async quertenant() {
    var res = await axios.get(
      "http://cs-mansion.thddns.net:9991/gettenant/" + this.state.data
    );
    await this.setState({ tenant: res.data[0] });
    if (res.data[0] && res.data[0][4] === 1) {
      var res2 = await axios.get(
        "http://cs-mansion.thddns.net:9991/getuserdata/" +
          String(res.data[0][1])
      );
      await this.setState({ user1: res2.data[0] });
      var res3 = await axios.get(
        "http://cs-mansion.thddns.net:9991/getuserdata/" +
          String(res.data[0][2])
      );
      await this.setState({ user2: res3.data[0] });
    }
  }
  async moveout() {
    await axios.put(
      "http://cs-mansion.thddns.net:9991/moveout/" + String(this.state.room[0])
    );
    this.props.hinddetail();
    this.props.getroomdata();
    this.props.hinddetail();
  }
  async update() {
    var roomprice = document.getElementById("roomprice").value;

    await axios.put(
      "http://cs-mansion.thddns.net:9991/updateroom/" +
        String(this.state.room[0]) +
        "/" +
        String(roomprice)
    );
    if (this.state.room[4] === "1") {
      if (this.state.user1 && this.state.user1.length !== 0) {
        var user1name = document.getElementById("user1name").value;
        var user1address = document.getElementById("user1address").value;
        var user1phone = document.getElementById("user1phone").value;
        await axios.put(
          "http://cs-mansion.thddns.net:9991/updateuser/" +
            String(this.state.user1[3]) +
            "/" +
            String(user1name) +
            "/" +
            String(user1address) +
            "/" +
            String(user1phone)
        );
      }
      if (this.state.user2 && this.state.user2.length !== 0) {
        var user2name = document.getElementById("user2name").value;
        var user2address = document.getElementById("user2address").value;
        var user2phone = document.getElementById("user2phone").value;
        await axios.put(
          "http://cs-mansion.thddns.net:9991/updateuser/" +
            String(this.state.user2[3]) +
            "/" +
            String(user2name) +
            "/" +
            String(user2address) +
            "/" +
            String(user2phone)
        );
      }
    }
    this.querroom();
    this.quertenant();
    this.setState({ editstatus: !this.state.editstatus });
  }

  async addtenant() {
    var user1phone = document.getElementById("user1phone").value;
    var user2phone = document.getElementById("user2phone").value;
    if (user1phone !== "") {
      var checkuser = await axios.get(
        "http://cs-mansion.thddns.net:9991/getuserdata/" +
          String(user1phone)
      );
      if (checkuser.data.length === 0) {
        var user1name = document.getElementById("user1name").value;
        var user1peopleid = document.getElementById("user1peopleid").value;
        var user1address = document.getElementById("user1address").value;
        await axios.post(
          "http://cs-mansion.thddns.net:9991/postuser/" +
            String(user1name) +
            "/" +
            String(user1peopleid) +
            "/" +
            String(user1address) +
            "/" +
            String(user1phone)
        );
      }
    }
    if (user2phone !== "") {
      var checkuser2 = await axios.get(
        "http://cs-mansion.thddns.net:9991/getuserdata/" +
          String(user2phone)
      );
      if (checkuser2.data.length === 0) {
        var user2name = document.getElementById("user2name").value;
        var user2peopleid = document.getElementById("user2peopleid").value;
        var user2address = document.getElementById("user2address").value;
        await axios.post(
          "http://cs-mansion.thddns.net:9991/postuser/" +
            String(user2name) +
            "/" +
            String(user2peopleid) +
            "/" +
            String(user2address) +
            "/" +
            String(user2phone)
        );
      }
    }else{
      user2phone="-1";
    }
    if (user1phone !== "") {
      console.log(String(user1phone))
      console.log(String(user2phone))
      console.log(String(this.state.room[0]))
      await axios.post(
        "http://cs-mansion.thddns.net:9991/posttenant/" +
          String(user1phone) +
          "/" +
          String(user2phone) +
          "/" +
          String(this.state.room[0])
      );
    }

    this.querroom();
    this.quertenant();
    this.setState({ editstatus: !this.state.editstatus });
  }
  componentDidMount() {
    this.querroom();
    this.quertenant();
  }

  render() {
    return (
      <div className={style.page}>
        <div className={style.background}>
          {!this.state.editstatus ? (
            <div>
              <div className={style.container}>
                <table className={style.Table}>
                  <tbody>
                    <tr>
                      <th colSpan={2}>
                        <div style={{ display: "flex", width: "100%" }}>
                          <div className={style.header}>ข้อมูลห้อง</div>
                          <div
                            className={style.closicon}
                            onClick={() => {
                              this.props.hinddetail();
                            }}
                          >
                            {<AiOutlineCloseCircle />}
                          </div>
                        </div>
                      </th>
                    </tr>
                    <tr className={style.tr}>
                      <th className={style.th}>เลขห้อง</th>
                      <td className={style.td}>
                        {this.state.room[0] || "กำลังโหลด"}
                      </td>
                    </tr>
                    <tr className={style.tr}>
                      <th className={style.th}>หมายเลขตึก</th>
                      <td className={style.td}>
                        {this.state.room[3] || "กำลังโหลด"}
                      </td>
                    </tr>
                    <tr className={style.tr}>
                      <th className={style.th}>ขนาด</th>
                      <td className={style.td}>
                        {this.state.room[1] || "กำลังโหลด"}
                      </td>
                    </tr>
                    <tr className={style.tr}>
                      <th className={style.th}>ราคา</th>
                      <td className={style.td}>
                        {this.state.room[2] || "กำลังโหลด"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {this.state.room[4] === "1" &&
                this.state.user1 &&
                this.state.user1.length !== 0 && (
                  <div className={style.container}>
                    <table className={style.Table}>
                      <tbody>
                        <tr>
                          <th colSpan={2}>ข้อมูลผู้เช่า</th>
                        </tr>
                        <tr className={style.tr}>
                          <th className={style.th}>ชื่อ</th>
                          <td className={style.td}>
                            {this.state.user1[0] || "กำลังโหลด"}
                          </td>
                        </tr>
                        <tr className={style.tr}>
                          <th className={style.th}>เลขบัตรประชาชน</th>
                          <td className={style.td}>
                            {this.state.user1[1] || "กำลังโหลด"}
                          </td>
                        </tr>
                        <tr className={style.tr}>
                          <th className={style.th}>ที่อยู่</th>
                          <td className={style.td}>
                            {this.state.user1[2] || "กำลังโหลด"}
                          </td>
                        </tr>
                        <tr className={style.tr}>
                          <th className={style.th}>มือถือ</th>
                          <td className={style.td}>
                            {this.state.user1[3] || "กำลังโหลด"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              {this.state.room[4] === "1" &&
                this.state.user2 &&
                this.state.user2.length !== 0 && (
                  <div className={style.container}>
                    <table className={style.Table}>
                      <tbody>
                        <tr>
                          <th colSpan={2}>ข้อมูลผู้เช่า</th>
                        </tr>
                        <tr className={style.tr}>
                          <th className={style.th}>ชื่อ</th>
                          <td className={style.td}>
                            {this.state.user2[0] || "กำลังโหลด"}
                          </td>
                        </tr>
                        <tr className={style.tr}>
                          <th className={style.th}>เลขบัตรประชาชน</th>
                          <td className={style.td}>
                            {this.state.user2[1] || "กำลังโหลด"}
                          </td>
                        </tr>
                        <tr className={style.tr}>
                          <th className={style.th}>ที่อยู่</th>
                          <td className={style.td}>
                            {this.state.user2[2] || "กำลังโหลด"}
                          </td>
                        </tr>
                        <tr className={style.tr}>
                          <th className={style.th}>มือถือ</th>
                          <td className={style.td}>
                            {this.state.user2[3] || "กำลังโหลด"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              <button
                className={style.edit_button}
                onClick={() => {
                  this.setState({ editstatus: !this.state.editstatus });
                }}
              >
                แก้ไข
              </button>
              {this.state.room[4] === "0" ? (
                <button
                  className={style.edit_button}
                  onClick={() => {
                    this.setState({ editstatus: !this.state.editstatus });
                    this.setState({ addstatus: !this.state.addstatus });
                  }}
                >
                  เพิ่มผู้เช่า
                </button>
              ) : (
                <button
                  className={style.edit_button}
                  onClick={() => {
                    this.moveout();
                  }}
                >
                  ย้ายออก
                </button>
              )}
            </div>
          ) : (
            <div>
              <div className={style.container}>
                <table className={style.Table}>
                  <tbody>
                    <tr>
                      <th colSpan={2}>
                        <div style={{ display: "flex", width: "100%" }}>
                          <div className={style.header}>ข้อมูลห้อง</div>
                          <div
                            className={style.closicon}
                            onClick={() => {
                              this.props.hinddetail();
                            }}
                          >
                            {<AiOutlineCloseCircle />}
                          </div>
                        </div>
                      </th>
                    </tr>
                    <tr className={style.tr}>
                      <th className={style.th}>เลขห้อง</th>
                      <td className={style.td}>{this.state.room[0] || ""}</td>
                    </tr>
                    <tr className={style.tr}>
                      <th className={style.th}>หมายเลขตึก</th>
                      <td className={style.td}>{this.state.room[3] || ""}</td>
                    </tr>
                    <tr className={style.tr}>
                      <th className={style.th}>ขนาด</th>
                      <td className={style.td}>{this.state.room[1] || ""}</td>
                    </tr>
                    <tr className={style.tr}>
                      <th className={style.th}>ราคา</th>
                      <td className={style.td}>
                        <input
                          type="text"
                          id="roomprice"
                          defaultValue={this.state.room[2] || ""}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {((this.state.user1 &&
                this.state.user1.length !== 0 &&
                this.state.room[4] === "1") ||
                this.state.addstatus) && (
                <div className={style.container}>
                  <table className={style.Table}>
                    <tbody>
                      <tr>
                        <th colSpan={2}>ข้อมูลผู้เช่า</th>
                      </tr>
                      <tr className={style.tr}>
                        <th className={style.th}>ชื่อ</th>
                        <td className={style.td}>
                          {this.state.room[4] === "1" ? (
                            <input
                              type="text"
                              id="user1name"
                              defaultValue={this.state.user1[0] || ""}
                            />
                          ) : (
                            <input type="text" id="user1name" />
                          )}
                        </td>
                      </tr>
                      <tr className={style.tr}>
                        <th className={style.th}>เลขบัตรประชาชน</th>
                        <td className={style.td}>
                          {this.state.room[4] === "1" ? (
                            this.state.user1[1] || ""
                          ) : (
                            <input type="text" id="user1peopleid" />
                          )}
                        </td>
                      </tr>
                      <tr className={style.tr}>
                        <th className={style.th}>ที่อยู่</th>
                        <td className={style.td}>
                          {this.state.room[4] === "1" ? (
                            <input
                              type="text"
                              id="user1address"
                              defaultValue={this.state.user1[2] || ""}
                            />
                          ) : (
                            <input type="text" id="user1address" />
                          )}
                        </td>
                      </tr>
                      <tr className={style.tr}>
                        <th className={style.th}>มือถือ</th>
                        <td className={style.td}>
                          {this.state.room[4] === "1" ? (
                            <input
                              type="text"
                              id="user1phone"
                              defaultValue={this.state.user1[3] || ""}
                            />
                          ) : (
                            <input type="text" id="user1phone" />
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {((this.state.user2 &&
                this.state.user2.length !== 0 &&
                this.state.room[4] === "1") ||
                this.state.addstatus) && (
                <div className={style.container}>
                  <table className={style.Table}>
                    <tbody>
                      <tr>
                        <th colSpan={2}>ข้อมูลผู้เช่า</th>
                      </tr>
                      <tr className={style.tr}>
                        <th className={style.th}>ชื่อ</th>
                        <td className={style.td}>
                          {this.state.room[4] === "1" ? (
                            <input
                              type="text"
                              id="user2name"
                              defaultValue={this.state.user2[0] || ""}
                            />
                          ) : (
                            <input type="text" id="user2name" />
                          )}
                        </td>
                      </tr>
                      <tr className={style.tr}>
                        <th className={style.th}>เลขบัตรประชาชน</th>
                        <td className={style.td}>
                          {this.state.room[4] === "1" ? (
                            this.state.user2[1] || "กำลังโหลด"
                          ) : (
                            <input type="text" id="user2peopleid" />
                          )}
                        </td>
                      </tr>
                      <tr className={style.tr}>
                        <th className={style.th}>ที่อยู่</th>
                        <td className={style.td}>
                          {this.state.room[4] === "1" ? (
                            <input
                              type="text"
                              id="user2address"
                              defaultValue={this.state.user2[2] || ""}
                            />
                          ) : (
                            <input type="text" id="user2address" />
                          )}
                        </td>
                      </tr>
                      <tr className={style.tr}>
                        <th className={style.th}>มือถือ</th>
                        <td className={style.td}>
                          {this.state.room[4] === "1" ? (
                            <input
                              type="text"
                              id="user2phone"
                              defaultValue={this.state.user2[3] || ""}
                            />
                          ) : (
                            <input type="text" id="user2phone" />
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              <button
                className={style.cancel_button}
                onClick={() => {
                  this.setState({ editstatus: false });
                  this.setState({ addstatus: false });
                }}
              >
                ยกเลิก
              </button>
              {!this.state.addstatus ? (
                <button
                  className={style.edit_button}
                  onClick={() => {
                    this.update();
                  }}
                >
                  บันทึก
                </button>
              ) : (
                <button
                  className={style.edit_button}
                  onClick={() => {
                    this.addtenant();
                  }}
                >
                  เพิ่ม
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Roomdetail;
