import React, { Component } from "react";
import axios from "axios";
import style from "./user.module.css";

class User extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = this.props.propState;
    this.state.room = "";
    this.state.User1 = "";
    this.state.User2 = "";
  }
  async queryUser() {
    var query = await axios.get(
      "http://cs-mansion.thddns.net:9991/gettenant/" + this.state.username
    );
    query = query.data;
    var room = await axios.get(
      "http://cs-mansion.thddns.net:9991/getroomdata/" + query[0][3] + "/-1"
    );
    this.setState({ room: room.data[0] });
    var user1 = await axios.get(
      "http://cs-mansion.thddns.net:9991/getuserdata/" + query[0][1]
    );
    this.setState({ User1: user1.data[0] });
    if (query[0][2] != null) {
      var user2 = await axios.get(
        "http://cs-mansion.thddns.net:9991/getuserdata/" + query[0][2]
      );
      this.setState({ User2: user2.data[0] });
    }
  }
  componentDidMount() {
    this.queryUser();
  }

  render() {
    return (
      <div className={style.page}>
        <div className={style.content}>
          <div className={style.box}>
            <table className={style.Table}>
              <tr>
                <th colSpan={2}>ข้อมูลห้อง</th>
              </tr>
              <tr className={style.tr}>
                <th className={style.th}>เลขห้อง</th>
                <td className={style.td}>{this.state.room[0]}</td>
              </tr>
              <tr className={style.tr}>
                <th className={style.th}>หมายเลขตึก</th>
                <td className={style.td}>{this.state.room[3]}</td>
              </tr>
              <tr className={style.tr}>
                <th className={style.th}>ขนาด</th>
                <td className={style.td}>{this.state.room[1]}</td>
              </tr>
              <tr className={style.tr}>
                <th className={style.th}>ราคา</th>
                <td className={style.td}>{this.state.room[2]}</td>
              </tr>
            </table>
          </div>
          <div className={style.box}>
            <table className={style.Table}>
              <tr>
                <th colSpan={2}>ข้อมูลผู้เช่า</th>
              </tr>
              <tr className={style.tr}>
                <th className={style.th}>ชื่อ</th>
                <td className={style.td}>{this.state.User1[0]}</td>
              </tr>
              <tr className={style.tr}>
                <th className={style.th}>เลขบัตรประชาชน</th>
                <td className={style.td}>{this.state.User1[1]}</td>
              </tr>
              <tr className={style.tr}>
                <th className={style.th}>ที่อยู่</th>
                <td className={style.td}>{this.state.User1[2]}</td>
              </tr>
              <tr className={style.tr}>
                <th className={style.th}>มือถือ</th>
                <td className={style.td}>{this.state.User1[3]}</td>
              </tr>
            </table>
          </div>
          {this.state.User2 && (
            <div className={style.box}>
              <table className={style.Table}>
                <tr>
                  <th colSpan={2}>ข้อมูลผู้เช่า</th>
                </tr>
                <tr className={style.tr}>
                  <th className={style.th}>ชื่อ</th>
                  <td className={style.td}>{this.state.User2[0]}</td>
                </tr>
                <tr className={style.tr}>
                  <th className={style.th}>เลขบัตรประชาชน</th>
                  <td className={style.td}>{this.state.User2[1]}</td>
                </tr>
                <tr className={style.tr}>
                  <th className={style.th}>ที่อยู่</th>
                  <td className={style.td}>{this.state.User2[2]}</td>
                </tr>
                <tr className={style.tr}>
                  <th className={style.th}>มือถือ</th>
                  <td className={style.td}>{this.state.User2[3]}</td>
                </tr>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default User;
