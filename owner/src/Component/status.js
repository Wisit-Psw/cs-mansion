import React, { Component } from "react";
import axios from "axios";

class Status extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state.status = ''
  }
  async querystate() {
    var res = await axios.get(
      "http://cs-mansion.thddns.net:9991/billstatus/" +
        this.props.status
    )
    this.setState({ status: res.data[0][1] });
  }
  componentDidMount(){
    this.querystate();
  }
  render() {
    return (
      <div >
        {this.state.status||'กำลังโหลด'}
      </div>
    );
  }
}

export default Status;
