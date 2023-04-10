import React, { Component } from "react";
import { IoWater } from "react-icons/io5";
import { AiTwotoneThunderbolt} from "react-icons/ai";
import {
  MdOutlinePriceCheck,
  MdDateRange,
  MdOutlinePayments,
} from "react-icons/md";
import { createRoot } from "react-dom/client";
// import axios from "axios";
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
    this.state.arr = [[1,2,3,4,5,6,7,8,9,10]];
    this.state.unitinputstatus = false;
  }
  
  async ckeckdate() {}
  async postSubmit(p) {
}
  async querybill() {}
  componentDidMount() {}
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
