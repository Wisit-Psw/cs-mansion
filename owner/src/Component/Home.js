import React, { Component } from "react";
import style from "./Home.module.css";

class Home extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = this.props.propState;
  }
  componentDidMount() {}
  render() {
    return (
      <div className={style.page}>
        <div className={style.content}>
          <h3>กฎระเบียบ</h3>
          <table style={{ margin: "20px" }}>
            <tr style={{ textAlign: "left", margin: "5px" }}>
              1.ห้ามส่งเสียงดังรบกวนผู้เช่ารายอื่น
            </tr>
            <tr style={{ textAlign: "left", margin: "5px" }}>
              2.ห้ามดื่มสุราภายในหอพัก
            </tr>
            <tr style={{ textAlign: "left", margin: "5px" }}>
              3.ห้ามเสพสารเสพติด
            </tr>
            <tr style={{ textAlign: "left", margin: "5px" }}>
              4.ห้ามเลี้ยงสัตย์ที่อาจส่งเสียงดังหรือก่อความวุ่นวาย
            </tr>
            <tr style={{ textAlign: "left", margin: "5px" }}>
              5.หอพักมีกล้องวงจรปิด
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
export default Home;
