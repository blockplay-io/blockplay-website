import React, { Component } from "react";
import { composeApi } from "@burstjs/core";
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
    this.state = {
      blockNow: 80000,
      first: {
        finished: false,
        active: false,
        price: 400,
        owner: "5671558278589810439",
        name: null,
        unConfTrans: [],
        time: 15,
        timeLeft: 1440
      }
    };
  }

  componentDidMount() {
    this._isMounted = true;
    //do calls for auction AT
    this.getCurrentBlock();
    this.atsUpdate();
    this.timerAuction();
  }

  componentWillUnmount() {
    this._isMounted = false;
    //clear all calls
    clearInterval(this.timerAuction);
  }
  atsUpdate = () =>
    this.ats.map(at =>
      this.api.contract
        .getContract(at)
        .then(this.setInitialAuctions, this.showError)
    );

  timerAuction = () =>
    setInterval(() => {
      this.getCurrentBlock();
      this.atsUpdate(this.ats, this.api);
    }, 5000);

  getCurrentBlock = () => {
    this.api.network.getBlockchainStatus().then(this.setBlock, this.showError);
  };

  setBlock = value => {
    if (this._isMounted) {
      this.setState({ blockNow: value.numberOfBlocks - 1 }); //this counts genesis block, maybe
    }
  };

  setInitialAuctions = value => {
    //const helper = new ContractHelper(value);

    let copyState = { ...this.state };
    switch (value.at) {
      case this.ats[0]:         //I left this for easy ading more auctions
          this.api.account      //looks for unconf trans, if transaction >== to price, sets state active: true 
          .getUnconfirmedAccountTransactions(this.ats[0])
          .then(
            result => {
              copyState.first.unConfTrans = result.unconfirmedTransactions;
              let obove400 = result.unconfirmedTransactions.some(a => sumNQTStringToNumber(a.amountNQT) >= copyState.first.price)
              if(obove400 & this._isMounted){ copyState.first.active = true }
            }
          );
        if (copyState.first.timeLeft < 1) {
          copyState.first.finished = true;
        } 
         
        if (this.state.first.active & !this.state.first.finished) {
               
          this.api.account.getAccountTransactions(this.ats[0]).then(result => {
            if (result.transactions.length !== 0) {
              let above400 = [];
              above400 = result.transactions.reduce((total, amount) => {
                if ((sumNQTStringToNumber(amount.amountNQT) >= copyState.first.price) & (amount.type === 0)) {
                  total.push({
                    height: amount.height,
                    amount: amount.amountNQT,
                    sender: amount.sender
                  });
                }
                return total;
              }, []);
              console.log(above400)
              
              if (above400.length !== 0) {
                const max = above400.reduce((prev, current) =>
                  Number(prev.amount) > Number(current.amount) ? prev : current
                ); //finds biggest bid
                console.log(max)
                const auctionStartBlock = above400.reduce((prev, current) =>
                  prev.height < current.height ? prev : current
                ); //finds smallest height
                console.log(auctionStartBlock)
                let price = sumNQTStringToNumber(max.amount);
                let blocksFromCreation = copyState.blockNow - auctionStartBlock;
                copyState.first.timeLeft = copyState.first.time - blocksFromCreation;
                
                copyState.first.price = price;
                copyState.first.owner = max.sender;
                
              }
            }
          });
          this.api.account.getAccount(copyState.first.owner).then(result => {
            if (result.hasOwnProperty("name")) {
              return (copyState.first.name = result.name);
            }
            return (copyState.first.name = null);
          });

          if (this._isMounted) {
            this.setState({ copyState });
          }
        }
        break;
      
      default:
        if (this._isMounted) {
          this.setState({ copyState });
        }
    }
  };
  showError = () => {
    if (this._isMounted) {
      return this.setState({ error: true });
    }
  };
  render() {
    return (
      <React.Fragment>
        <First lang={this.props.lang} />
        <Auctions
          finished={this.state.first.finished}
          time={this.state.first.timeLeft}
          lang={this.props.lang}
          price={this.state.first.price}
          owner={this.state.first.owner}
          name={this.state.first.name}
          unConfTrans={this.state.first.unConfTrans}
          explorer={this.props.explorer}
          at={this.props.atsAuction[0]}
        />
        
        <Second lang={this.props.lang} />
      </React.Fragment>
    );
  }
}

export default Auction;
