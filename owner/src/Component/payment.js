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
  }
  async updatestate(e) {
  }
  componentDidMount() {
  }

  render() {
    return (
      <div className={style.page}>
        <div className={style.background}>
          <div className={style.container}>
            <div>
              <div style={{ display: "flex", width: "100%" }}>
                <div className={style.header}>{this.state.billstatus||'กำลังโหลด'}</div>
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
                    this.updatestate(4);
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
