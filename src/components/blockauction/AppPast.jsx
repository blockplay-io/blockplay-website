import React, { Component } from "react";
import { composeApi } from "@burstjs/core";
import First from "./first";
import Second from "./second";
import AuctionsFirst from "./auctionFirst";
import AuctionsSecond from "./auctionSecond";
import AuctionsMug from "./auctionMug";
import AuctionCoin from "./auctionCoin";

//This reuse auctions code, data "hardcoded" in constants, this only gets uptodate names

class AuctionPast extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.api = composeApi(this.props.apiSettings);
    this.ats = this.props.atsAuction;
    this.state = {
      names: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    //do calls for auction AT
    this.setNames();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setNames = () => {
    let copyState = { ...this.state };
    this.ats.map((at, i) =>
      this.api.account
        .getAccount(at.owner)
        .then(result => {
          if (result.hasOwnProperty("name")) {
            copyState.names[i] = result.name;
          } else {
            copyState.names[i] = null;
          }
        })
        .then(() => {
          if (this._isMounted) {
            this.setState({ copyState });
          }
        })
    );
  };

  render() {
    return (
      <React.Fragment>
        <First lang={this.props.lang} />
        <AuctionsFirst
          active={false}
          finished={true}
          lang={this.props.lang}
          price={this.props.atsAuction[0].price}
          owner={this.props.atsAuction[0].owner}
          name={this.state.names[0]}
          explorer={this.props.explorer}
          at={this.props.atsAuction[0].at}
        />
        <AuctionsSecond
          active={false}
          finished={true}
          lang={this.props.lang}
          price={this.props.atsAuction[1].price}
          owner={this.props.atsAuction[1].owner}
          name={this.state.names[1]}
          explorer={this.props.explorer}
          at={this.props.atsAuction[1].at}
        />
        <AuctionsMug
          active={false}
          finished={true}
          lang={this.props.lang}
          price={this.props.atsAuction[2].price}
          owner={this.props.atsAuction[2].owner}
          name={this.state.names[2]}
          explorer={this.props.explorer}
          at={this.props.atsAuction[2].at}
        />
        <AuctionsSecond
          active={false}
          finished={true}
          lang={this.props.lang}
          price={this.props.atsAuction[3].price}
          owner={this.props.atsAuction[3].owner}
          name={this.state.names[3]}
          explorer={this.props.explorer}
          at={this.props.atsAuction[3].at}
        />
        <AuctionsSecond
          active={false}
          finished={true}
          lang={this.props.lang}
          price={this.props.atsAuction[4].price}
          owner={this.props.atsAuction[4].owner}
          name={this.state.names[4]}
          explorer={this.props.explorer}
          at={this.props.atsAuction[4].at}
        />
        <AuctionsSecond
          active={false}
          finished={true}
          lang={this.props.lang}
          price={this.props.atsAuction[5].price}
          owner={this.props.atsAuction[5].owner}
          name={this.state.names[5]}
          explorer={this.props.explorer}
          at={this.props.atsAuction[5].at}
        />
        <AuctionCoin
          active={false}
          finished={true}
          lang={this.props.lang}
          price={this.props.atsAuction[6].price}
          owner={this.props.atsAuction[6].owner}
          name={this.state.names[6]}
          explorer={this.props.explorer}
          at={this.props.atsAuction[6].at}
        />
         <AuctionsSecond
          active={false}
          finished={true}
          lang={this.props.lang}
          price={this.props.atsAuction[7].price}
          owner={this.props.atsAuction[7].owner}
          name={this.state.names[7]}
          explorer={this.props.explorer}
          at={this.props.atsAuction[7].at}
        />
           <AuctionCoin
          active={false}
          finished={true}
          lang={this.props.lang}
          price={this.props.atsAuction[8].price}
          owner={this.props.atsAuction[8].owner}
          name={this.state.names[8]}
          explorer={this.props.explorer}
          at={this.props.atsAuction[8].at}
        />
        <Second lang={this.props.lang} />
      </React.Fragment>
    );
  }
}

export default AuctionPast;
