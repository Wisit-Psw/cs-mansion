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
  async querroom() {}
  async quertenant() {}
  async moveout() {
    await axios.put(
      "http://cs-mansion.thddns.net:9991/moveout/" + String(this.state.room[0])
    );
    this.props.hinddetail();
    this.props.getroomdata();
    this.props.hinddetail();
  }
  async update() {
    this.querroom();
    this.quertenant();
    this.setState({ editstatus: !this.state.editstatus });
  }

  async addtenant() {
    this.querroom();
    this.quertenant();
    this.setState({ editstatus: !this.state.editstatus });
  }
  componentDidMount() {
    this.querroom();
    console.log(this.state.room);
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
