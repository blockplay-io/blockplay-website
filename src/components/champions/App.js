import React, { Component } from "react";
import { composeApi, ContractHelper } from "@burstjs/core";
import { sumNQTStringToNumber } from "@burstjs/util";

import First from "./first";
import Second from "./second";
import Champ from "./thirdChamp";
import Event from "./eventLucky";

import imgHeavy from "./data/heavy-d.jpg";
import imgMiddle from "./data/middle-d.jpg";
import imgLight from "./data/light-e.jpg";
import { creator } from "../../constants/const";

//const apiSettings = new ApiSettings(NODE, "burst");

class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.api = composeApi(this.props.apiSettings);
    this.ats = this.props.ats;
    this.state = {
      fun: false,
      lang: "eng",
      curBlock: 5500,
      owners: [],
      error: false,
      defender: {
        heavy: {
          heavy: "",
          name: null,
          fighting: false,
          unConfTrans: [],
          ownersChain: []
        },
        cruis: {
          cruis: "",
          name: null,
          fighting: false,
          unConfTrans: [],
          ownersChain: []
        },
        middle: {
          middle: "",
          name: null,
          fighting: false,
          unConfTrans: [],
          ownersChain: []
        },
        welter: {
          welter: "",
          name: null,
          fighting: false,
          unConfTrans: [],
          ownersChain: []
        },
        light: {
          light: "",
          name: null,
          fighting: false,
          unConfTrans: [],
          ownersChain: []
        }
      }
    };
  }

  componentDidMount() {
    this._isMounted = true;

    this.atsUpdate();
    this.updateOwnersChain();
    this.timerFighting();
    this.timerList();

    //this.updateLoop()
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.timerFighting);
    clearInterval(this.timerList);
  }

  atsUpdate = () =>
    this.ats.map(at =>
      this.api.contract
        .getContract(at)
        .then(this.setInitialDefendrs, this.showError)
    );

  timerFighting = () =>
    setInterval(() => {
      this.atsUpdate(this.ats, this.api);
    }, 5000);

  timerList = () =>
    setInterval(() => {
      this.updateOwnersChain();
    }, 20000);

  updateOwnersChain = () => {
    var i = 0;
    this.ats.forEach(
      at =>
        this.api.account
          .getAccountTransactions(at)
          .then(this.setOwnersChain.bind(null, i++), this.showError) //JJos method better then mine:)
    );
  };

  setOwnersChain = (c, value) => {
    let victories = 1;
    let dict = {};

    for (let i = 0; i < value.transactions.length; i++) {
      var tri = value.transactions[i];
      //console.log(tri);
      if (
        tri.type === 22 &&
        tri.amountNQT !== "0" &&
        tri.recipient !== creator
      ) {
        /* var amount = parseInt(
            tri.amountNQT.substring(0, tri.amountNQT.length - 8)
          );*/
        victories = 1;

        if (dict[tri.recipientRS] != null) {
          victories += dict[tri.recipientRS];
        }
        dict[tri.recipientRS] = victories;
      }
    }
    // Sort and show the holding time
    var items = Object.keys(dict).map(function(key) {
      return [key, dict[key]];
    });
    
    // Sort the array based on the second element
    items.sort(function(first, second) {
      return second[1] - first[1];
    });
    let champList = "";
    for (let i = 0; i < items.length; i++) {
      if (i > 0) champList += " | ";
      champList +=
        String(i + 1) +
        ". " +
        items[i][0] +
        " (" +
        items[i][1] +
        (items[i][1] === 1
          ? this.props.lang === "eng"
            ? " victory)"
            : "胜利)"
          : this.props.lang === "eng"
          ? " victories)"
          : "胜利)");
    }
    let copyState = { ...this.state }; //this can be redone
    if (c === 0 && this._isMounted) {
      copyState.defender.heavy.ownersChain = champList;
      this.setState({ copyState });
    }
    if (c === 1 && this._isMounted) {
      copyState.defender.cruis.ownersChain = champList;
      this.setState({ copyState });
    }
    if (c === 2 && this._isMounted) {
      copyState.defender.middle.ownersChain = champList;
      this.setState({ copyState });
    }
    if (c === 3 && this._isMounted) {
      copyState.defender.welter.ownersChain = champList;
      this.setState({ copyState });
    }
    if (c === 4 && this._isMounted) {
      copyState.defender.light.ownersChain = champList;
      this.setState({ copyState });
    }
  };

  setInitialDefendrs = value => {
    const helper = new ContractHelper(value);
    const owner = helper.getVariableAsDecimal(1);
    let copyState = { ...this.state };
    switch (value.at) {
      case this.ats[0]:
        copyState.defender.heavy.heavy = owner;
        this.api.account.getAccount(owner).then( 
          result => result.name !== undefined ?
            copyState.defender.heavy.name = result.name : copyState.defender.heavy.name = null
       )
        var balance = sumNQTStringToNumber(value.balanceNQT);
        if (balance > 30) {
          copyState.defender.heavy.fighting = true;
        } else {
          copyState.defender.heavy.fighting = false;
        }
        this.api.account
          .getUnconfirmedAccountTransactions(this.ats[0])
          .then(
            result =>
              (copyState.defender.heavy.unConfTrans =
                result.unconfirmedTransactions)
          );
        if (this._isMounted) {
          this.setState({ copyState });
        }

        break;
      case this.ats[1]:
        copyState.defender.cruis.cruis = owner;
        this.api.account.getAccount(owner).then( 
          result => result.name !== undefined ?
            copyState.defender.cruis.name = result.name : copyState.defender.cruis.name = null
       )
        balance = sumNQTStringToNumber(value.balanceNQT);
        if (balance > 30) {
          copyState.defender.cruis.fighting = true;
        } else {
          copyState.defender.cruis.fighting = false;
        }
        this.api.account
          .getUnconfirmedAccountTransactions(this.ats[1])
          .then(
            result =>
              (copyState.defender.cruis.unConfTrans =
                result.unconfirmedTransactions)
          );
        if (this._isMounted) {
          this.setState({ copyState });
        }
        break;
      case this.ats[2]:
        copyState.defender.middle.middle = owner;
        this.api.account.getAccount(owner).then( 
          result => result.name !== undefined ?
            copyState.defender.middle.name = result.name : copyState.defender.middle.name = null
       )
        balance = sumNQTStringToNumber(value.balanceNQT);
        if (balance > 30) {
          copyState.defender.middle.fighting = true;
        } else {
          copyState.defender.middle.fighting = false;
        }
        this.api.account
          .getUnconfirmedAccountTransactions(this.ats[2])
          .then(
            result =>
              (copyState.defender.middle.unConfTrans =
                result.unconfirmedTransactions)
          );
        if (this._isMounted) {
          this.setState({ copyState });
        }
        break;
      case this.ats[3]:
        copyState.defender.welter.welter = owner;
        this.api.account.getAccount(owner).then( 
          result => result.name !== undefined ?
            copyState.defender.welter.name = result.name : copyState.defender.welter.name = null
       )
        balance = sumNQTStringToNumber(value.balanceNQT);
        if (balance > 30) {
          copyState.defender.welter.fighting = true;
        } else {
          copyState.defender.welter.fighting = false;
        }

        this.api.account
          .getUnconfirmedAccountTransactions(this.ats[3])
          .then(
            result =>
              (copyState.defender.welter.unConfTrans =
                result.unconfirmedTransactions)
          );
        if (this._isMounted) {
          this.setState({ copyState });
        }
        break;
      case this.ats[4]:
        copyState.defender.light.light = owner;
        this.api.account.getAccount(owner).then( 
          result => result.name !== undefined ?
            copyState.defender.light.name = result.name : copyState.defender.light.name = null
       )
        balance = sumNQTStringToNumber(value.balanceNQT);
        if (balance > 30) {
          copyState.defender.light.fighting = true;
        } else {
          copyState.defender.light.fighting = false;
        }
        this.api.account
          .getUnconfirmedAccountTransactions(this.ats[4])
          .then(
            result =>
              (copyState.defender.light.unConfTrans =
                result.unconfirmedTransactions)
          );
        if (this._isMounted) {
          this.setState({ copyState });
        }
        break;
      default:
        if (this._isMounted) {
          this.setState({ copyState });
        }
    }
  };

  // successBlock = value => this.setState({ curBlock: value.numberOfBlocks });
  showError = () => {
    if (this._isMounted) {
      return this.setState({ error: true });
    }
  };
  render() {
    const { heavy, cruis, middle, welter, light } = this.state.defender;
    return (
      <React.Fragment>
        <First lang={this.props.lang} fun={this.props.fun} />
       <Event fun={false} />
        <Champ
          lang={this.props.lang}
          background={imgHeavy}
          name={heavy.name}
          title={
            this.props.lang === "eng"
              ? "HEAVYWEIGHT (20'000)"
              : "重量级 (20'000)"
          }
          atAddress={this.ats[0]}
          defending={heavy.heavy}
          fighting={heavy.fighting}
          unConfTrans={heavy.unConfTrans}
          ownersList={heavy.ownersChain}
          weight={20000}
          fun={this.props.fun}
          explorer={this.props.explorer}
        />
        <Champ
          lang={this.props.lang}
          name={cruis.name}
          title={
            this.props.lang === "eng"
              ? "CRUISERWEIGHT (10'000)"
              : "次重量级 (10'000)"
          }
          atAddress={this.ats[1]}
          defending={cruis.cruis}
          fighting={cruis.fighting}
          unConfTrans={cruis.unConfTrans}
          ownersList={cruis.ownersChain}
          weight={10000}
          fun={this.props.fun}
          explorer={this.props.explorer}
        />
        <Champ
          lang={this.props.lang}
          name={middle.name}
          background={imgMiddle}
          title={
            this.props.lang === "eng"
              ? "MIDDLEWEIGHT (5'000)"
              : "中量级 (5'000)"
          }
          atAddress={this.ats[2]}
          defending={middle.middle}
          fighting={middle.fighting}
          unConfTrans={middle.unConfTrans}
          ownersList={middle.ownersChain}
          weight={5000}
          fun={this.props.fun}
          explorer={this.props.explorer}
        />

        <Champ
          lang={this.props.lang}
          name={welter.name}
          title={
            this.props.lang === "eng"
              ? "WELTERWEIGHT (2'000)"
              : "次中量级 (2'000)"
          }
          atAddress={this.ats[3]}
          defending={welter.welter}
          fighting={welter.fighting}
          unConfTrans={welter.unConfTrans}
          ownersList={welter.ownersChain}
          weight={2000}
          fun={this.props.fun}
          explorer={this.props.explorer}
        />
        <Champ
          lang={this.props.lang}
          name={light.name}
          background={imgLight}
          title={
            this.props.lang === "eng" ? "LIGHTWEIGHT (1'000)" : "轻量级 (1'000)"
          }
          atAddress={this.ats[4]}
          defending={light.light}
          fighting={light.fighting}
          unConfTrans={light.unConfTrans}
          ownersList={light.ownersChain}
          weight={1000}
          fun={this.props.fun}
          explorer={this.props.explorer}
        />
         <Second lang={this.props.lang} />
      </React.Fragment>
    );
  }
}

export default App;
