import React, { Component } from "react";
import axios from "axios";
import style from "./payment.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsImageFill } from "react-icons/bs";
class Payment extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state.data = this.props.data;
    this.billstatus = "";
    this.state.roomprice = "";
    this.state.eachprice = "";
    this.convert = this.convert.bind(this);
    this.state.filesarr = "";
    this.state.preview = "";
  }

  fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  async convert(file) {
    if (!file) {
      this.setState({ preview: "" });
      return;
    }
    this.fileToDataUri(file).then((dataUri) => {
      this.setState({ preview: dataUri });
    });

    var reader = new FileReader();
    await reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({ filesarr: reader.result });
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
    await this.setState({ filesarr: file });
    await this.setState({ preview: file });
  }
  async queryeachprice() {
    var res = await axios.get(
      "http://cs-mansion.thddns.net:9991/geteachprice/"
    );
    await this.setState({ eachprice: res.data[res.data.length - 1] });
  }
  async querroomprice() {
    var res = await axios.get(
      "http://cs-mansion.thddns.net:9991/getroomprice/" + this.state.data[0]
    );
    await this.setState({ roomprice: res.data[res.data.length - 1] });
  }
  async querystate() {
    var res = await axios.get(
      "http://cs-mansion.thddns.net:9991/billstatus/" +
        String(this.state.data[7])
    );
    await this.setState({ billstatus: res.data[0][1] });
  }
  componentDidMount() {
    this.queryeachprice();
    this.querroomprice();
    this.querystate();
  }

  render() {
    return (
      <div className={style.page}>
        <div className={style.background}>
          <div className={style.container}>
            {(this.state.data[7] === 1 || this.state.data[7] === 4) ? (
              <div>
                <div style={{ display: "flex", width: "100%" }}>
                <div className={style.header}>{this.state.billstatus}</div>
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
                  src={
                    "https://promptpay.io/0614077850/" +
                    this.state.data[6] +
                    ".png"
                  }
                  alt="QR"
                />
                {this.state.filesarr !== "" && (
                  <div id="imgshow" className={style.imgshow}>
                    <div style={{ width: "95%" }}>
                      <img src={this.state.preview} alt="" width="95%" />
                    </div>
                  </div>
                )}
                <div className={style.Footnote}>
                  <div className={style.MenuSelect}>
                    <div className={style.imageupload}>
                      <div
                        className={style.imageuploadicon}
                        onClick={() => {
                          document.getElementById("imginput").click();
                        }}
                      >
                        <b className={style.imageuploadlabel}>เพิ่มสื่อ</b>
                        <BsImageFill className={style.ImageIcon} />
                      </div>
                      <input
                        id="imginput"
                        style={{ display: "none" }}
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          this.convert(event.target.files[0] || null);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div
                      className={style.PostButton}
                      onClick={() => {
                        this.props.postSubmit({
                          RoomID: this.state.data[0],
                          Date: this.state.data[1],
                          file: String(this.state.filesarr)
                        });
                      }}
                    >
                      <b style={{ margin: "0 auto" }}>โพสต์</b>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", width: "100%" }}>
                  <div className={style.header}>{this.state.billstatus}</div>
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
                <img src={this.state.data[8]} alt="Slip" width="300"/>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
