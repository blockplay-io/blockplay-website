import React, { Component } from "react";
import { composeApi } from "@burstjs/core";
import { sumNQTStringToNumber } from "@burstjs/util";
import First from "./first";
import Second from "./second";
import AuctionsFirst from "./auctionFirst";
import AuctionsSecond from "./auctionSecond";
import AuctionsMug from "./auctionMug";


class AuctionPast extends Component {
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
        time: 180,
        timeLeft: 180,
        error: false
      },
      second: {
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
      },
      third: {  //mug
        finished: false,
        active: false,
        startTimer: false,
        price: 1200,
        owner: "2726459462890839466",
        name: null,
        unConfTrans: [],
        time: 720,
        timeLeft: 720,
        error: false
      },
      fourth: {
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
      },
      five: {
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
            let obove400 = result.unconfirmedTransactions.some(
              a => sumNQTStringToNumber(a.amountNQT) >= 400
            );
            if (obove400 & this._isMounted) {
              copyState.first.active = true;
            }
            if (this._isMounted) {
              this.setState({ copyState });
            }
          });

        if (!this.state.first.finished) {
          let copyState = { ...this.state };
          this.api.account.getAccountTransactions(this.ats[0]).then(result => {
            if (result.transactions.length !== 0) {
              let above400 = [];
              above400 = result.transactions.reduce((total, amount) => {
                if (
                  (sumNQTStringToNumber(amount.amountNQT) >= 400) &
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

              if (above400.length !== 0) {
                copyState.first.startTimer = true;
                const max = above400.reduce((prev, current) =>
                  Number(prev.amount) > Number(current.amount) ? prev : current
                ); //finds biggest bid

                const auctionStartBlock = above400.reduce((prev, current) =>
                  prev.height < current.height ? prev : current
                ); //finds smallest height

                let price = sumNQTStringToNumber(max.amount);
                let blocksFromCreation =
                  copyState.blockNow - auctionStartBlock.height + 1;
                copyState.first.timeLeft =
                  copyState.first.time - blocksFromCreation;
                if (copyState.first.timeLeft < 1) {
                  copyState.first.finished = true;
                  copyState.first.startTimer = false;
                }
                copyState.first.price = price;
                copyState.first.owner = max.sender;
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
          let obove400 = result.unconfirmedTransactions.some(
            a => sumNQTStringToNumber(a.amountNQT) >= 400
          );
          if (obove400 & this._isMounted) {
            copyState.second.active = true;
          }
          if (this._isMounted) {
            this.setState({ copyState });
          }
        });

      if (!this.state.first.finished) {
        let copyState = { ...this.state };
        this.api.account.getAccountTransactions(this.ats[1]).then(result => {
          if (result.transactions.length !== 0) {
            let above400 = [];
            above400 = result.transactions.reduce((total, amount) => {
              if (
                (sumNQTStringToNumber(amount.amountNQT) >= 400) &
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

            if (above400.length !== 0) {
              copyState.second.startTimer = true;
              const max = above400.reduce((prev, current) =>
                Number(prev.amount) > Number(current.amount) ? prev : current
              ); //finds biggest bid

              const auctionStartBlock = above400.reduce((prev, current) =>
                prev.height < current.height ? prev : current
              ); //finds smallest height

              let price = sumNQTStringToNumber(max.amount);
              let blocksFromCreation =
                copyState.blockNow - auctionStartBlock.height + 1;
              copyState.second.timeLeft =
                copyState.second.time - blocksFromCreation;
              if (copyState.second.timeLeft < 1) {
                copyState.second.finished = true;
                copyState.second.startTimer = false;
              }
              copyState.second.price = price;
              copyState.second.owner = max.sender;
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
      case this.ats[2]: //I left this for easy ading more auctions
      this.api.account //looks for unconf trans, if transaction >== to price, sets state active: true
        .getUnconfirmedAccountTransactions(this.ats[2])
        .then(result => {
          let copyState = { ...this.state };
          copyState.third.unConfTrans = result.unconfirmedTransactions;
          let obove400 = result.unconfirmedTransactions.some(
            a => sumNQTStringToNumber(a.amountNQT) >= 1200
          );
          if (obove400 & this._isMounted) {
            copyState.third.active = true;
          }
          if (this._isMounted) {
            this.setState({ copyState });
          }
        });

      if (!this.state.third.finished) {
        let copyState = { ...this.state };
        this.api.account.getAccountTransactions(this.ats[2]).then(result => {
          if (result.transactions.length !== 0) {
            //console.log(result)
            let above400 = [];
            above400 = result.transactions.reduce((total, amount) => {
              if (
                (sumNQTStringToNumber(amount.amountNQT) >= 1200) &
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

            if (above400.length !== 0) {
              copyState.third.startTimer = true;
              const max = above400.reduce((prev, current) =>
                Number(prev.amount) > Number(current.amount) ? prev : current
              ); //finds biggest bid

              const auctionStartBlock = above400.reduce((prev, current) =>
                prev.height < current.height ? prev : current
              ); //finds smallest height

              let price = sumNQTStringToNumber(max.amount);
              let blocksFromCreation =
                copyState.blockNow - auctionStartBlock.height + 1;
              copyState.third.timeLeft =
                copyState.third.time - blocksFromCreation;
              if (copyState.third.timeLeft < 1) {
                copyState.third.finished = true;
                copyState.third.startTimer = false;
              }
              copyState.third.price = price;
              copyState.third.owner = max.sender;
              if (this._isMounted) {
                this.setState({ copyState });
              }
            }
          }
        });
      }

      this.api.account.getAccount(this.state.third.owner).then(result => {
        let copyState = { ...this.state };
        if (result.hasOwnProperty("name")) {
          copyState.third.name = result.name;
        } else {
          copyState.third.name = null;
        }

        if (this._isMounted) {
          this.setState({ copyState });
        }
      });

      break;
      case this.ats[3]: //I left this for easy ading more auctions
      this.api.account //looks for unconf trans, if transaction >== to price, sets state active: true
        .getUnconfirmedAccountTransactions(this.ats[3])
        .then(result => {
          let copyState = { ...this.state };
          copyState.fourth.unConfTrans = result.unconfirmedTransactions;
          let obove400 = result.unconfirmedTransactions.some(
            a => sumNQTStringToNumber(a.amountNQT) >= 400
          );
          if (obove400 & this._isMounted) {
            copyState.fourth.active = true;
          }
          if (this._isMounted) {
            this.setState({ copyState });
          }
        });

      if (!this.state.fourth.finished) {
        let copyState = { ...this.state };
        this.api.account.getAccountTransactions(this.ats[3]).then(result => {
          if (result.transactions.length !== 0) {
            let above400 = [];
            above400 = result.transactions.reduce((total, amount) => {
              if (
                (sumNQTStringToNumber(amount.amountNQT) >= 400) &
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

            if (above400.length !== 0) {
              copyState.fourth.startTimer = true;
              const max = above400.reduce((prev, current) =>
                Number(prev.amount) > Number(current.amount) ? prev : current
              ); //finds biggest bid

              const auctionStartBlock = above400.reduce((prev, current) =>
                prev.height < current.height ? prev : current
              ); //finds smallest height

              let price = sumNQTStringToNumber(max.amount);
              let blocksFromCreation =
                copyState.blockNow - auctionStartBlock.height + 1;
              copyState.fourth.timeLeft =
                copyState.fourth.time - blocksFromCreation;
              if (copyState.fourth.timeLeft < 1) {
                copyState.fourth.finished = true;
                copyState.fourth.startTimer = false;
              }
              copyState.fourth.price = price;
              copyState.fourth.owner = max.sender;
              if (this._isMounted) {
                this.setState({ copyState });
              }
            }
          }
        });
      }

      this.api.account.getAccount(this.state.fourth.owner).then(result => {
        let copyState = { ...this.state };
        if (result.hasOwnProperty("name")) {
          copyState.fourth.name = result.name;
        } else {
          copyState.fourth.name = null;
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
      
        <AuctionsFirst
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
        <AuctionsSecond
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
        <AuctionsMug
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
          <AuctionsSecond
          active={this.state.fourth.active}
          startTimer={this.state.fourth.startTimer}
          finished={this.state.fourth.finished}
          time={this.state.fourth.timeLeft}
          lang={this.props.lang}
          price={this.state.fourth.price}
          owner={this.state.fourth.owner}
          name={this.state.fourth.name}
          unConfTrans={this.state.fourth.unConfTrans}
          explorer={this.props.explorer}
          at={this.props.atsAuction[3]}
        />
          
        <Second lang={this.props.lang} />
      </React.Fragment>
    );
  }
}

export default AuctionPast;
