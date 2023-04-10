import React, { Component } from "react";
import axios from "axios";
import style from "./payment.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
class Payment extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state.data = this.props.data;
    this.billstatus = "";
  }
  async querystate() {
    var res = await axios.get(
      "http://cs-mansion.thddns.net:9991/billstatus/" +
        String(this.state.data[7])
    );
    await this.setState({ billstatus: res.data[0][1] });
  }
  async updatestate(e) {
    await axios.put(
      "http://cs-mansion.thddns.net:9991/updatestate/" +
        String(this.state.data[0]) +
        "/" +
        String(this.state.data[1]) +
        "/" +
        String(e)
    );
    this.props.querybill();
  }
  componentDidMount() {
    this.querystate();
  }

  render() {
    return (
      <div className={style.page}>
        <div className={style.background}>
          <div className={style.container}>
            <div>
              <div style={{ display: "flex", width: "100%" }}>
                <div className={style.header}>
                  {this.state.billstatus || "กำลังโหลด"}
                </div>
                <div
                  className={style.closicon}
                  onClick={() => {
                    this.props.hinddetail();
                  }}
                >
                  {<AiOutlineCloseCircle />}
                </div>
              </div>
              <div className={style.bar} />
              <img
                src={this.state.data[8]}
                alt="Slip"
                width="300"
                style={{ margin: "10px auto" }}
              />
            </div>
            {this.state.data[7] === 3 && (
              <div
                style={{
                  width: "90%",
                  margin: "10px auto",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <button
                  className={style.cancle}
                  onClick={() => {
                    this.updatestate(1);
                  }}
                >
                  Cancle
                </button>
                <button
                  className={style.confirm}
                  onClick={() => {
                    this.updatestate(2);
                  }}
                >
                  Confirm
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
