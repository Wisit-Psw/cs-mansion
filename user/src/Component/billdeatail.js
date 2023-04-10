import React, { Component } from "react";
// import axios from "axios";
// import { createRoot } from "react-dom/client";
import style from "./billdetail.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
// import { BsImageFill } from "react-icons/bs";
class Billdetail extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state.data = this.props.data;
    this.state.roomprice = "";
    this.state.eachprice = "";
  }
  async queryeachprice() {}
  async querroomprice() {}

  componentDidMount() {
    this.queryeachprice();
    this.querroomprice();
  }

  render() {
    return (
      <div className={style.page}>
        <div className={style.background}>
          <div className={style.container}>
            <div style={{ display: "flex", width: "100%" }}>
              <div className={style.header}>ใบแจ้งหนี้</div>
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
            <table className={style.Table}>
              <tr className={style.TableRow}>
                <th className={style.TableRow} colSpan={4}>
                  ห้องที่ {this.state.data[0]}
                </th>
              </tr>
              <tr className={style.TableRow}>
                <th className={style.TableRow} colSpan={4}>
                  ออกเมื่อวันที่{" "}
                  {this.state.data[1][8] +
                    this.state.data[1][9] +
                    "/" +
                    this.state.data[1][5] +
                    this.state.data[1][6] +
                    "/" +
                    this.state.data[1][0] +
                    this.state.data[1][1] +
                    this.state.data[1][2] +
                    this.state.data[1][3]}
                </th>
              </tr>
              <tr className={style.TableRow}>
                <th className={style.TableColumn}>รายการ</th>
                <th className={style.TableColumn}>จำนวนที่ใช้</th>
                <th className={style.TableColumn}>ราคาต่อหน่วย</th>
                <th className={style.TableColumn}>รวม</th>
              </tr>
              <tr className={style.TableRow}>
                <td className={style.TableColumn}>ค่าห้อง</td>
                <td className={style.TableColumn}> </td>
                <td className={style.TableColumn}> </td>
                <td className={style.TableColumn}>{this.state.roomprice[2]}</td>
              </tr>
              <tr className={style.TableRow}>
                <td className={style.TableColumn}>ค่าไฟฟ้า</td>
                <td className={style.TableColumn}>{this.state.data[3]}</td>
                <td className={style.TableColumn}>{this.state.eachprice[1]}</td>
                <td className={style.TableColumn}>
                  {this.state.data[3] * this.state.eachprice[1]}
                </td>
              </tr>
              <tr className={style.TableRow}>
                <td className={style.TableColumn}>ค่าน้ำ</td>
                <td className={style.TableColumn}>{this.state.data[2]}</td>
                <td className={style.TableColumn}>{this.state.eachprice[2]}</td>
                <td className={style.TableColumn}>
                  {this.state.data[2] * this.state.eachprice[2]}
                </td>
              </tr>
              <tr className={style.TableRow}>
                <td className={style.TableColumn}>ค่าส่วนกลาง</td>
                <td className={style.TableColumn}> </td>
                <td className={style.TableColumn}> </td>
                <td className={style.TableColumn}>{this.state.eachprice[4]}</td>
              </tr>
              <tr className={style.TableRow}>
                <td className={style.TableColumn}>ค่าอินเตอร์เน็ต</td>
                <td className={style.TableColumn}> </td>
                <td className={style.TableColumn}> </td>
                <td className={style.TableColumn}>{this.state.eachprice[3]}</td>
              </tr>
              <tr className={style.TableRow}>
                <td className={style.TableColumn}>รวม</td>
                <td className={style.TableColumn}> </td>
                <td className={style.TableColumn}> </td>
                <td className={style.TableColumn}>{this.state.data[6]}</td>
              </tr>
            </table>
            <div className={style.Footnote }>
              <label>หมายเหตุ**</label><br/>
              <label>ชำระเงินภายในวันที่ 5 ของทุกเดือนถัดไป</label><br/>
              <label>หากเกินกำหนดชำระ จะถูกปรับวันละ 50 บาท</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Billdetail;
