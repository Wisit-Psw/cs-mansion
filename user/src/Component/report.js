import React, { Component } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { MdDateRange, MdReportProblem, MdDeleteForever } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import { BiCheckSquare } from "react-icons/bi";
// , BiEdit
import axios from "axios";

import style from "./report.module.css";

class Report extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = this.props.propState;
    this.state.arr = [];
    this.queryreport = this.queryreport.bind(this);
  }
  async queryreport() {
    var query = await axios.get(
      "http://cs-mansion.thddns.net:9991/getreport/-1/" + this.state.username
    );
    this.setState({ arr: query.data });
  }
  async postreport() {
    var data = document.getElementById("reportinput");
    await axios.post(
      "http://cs-mansion.thddns.net:9991/postreport/" +
        String(this.state.username) +
        "/" +
        String(data.value)
    );
    this.queryreport();
    data.value = "";
  }
  async deletereport(reportid) {
    console.log("http://cs-mansion.thddns.net:9991/deletereport/" + reportid);
    await axios.delete(
      "http://cs-mansion.thddns.net:9991/deletereport/" + String(reportid)
    );
    this.queryreport();
  }
  async checkreport(reportid) {
    console.log("http://cs-mansion.thddns.net:9991/checkreport/" + reportid);
    await axios.put(
      "http://cs-mansion.thddns.net:9991/checkreport/" + String(reportid)
    );
    this.queryreport();
  }
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
                <h2 style={{ margin: "0" }}>R{this.state.username}</h2>
              </div>
              <div className={style.inputunit}>
                <div className={style.inputcontainer}>
                  <MdReportProblem color="rgb(241, 241, 0)" />
                  <input
                    className={style.input}
                    type="text"
                    id="reportinput"
                  ></input>
                </div>
              </div>
              <div
                className={style.sendicon}
                onClick={() => {
                  this.postreport();
                }}
              >
                <AiOutlineSend />
              </div>
            </div>
          </div>
          <div className={style.unitlist}>
            {this.state.arr
              .slice(0)
              .reverse()
              .map((el) => (
                <div ket={el[0]} className={style.inputbox}>
                  <div className={style.inputbox2}>
                    <div className={style.mothunit}>
                      <div className={style.inputcontainer}>
                        <MdDateRange color="#306fe9" />
                        {el[3][8] +
                          el[3][9] +
                          "/" +
                          el[3][5] +
                          el[3][6] +
                          "/" +
                          el[3][0] +
                          el[3][1] +
                          el[3][2] +
                          el[3][3]}
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
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Report;
