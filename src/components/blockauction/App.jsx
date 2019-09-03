import React, { Component } from "react";
import { composeApi, ContractHelper } from "@burstjs/core";
import { sumNQTStringToNumber } from "@burstjs/util";
import First from "./first";
import Second from "./second";
import Auctions from "./auction";

class Auction extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.api = composeApi(this.props.apiSettings);
    this.ats = this.props.atsAuction;
    this.state = {};
  }

  componentDidMount() {
    this._isMounted = true;
    //do calls for auction AT
  }

  componentWillUnmount() {
    this._isMounted = false;
    //clear all calls
  }

  render() {
    return (
      <React.Fragment>
        <First lang={this.props.lang} />
        <Auctions
          lang={this.props.lang}
          explorer={this.props.explorer}
          at={this.props.atsAuction}
        />
        <Second lang={this.props.lang} />
      </React.Fragment>
    );
  }
}

export default Auction;
