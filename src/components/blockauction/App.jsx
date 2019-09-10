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
        active: true,
        price: 400,
        owner: "5671558278589810439",
        name: null,
        unConfTrans: [],
        time: 15,
        timeLeft: 1440
      },
      second: {
        active: true,
        price: 400,
        owner: "5671558278589810439",
        name: null,
        unConfTrans: [],
        time: 1440,
        timeLeft: 1440
      },
      third: {
        active: true,
        price: 400,
        owner: "5671558278589810439",
        name: null,
        unConfTrans: [],
        time: 1440,
        timeLeft: 1440
      },
      fourth: {
        active: true,
        price: 400,
        owner: "5671558278589810439",
        name: null,
        unConfTrans: [],
        time: 1440,
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
      case this.ats[0]:
        if (this.state.first.active) {
          let blocksFromCreation = copyState.blockNow - value.creationBlock;
          copyState.first.timeLeft = copyState.first.time - blocksFromCreation;
          if (copyState.first.timeLeft < 1) {
            copyState.first.active = false;
          }
          this.api.account
            .getUnconfirmedAccountTransactions(this.ats[0])
            .then(
              result =>
                (copyState.first.unConfTrans = result.unconfirmedTransactions)
            );
          this.api.account.getAccountTransactions(this.ats[0]).then(result => {
            if (result.transactions.length !== 0) {
              let above400 = result.transactions.reduce((total, amount) => {
                if ((amount.amountNQT > 40000000000) & (amount.type === 0)) {
                  total.push({
                    amount: amount.amountNQT,
                    sender: amount.sender
                  });
                }
                return total;
              }, []);
              if (above400.length !== 0) {
                const max = above400.reduce((prev, current) =>
                  prev.amount > current.amount ? prev : current
                );
                let price = sumNQTStringToNumber(max.amount);
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
      case this.ats[1]:
        if (this.state.second.active) {
          copyState.second.timeLeft =
            copyState.second.time - (copyState.blockNow - value.creationBlock);
          if (copyState.second.timeLeft < 1) copyState.second.active = false;
          this.api.account
            .getUnconfirmedAccountTransactions(this.ats[1])
            .then(
              result =>
                (copyState.second.unConfTrans = result.unconfirmedTransactions)
            );
          this.api.account.getAccountTransactions(this.ats[1]).then(result => {
            if (result.transactions.length !== 0) {
              let above400 = result.transactions.reduce((total, amount) => {
                if ((amount.amountNQT > 40000000000) & (amount.type === 0)) {
                  total.push({
                    amount: amount.amountNQT,
                    sender: amount.sender
                  });
                }
                return total;
              }, []);
              if (above400.length !== 0) {
                const max = above400.reduce((prev, current) =>
                  prev.amount > current.amount ? prev : current
                );
                let price = sumNQTStringToNumber(max.amount);
                copyState.second.price = price;
                copyState.second.owner = max.sender;
              }
            }
          });
          this.api.account.getAccount(copyState.second.owner).then(result => {
            if (result.hasOwnProperty("name")) {
              return (copyState.second.name = result.name);
            }
            return (copyState.second.name = null);
          });

          if (this._isMounted) {
            this.setState({ copyState });
          }
        }
        break;
      case this.ats[2]:
        if (this.state.third.active) {
          copyState.third.timeLeft =
            copyState.third.time - (copyState.blockNow - value.creationBlock);
          if (copyState.third.timeLeft < 1) copyState.third.active = false;
          this.api.account
            .getUnconfirmedAccountTransactions(this.ats[2])
            .then(
              result =>
                (copyState.third.unConfTrans = result.unconfirmedTransactions)
            );
          this.api.account.getAccountTransactions(this.ats[2]).then(result => {
            if (result.transactions.length !== 0) {
              let above400 = result.transactions.reduce((total, amount) => {
                if ((amount.amountNQT > 40000000000) & (amount.type === 0)) {
                  total.push({
                    amount: amount.amountNQT,
                    sender: amount.sender
                  });
                }
                return total;
              }, []);
              if (above400.length !== 0) {
                const max = above400.reduce((prev, current) =>
                  prev.amount > current.amount ? prev : current
                );
                let price = sumNQTStringToNumber(max.amount);
                copyState.third.price = price;
                copyState.third.owner = max.sender;
              }
            }
          });
          this.api.account.getAccount(copyState.third.owner).then(result => {
            if (result.hasOwnProperty("name")) {
              return (copyState.third.name = result.name);
            }
            return (copyState.third.name = null);
          });
          if (this._isMounted) {
            this.setState({ copyState });
          }
        }
        break;
      case this.ats[3]:
        if (this.state.fourth.active) {
          copyState.fourth.timeLeft =
            copyState.fourth.time - (copyState.blockNow - value.creationBlock);
          if (copyState.fourth.timeLeft < 1) copyState.fourth.active = false;
          this.api.account
            .getUnconfirmedAccountTransactions(this.ats[3])
            .then(
              result =>
                (copyState.fourth.unConfTrans = result.unconfirmedTransactions)
            );
          this.api.account.getAccountTransactions(this.ats[3]).then(result => {
            if (result.transactions.length !== 0) {
              let above400 = result.transactions.reduce((total, amount) => {
                if ((amount.amountNQT > 40000000000) & (amount.type === 0)) {
                  total.push({
                    amount: amount.amountNQT,
                    sender: amount.sender
                  });
                }
                return total;
              }, []);
              if (above400.length !== 0) {
                const max = above400.reduce((prev, current) =>
                  prev.amount > current.amount ? prev : current
                );
                let price = sumNQTStringToNumber(max.amount);
                copyState.fourth.price = price;
                copyState.fourth.owner = max.sender;
              }
            }
          });
          this.api.account.getAccount(copyState.fourth.owner).then(result => {
            if (result.hasOwnProperty("name")) {
              return (copyState.fourth.name = result.name);
            }
            return (copyState.fourth.name = null);
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
          time={this.state.first.timeLeft}
          lang={this.props.lang}
          price={this.state.first.price}
          owner={this.state.first.owner}
          name={this.state.first.name}
          unConfTrans={this.state.first.unConfTrans}
          explorer={this.props.explorer}
          at={this.props.atsAuction[0]}
        />
        <Auctions
          time={this.state.second.timeLeft}
          lang={this.props.lang}
          price={this.state.second.price}
          owner={this.state.second.owner}
          name={this.state.second.name}
          unConfTrans={this.state.second.unConfTrans}
          explorer={this.props.explorer}
          at={this.props.atsAuction[1]}
        />
        <Auctions
          time={this.state.third.timeLeft}
          lang={this.props.lang}
          price={this.state.third.price}
          owner={this.state.third.owner}
          unConfTrans={this.state.third.unConfTrans}
          explorer={this.props.explorer}
          at={this.props.atsAuction[2]}
        />
        <Auctions
          time={this.state.fourth.timeLeft}
          lang={this.props.lang}
          price={this.state.fourth.price}
          owner={this.state.fourth.owner}
          unConfTrans={this.state.fourth.unConfTrans}
          explorer={this.props.explorer}
          at={this.props.atsAuction[3]}
        />
        <Second lang={this.props.lang} />
      </React.Fragment>
    );
  }
}

export default Auction;
