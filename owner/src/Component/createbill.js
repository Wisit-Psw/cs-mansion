import React, { Component } from "react";
// import axios from "axios";
import style from "./createbill.module.css";
import RoomCB from "./roomcreatebill";
class CreateBill extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = this.props.propState;
    this.state.arr = [[1,2,3,4,5,6,7]];
    this.state.unitinputstatus = false;
  }

  async querytenant() {}
  componentDidMount() {
    this.querytenant();
  }

  render() {
    return (
      <div className={style.page}>
        <div className={style.content}>
          {this.state.arr !== 0 ? (
            this.state.arr.map((el) => <RoomCB key={el[0]} data={el} />)
          ) : (
            <div>กำลังโหลด....</div>
          )}
        </div>
      </div>
    );
  }
}

export default CreateBill;
