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
      blockNow: 663609,
      first: {
        finished: false,
        active: false,
        startTimer: false,
        price: 400,
        owner: "399474066476911189",
        name: null,
        unConfTrans: [],
        time: 360,
        timeLeft: 360,
        error: false
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
    switch (value.at) {
      case this.ats[0]: //I left this for easy ading more auctions
        this.api.account //looks for unconf trans, if transaction >== to price, sets state active: true
          .getUnconfirmedAccountTransactions(this.ats[0])
          .then(result => {
            let copyState = { ...this.state };
            copyState.first.unConfTrans = result.unconfirmedTransactions;
            let obove22 = result.unconfirmedTransactions.some(
              a => sumNQTStringToNumber(a.amountNQT) >= 22
            );
            if (obove22 & this._isMounted & !copyState.first.finished) {
              
              copyState.first.startTimer = true;
            }
            if (this._isMounted) {
              this.setState({ copyState });
            }
          });

        if (!this.state.first.finished) {
          let copyState = { ...this.state };
          this.api.account.getAccountTransactions(this.ats[0]).then(result => {
            if (result.transactions.length !== 0) {
              let above = [];
              above = result.transactions.reduce((total, amount) => {
                if (
                  (sumNQTStringToNumber(amount.amountNQT) >= 22) &
                  (amount.type === 0)
                ) {
                  total.push({
                    height: amount.height,
                    amount: amount.amountNQT,
                    sender: amount.sender
                  });
                }
                return total;
              }, []);
              //console.log("trans list", above400)

              if (above.length !== 0) {
                copyState.first.startTimer = true;
                const max = above.reduce((prev, current) =>
                  Number(prev.amount) > Number(current.amount) ? prev : current
                ); //finds biggest bid

                const auctionStartBlock = above.reduce((prev, current) =>
                  prev.height < current.height ? prev : current
                ); //finds smallest height

                let price = (sumNQTStringToNumber(max.amount) >= copyState.first.price? sumNQTStringToNumber(max.amount): copyState.first.price); 
                let blocksFromCreation =
                  copyState.blockNow - auctionStartBlock.height;
                copyState.first.timeLeft =
                  copyState.first.time - blocksFromCreation;
                if (copyState.first.timeLeft < 1) {
                  copyState.first.finished = true;
                  copyState.first.startTimer = false;
                }
                copyState.first.price = price;
                if (sumNQTStringToNumber(max.amount) >= copyState.first.price){
                  copyState.first.owner = max.sender;
                }
                
                if (this._isMounted) {
                  this.setState({ copyState });
                }
              }
            }
          });
        }

        this.api.account.getAccount(this.state.first.owner).then(result => {
          let copyState = { ...this.state };
          if (result.hasOwnProperty("name")) {
            copyState.first.name = result.name;
          } else {
            copyState.first.name = null;
          }

          if (this._isMounted) {
            this.setState({ copyState });
          }
        });

        break;
      case this.ats[1]: //I left this for easy ading more auctions
      this.api.account //looks for unconf trans, if transaction >== to price, sets state active: true
        .getUnconfirmedAccountTransactions(this.ats[1])
        .then(result => {
          let copyState = { ...this.state };
          copyState.second.unConfTrans = result.unconfirmedTransactions;
          let obove22 = result.unconfirmedTransactions.some(
            a => sumNQTStringToNumber(a.amountNQT) >= 22
          );
          if (obove22 & this._isMounted & !copyState.first.finished) {
            copyState.second.startTimer = true;
          }
          if (this._isMounted) {
            this.setState({ copyState });
          }
        });

      if (!this.state.first.finished) {
        let copyState = { ...this.state };
        this.api.account.getAccountTransactions(this.ats[1]).then(result => {
          if (result.transactions.length !== 0) {
            let above = [];
            above = result.transactions.reduce((total, amount) => {
              if (
                (sumNQTStringToNumber(amount.amountNQT) >= 22) &
                (amount.type === 0)
              ) {
                total.push({
                  height: amount.height,
                  amount: amount.amountNQT,
                  sender: amount.sender
                });
              }
              return total;
            }, []);
            //console.log("trans list", above400)

            if (above.length !== 0) {
              copyState.second.startTimer = true;
              const max = above.reduce((prev, current) =>
                Number(prev.amount) > Number(current.amount) ? prev : current
              ); //finds biggest bid

              const auctionStartBlock = above.reduce((prev, current) =>
                prev.height < current.height ? prev : current
              ); //finds smallest height

              let price = (sumNQTStringToNumber(max.amount) >= copyState.second.price? sumNQTStringToNumber(max.amount): copyState.second.price); 
              let blocksFromCreation =
                copyState.blockNow - auctionStartBlock.height;
              copyState.second.timeLeft =
                copyState.second.time - blocksFromCreation;
              if (copyState.second.timeLeft < 1) {
                copyState.second.finished = true;
                copyState.second.startTimer = false;
              }
              copyState.second.price = price;
              if (sumNQTStringToNumber(max.amount) >= copyState.second.price){
                copyState.second.owner = max.sender;
              }
              if (this._isMounted) {
                this.setState({ copyState });
              }
            }
          }
        });
      }

      this.api.account.getAccount(this.state.second.owner).then(result => {
        let copyState = { ...this.state };
        if (result.hasOwnProperty("name")) {
          copyState.second.name = result.name;
        } else {
          copyState.second.name = null;
        }

        if (this._isMounted) {
          this.setState({ copyState });
        }
      });

      break;
      default:
        console.log("No SC");
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
          active={this.state.first.active}
          startTimer={this.state.first.startTimer}
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
