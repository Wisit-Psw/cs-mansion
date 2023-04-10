import React, { Component } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { MdDateRange, MdReportProblem, MdDeleteForever } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import { BiCheckSquare } from "react-icons/bi";
// , BiEdit
import { BiSearchAlt2 } from "react-icons/bi";
// import axios from "axios";

import style from "./report.module.css";

class Report extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = this.props.propState;
    this.state.arr = [[1,2,3,4,5,6,7,8,9,0]];
    this.queryreport = this.queryreport.bind(this);
  }
  async queryreport(status) {}
  async deletereport(reportid) {}
  async checkreport(reportid) { }
  componentDidMount() {
    this.queryreport();
  }
  render() {
    return (
      <div className={style.page}>
        <div className={style.content}>
          <div className={style.inputbox}>
            <div className={style.inputbox2}>
              <div className={style.room_number}>
                <h3 style={{ margin: "0" }}>
                  <BiSearchAlt2 />
                </h3>
              </div>
              <div className={style.inputunit}>
                <div className={style.inputcontainer}>
                  <input
                    className={style.input}
                    type="number"
                    id="RoomID"
                    placeholder="เลขห้อง"
                  ></input>
                  <select
                    name="status"
                    id="status"
                    className={style.input}
                    onChange={(e) => {
                      this.queryreport(e.target.value);
                    }}
                  >
                    <option value="-1">ทั้งหมด</option>
                    <option value="1">รอดำเนินการ</option>
                    <option value="2">เสร็จสิ้น</option>
                  </select>
                </div>
              </div>
              <div className={style.sendicon} onClick={() => {this.queryreport()}}>
                <AiOutlineSend />
              </div>
            </div>
          </div>
          <div className={style.unitlist}>
            {this.state.arr.length!==0?(this.state.arr
              .slice(0)
              .reverse()
              .map((el) => (
                <div ket={el[0]} className={style.inputbox}>
                  <div className={style.inputbox2}>
                    <div className={style.mothunit}>
                      <div className={style.inputcontainer2}>{el[1]}</div>
                      <div className={style.inputcontainer2}>
                        <MdDateRange color="#306fe9" />
                        {el[3][8] + el[3][9] + "/" + el[3][5] + el[3][6]}
                      </div>
                      <div className={style.problemcontent}>
                        <MdReportProblem color="rgb(241, 241, 0)" />
                        {el[2]}
                      </div>
                      {el[4] === 1 ? (
                        <div
                          style={{ minWidth: "fit-content", display: "flex" }}
                        >
                          <div className={style.icon}>
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                                className={style.DropdownToggle}
                              >
                                <MdDeleteForever className={style.MdDelete} />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() => {
                                    this.deletereport(el[0]);
                                  }}
                                >
                                  delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>

                          <div className={style.icon}>
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                                className={style.DropdownToggle}
                              >
                                <BiCheckSquare className={style.BiCheck} />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() => {
                                    this.checkreport(el[0]);
                                  }}
                                >
                                  check
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      ) : (
                        <div style={{ minWidth: "fit-content" }}>เสร็จสิ้น</div>
                      )}
                    </div>
                  </div>
                </div>
              ))):<div>ไม่พบการรายงาน</div>}
          </div>
        </div>
      </div>
    );
  }
}

export default Report;
