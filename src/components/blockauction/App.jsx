import React, { Component } from "react";
import { composeApi } from "@burstjs/core";
import { sumNQTStringToNumber } from "@burstjs/util";
import First from "./first";
import Second from "./second";
import Auctions from "./auction";
import AuctionCoin from "./auctionCoin";
import AuctionSticker from "./auctionSticker";

class Auction extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.api = composeApi(this.props.apiSettings);
    this.ats = this.props.atsAuction;
    this.state = {
      blockNow: 98687,
      first: {
        finished: false,
        active: false,
        startTimer: false,
        price: 500,
        owner: "399474066476911189",
        name: null,
        unConfTrans: [],
        time: 360,
        timeLeft: 360,
        error: false
      },
      second: {
        finished: false,
        active: false,
        startTimer: false,
        price: 1000,
        owner: "399474066476911189",
        name: null,
        unConfTrans: [],
        time: 360,
        timeLeft: 360,
        error: false
      },
      third: {
        finished: false,
        active: false,
        startTimer: false,
        price: 1500,
        owner: "11569639109100550231",
        name: null,
        unConfTrans: [],
        time: 2520,
        timeLeft: 2520,
        error: false
      }
    };
  }

  componentDidMount() {
    this._isMounted = true;
    //do calls for auction AT
    this.getCurrentBlock();
    this.atsUpdate();
    this.timerAuction(5000); //update timer, ms
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

  timerAuction = time =>
    setInterval(() => {
      this.getCurrentBlock();
      this.atsUpdate(this.ats, this.api);
    }, time);

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
            let copyState = { ...this.state.second };
            copyState.unConfTrans = result.unconfirmedTransactions;
            let obove22 = result.unconfirmedTransactions.some(
              a => sumNQTStringToNumber(a.amountNQT) >= 5
            );
            if (obove22 & this._isMounted & !copyState.finished) {
              copyState.startTimer = true;
            }
            if (this._isMounted) {
              this.setState({ second: copyState });
            }
          });
        if (!this.state.first.finished) {
          this.api.account.getAccountTransactions(this.ats[0]).then(result => {
            let copyState = { ...this.state.first };
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
                copyState.startTimer = true;
                const max = above.reduce((prev, current) =>
                  Number(prev.amount) > Number(current.amount) ? prev : current
                ); //finds biggest bid

                const auctionStartBlock = above.reduce((prev, current) =>
                  prev.height < current.height ? prev : current
                ); //finds smallest height

                let price =
                  sumNQTStringToNumber(max.amount) >= copyState.price
                    ? sumNQTStringToNumber(max.amount)
                    : copyState.price;
                let blocksFromCreation =
                  this.state.blockNow - auctionStartBlock.height;
                copyState.timeLeft = copyState.time - blocksFromCreation;
                if (copyState.timeLeft < 1) {
                  copyState.finished = true;
                  copyState.startTimer = false;
                }
                copyState.price = price; //seting new price
                if (sumNQTStringToNumber(max.amount) >= copyState.price) {
                  copyState.owner = max.sender;
                }
                if (this._isMounted) {
                  this.setState({ first: copyState });
                }
              }
            }
          });
        }

        this.api.account.getAccount(this.state.first.owner).then(result => {
          let copyState = { ...this.state.first };
          if (result.hasOwnProperty("name")) {
            copyState.name = result.name;
          } else {
            copyState.name = null;
          }

          if (this._isMounted) {
            this.setState({ first: copyState });
          }
        });

        break;
      case this.ats[1]: //I left this for easy ading more auctions
        this.api.account //looks for unconf trans, if transaction >== to price, sets state active: true
          .getUnconfirmedAccountTransactions(this.ats[1])
          .then(result => {
            let copyState = { ...this.state.second };
            copyState.unConfTrans = result.unconfirmedTransactions;
            let obove22 = result.unconfirmedTransactions.some(
              a => sumNQTStringToNumber(a.amountNQT) >= 5
            );
            if (obove22 & this._isMounted & !copyState.finished) {
              copyState.startTimer = true;
            }
            if (this._isMounted) {
              this.setState({ second: copyState });
            }
          });

        if (!this.state.second.finished) {
          let copyState = { ...this.state.second };
          this.api.account.getAccountTransactions(this.ats[1]).then(result => {
            if (result.transactions.length !== 0) {
              let above = [];
              above = result.transactions.reduce((total, amount) => {
                if (
                  (sumNQTStringToNumber(amount.amountNQT) >= copyState.price) &
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
                copyState.startTimer = true;
                const max = above.reduce((prev, current) =>
                  Number(prev.amount) > Number(current.amount) ? prev : current
                ); //finds biggest bid

                const auctionStartBlock = above.reduce((prev, current) =>
                  prev.height < current.height ? prev : current
                ); //finds smallest height

                let price =
                  sumNQTStringToNumber(max.amount) >= copyState.price
                    ? sumNQTStringToNumber(max.amount)
                    : copyState.price;
                let blocksFromCreation =
                  this.state.blockNow - auctionStartBlock.height;
                copyState.timeLeft = copyState.time - blocksFromCreation;
                if (copyState.timeLeft < 1) {
                  copyState.finished = true;
                  copyState.startTimer = false;
                }
                copyState.price = price;
                if (sumNQTStringToNumber(max.amount) >= copyState.price) {
                  copyState.owner = max.sender;
                }
              }
              if (this._isMounted) {
                this.setState({ second: copyState });
              }
            }
          });
        }

        this.api.account.getAccount(this.state.second.owner).then(result => {
          let copyState = { ...this.state.second };
          if (result.hasOwnProperty("name")) {
            copyState.name = result.name;
          } else {
            copyState.name = null;
          }

          if (this._isMounted) {
            this.setState({ second: copyState });
          }
        }); 

        break;
        case this.ats[2]: //I left this for easy ading more auctions
        this.api.account //looks for unconf trans, if transaction >== to price, sets state active: true
          .getUnconfirmedAccountTransactions(this.ats[2])
          .then(result => {
            let copyState = { ...this.state.third };
            copyState.unConfTrans = result.unconfirmedTransactions;
            let obove22 = result.unconfirmedTransactions.some(
              a => sumNQTStringToNumber(a.amountNQT) >= 5
            );
            if (obove22 & this._isMounted & !copyState.finished) {
              copyState.startTimer = true;
            }
            if (this._isMounted) {
              this.setState({ third: copyState });
            }
          });

        if (!this.state.third.finished) {
          let copyState = { ...this.state.third };
          this.api.account.getAccountTransactions(this.ats[2]).then(result => {
            if (result.transactions.length !== 0) {
              let above = [];
              above = result.transactions.reduce((total, amount) => {
                if (
                  (sumNQTStringToNumber(amount.amountNQT) >= copyState.price) &
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
                copyState.startTimer = true;
                const max = above.reduce((prev, current) =>
                  Number(prev.amount) > Number(current.amount) ? prev : current
                ); //finds biggest bid

                const auctionStartBlock = above.reduce((prev, current) =>
                  prev.height < current.height ? prev : current
                ); //finds smallest height

                let price =
                  sumNQTStringToNumber(max.amount) >= copyState.price
                    ? sumNQTStringToNumber(max.amount)
                    : copyState.price;
                let blocksFromCreation =
                  this.state.blockNow - auctionStartBlock.height;
                copyState.timeLeft = copyState.time - blocksFromCreation;
                if (copyState.timeLeft < 1) {
                  copyState.finished = true;
                  copyState.startTimer = false;
                }
                copyState.price = price;
                if (sumNQTStringToNumber(max.amount) >= copyState.price) {
                  copyState.owner = max.sender;
                }
              }
              if (this._isMounted) {
                this.setState({ third: copyState });
              }
            }
          });
        }

        this.api.account.getAccount(this.state.third.owner).then(result => {
          let copyState = { ...this.state.third };
          if (result.hasOwnProperty("name")) {
            copyState.name = result.name;
          } else {
            copyState.name = null;
          }

          if (this._isMounted) {
            this.setState({ third: copyState });
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
        <AuctionCoin
          active={this.state.second.active}
          startTimer={this.state.second.startTimer}
          finished={this.state.second.finished}
          time={this.state.second.timeLeft}
          lang={this.props.lang}
          price={this.state.second.price}
          owner={this.state.second.owner}
          name={this.state.second.name}
          unConfTrans={this.state.second.unConfTrans}
          explorer={this.props.explorer}
          at={this.props.atsAuction[1]}
        />
         <AuctionSticker
          active={this.state.third.active}
          startTimer={this.state.third.startTimer}
          finished={this.state.third.finished}
          time={this.state.third.timeLeft}
          lang={this.props.lang}
          price={this.state.third.price}
          owner={this.state.third.owner}
          name={this.state.third.name}
          unConfTrans={this.state.third.unConfTrans}
          explorer={this.props.explorer}
          at={this.props.atsAuction[2]}
        />
        <Second lang={this.props.lang} />
      </React.Fragment>
    );
  }
}

export default Auction;
