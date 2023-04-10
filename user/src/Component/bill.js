import React, { Component } from "react";
import { IoWater } from "react-icons/io5";
import { AiTwotoneThunderbolt} from "react-icons/ai";
import {
  MdOutlinePriceCheck,
  MdDateRange,
  MdOutlinePayments,
} from "react-icons/md";
import { createRoot } from "react-dom/client";
import axios from "axios";
import { BiDetail } from "react-icons/bi";
import Billdetail from "./billdeatail";
import Payment from "./payment";
import style from "./bill.module.css";

class Bill extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = this.props.propState;
    this.postSubmit = this.postSubmit.bind(this);
    this.state.arr = [];
    this.state.unitinputstatus = false;
  }
  
  async ckeckdate() {
    var status = await axios.get(
      "http://192.168.1.104:8000/getinputbillstatus/" +
        String(this.state.username)
    );
    this.setState({ unitinputstatus: status.data });
  }
  async postSubmit(p) {
    await axios.put(
      "http://cs-mansion.thddns.net:9991/putslip",
      JSON.stringify({
        RoomID: p.RoomID,
        Date: p.Date,
        file: p.file,
      })
    );
    this.querybill();
    this.hinddetail();
  }
  async querybill() {
    var query = await axios.get(
      "http://cs-mansion.thddns.net:9991/getbill/" + this.state.username + "/-1"
    );
    this.setState({ arr: query.data });
  }
  componentDidMount() {
    this.querybill();
    this.ckeckdate();
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
  payment(data) {
    var showdetail = createRoot(document.getElementById("showdetail"));
    var ele = (
      <Payment
        data={data}
        hinddetail={this.hinddetail}
        postSubmit={this.postSubmit}
      />
    );
    showdetail.render(ele);
  }

  render() {
    return (
      <div className={style.page}>
        <div id="showdetail"></div>
        <div className={style.content}>
          <div className={style.unitlist}>
            {this.state.arr
              .slice(0)
              .reverse()
              .map((el) => (
                <div key={el[1]} className={style.inputbox}>
                  <div className={style.inputbox2}>
                    <div className={style.mothunit}>
                      <div className={style.inputcontainer}>
                        <MdDateRange color="#306fe9" />
                        {el[1][8] +
                          el[1][9] +
                          "/" +
                          el[1][5] +
                          el[1][6] +
                          "/" +
                          el[1][0] +
                          el[1][1] +
                          el[1][2] +
                          el[1][3]}
                      </div>
                      <div className={style.inputcontainer}>
                        <IoWater color="blue" />
                        {el[2]}
                      </div>
                      <div className={style.inputcontainer}>
                        <AiTwotoneThunderbolt color="yellow" />
                        {el[3]}
                      </div>
                      <div className={style.inputcontainer}>
                        <MdOutlinePriceCheck color="green" />
                        {el[6]}
                      </div>
                      <div
                        className={style.detailicon}
                        onClick={() => {
                          this.showdetail(el);
                        }}
                      >
                        <BiDetail />
                      </div>
                      {/* {el[7] === 1 && ( */}
                      <div
                        className={style.detailicon}
                        onClick={() => {
                          this.payment(el);
                        }}
                      >
                        <MdOutlinePayments color="green" />
                      </div>
                      {/* )} */}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Bill;
