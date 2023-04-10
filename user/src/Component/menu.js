import React, { Component } from "react";
import { Link } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { IoWaterOutline, IoWater } from "react-icons/io5";
import { HiDocumentReport, HiOutlineDocumentReport } from "react-icons/hi";
import { FaFileInvoice, FaUser } from "react-icons/fa";
import { TbFileInvoice, TbUser } from "react-icons/tb";
// import { FaFileInvoiceDollar,FaUser } from 'react-icons/fa';
// import style from "./NavBar.module.css"
// import "./NavBar.css"
import style from "./menu.module.css";
class Menu extends Component {
  state = { username: "", password: "" };
  constructor(props) {
    super(props);
    this.state = this.props.propState;
  }

  menurender() {
    const path = window.location.pathname;
    const menu = createRoot(document.getElementById("menu"));
    const element = (
      <div>
        <div
          className={style.containermenu}
        >
          <Link to={"/"} onClick={this.menurender}>
            {path === "/" ? (
              <AiFillHome className={style.menubutton_icon_selected} />
            ) : (
              <AiOutlineHome className={style.menubutton_icon} />
            )}
          </Link>
          <Link to={"/inputunit"} onClick={this.menurender}>
            {path === "/inputunit" ? (
              <IoWater className={style.menubutton_icon_selected} />
            ) : (
              <IoWaterOutline className={style.menubutton_icon} />
            )}
          </Link>
          <Link to={"/reportproblem"} onClick={this.menurender}>
            {path === "/reportproblem" ? (
              <HiDocumentReport className={style.menubutton_icon_selected} />
            ) : (
              <HiOutlineDocumentReport className={style.menubutton_icon} />
            )}
          </Link>
          <Link to={"/bill"} onClick={this.menurender}>
            {path === "/bill" ? (
              <FaFileInvoice className={style.menubutton_icon_selected} />
            ) : (
              <TbFileInvoice className={style.menubutton_icon} />
            )}
          </Link>
          <Link to={"/userinfo"} onClick={this.menurender}>
            {path === "/userinfo" ? (
              <FaUser className={style.menubutton_icon_selected} />
            ) : (
              <TbUser className={style.menubutton_icon} />
            )}
          </Link>
        </div>
      </div>
    );
    menu.render(element);
  }
  componentDidMount() {
    // this.menurender();
  }
  render() {
    const path = window.location.pathname;
    return (
      <div
        className={style.page}
        id="menu"
      >
        <div>
          <div className={style.containermenu}>
            <div style={{ width: "20%" }}>
              <Link to={"/"} onClick={this.menurender}>
                {path === "/" ? (
                  <AiFillHome className={style.menubutton_icon_selected} />
                ) : (
                  <AiOutlineHome className={style.menubutton_icon} />
                )}
              </Link>
              <div
                className={style.IconLabel
                }
              >
                <b
                  className={
                    path === "/"
                      ? style.IconLabelSelece
                      : style.IconLabelNoneSelect
                  }
                >
                  หน้าหลัก
                </b>
              </div>
            </div>
            <div style={{ width: "20%" }}>
              <Link to={"/bill"} onClick={this.menurender}>
                {path === "/bill" ? (
                  <FaFileInvoice className={style.menubutton_icon_selected} />
                ) : (
                  <TbFileInvoice className={style.menubutton_icon} />
                )}
              </Link>
              <div
                className={style.IconLabel
                }
              >
                <b
                  className={
                    path === "/bill"
                      ? style.IconLabelSelece
                      : style.IconLabelNoneSelect
                  }
                >
                  บิล
                </b>
              </div>
            </div>
            <div style={{ width: "20%" }}>
              <Link to={"/report"} onClick={this.menurender}>
                {path === "/report" ? (
                  <HiDocumentReport
                    className={style.menubutton_icon_selected}
                  />
                ) : (
                  <HiOutlineDocumentReport className={style.menubutton_icon} />
                )}
              </Link>
              <div
                className={style.IconLabel
                }
              >
                <b
                  className={
                    path === "/report"
                      ? style.IconLabelSelece
                      : style.IconLabelNoneSelect
                  }
                >
                  รายงาน
                </b>
              </div>
            </div>
            
            <div style={{ width: "20%" }}>
              <Link to={"/userinfo"} onClick={this.menurender}>
                {path === "/userinfo" ? (
                  <FaUser className={style.menubutton_icon_selected} />
                ) : (
                  <TbUser className={style.menubutton_icon} />
                )}
              </Link>
              <div
                className={style.IconLabel
                }
              >
                <b
                  className={
                    path === "/userinfo"
                      ? style.IconLabelSelece
                      : style.IconLabelNoneSelect
                  }
                >
                  ฉัน
                </b>
              </div>
            </div>
          </div>
          {/* <div className={style.containermenu}>
                
              </div> */}
        </div>
      </div>
    );
  }
}

export default Menu;
