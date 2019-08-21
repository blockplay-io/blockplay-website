import React, { Component } from "react";

import "../../data/bootstrap.min.css";

import First from "./first";
import Second from "./second";
import History from "./thirdHistory";
import Fourth from "./forthKohinoor";

import { composeApi, ApiSettings, ContractHelper } from "@burstjs/core";
import { NODE, at, creatorRS } from "./constants/const";

const apiSettings = new ApiSettings(NODE, "burst");
const api = composeApi(apiSettings);

class Kohinoor extends Component {
  _isMounted = false;
  state = {
    error: false,
    curBlock: 5000,
    chartLabels: [],
    chartValues: [],
    price: 500,
    owner: "3278233074628313816",
    ownerName: "",
    owners: [],
    topHoldersList: "",
    unConfTrans: [],
    unConf: ""
  };

  componentDidMount() {
    this._isMounted = true;
    this.updateLoop();
    this.upateOwnersChainLoop();
    this.timerLoop();
    this.timerOwnersChain();
    //this.updateLoop()
  }
  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.timerLoop);
    clearInterval(this.timerOwnersChain);
  }

  timerLoop = () =>
    setInterval(() => {
      this.updateLoop();
    }, 12000);

  timerOwnersChain = () =>
    setInterval(() => {
      this.upateOwnersChainLoop();
    }, 4 * 60000);

  updateLoop = () => {
    api.network.getBlockchainStatus().then(value => {
      if (this._isMounted) {
        this.setState({ curBlock: value.numberOfBlocks });
      }
    }, this.showError);
    api.contract.getContract(at).then(this.successContract, this.showError);
    //console.log("update loop trigered")
  };

  upateOwnersChainLoop = () => {
    api.account
      .getAccountTransactions(at)
      .then(this.updateOwnerChain, this.showError);
  };

  showError = () => this.setState({ error: true });
  //successBlock = value => this.setState({ curBlock: value.numberOfBlocks });

  successContract = value => {
    const helper = new ContractHelper(value);
    const newOwner = helper.getVariableAsDecimal(0);
    const priceStr = helper.getVariableAsDecimal(2);
    let newPrice = parseFloat(priceStr);
    newPrice = Math.ceil(newPrice / 100000000);
    //console.log(newOwner)

    let curOwner = this.state.owner;

    if (!newOwner.startsWith("0000000000") && newOwner !== curOwner) {
      curOwner = newOwner;

      api.account.getAccount(curOwner).then(this.updateOwner, this.showError);
    }

    const balance = parseInt(
      value.balanceNQT.substring(0, value.balanceNQT.length - 8)
    );
    if (balance >= newPrice && this._isMounted) {
      this.setState({
        unConf: "Transaction confirmed, ownership transfer being processed"
      });
    } else {
      // check for unconfirmed transactions
      api.account
        .getUnconfirmedAccountTransactions(at)
        .then(this.successUnconf);
    }

    if (this.state.prise !== newPrice && this._isMounted)
      this.setState({ price: newPrice });
  };

  updateOwner = value => {
    if (this._isMounted) {
      this.setState({ owner: value.account });
    }
    if (value !== undefined && this._isMounted)
      this.setState({ ownerName: value.name });

    //api.account.getAccount(value.account).then(successAccount.bind(null,-1)); i don't know what it does
  };

  successUnconf = value => {
    // list all previous owners
    // check for the most recent owner
    let copyState = "";
    for (let i = 0; i < value.unconfirmedTransactions.length; i++) {
      let tri = value.unconfirmedTransactions[i];
      if (tri.type === 0 && tri.recipient === at) {
        var amount = parseInt(
          tri.amountNQT.substring(0, tri.amountNQT.length - 8)
        );
        if (!isFinite(amount)) amount = 0;
        if (amount < this.state.price) continue;
        let fee = parseInt(tri.feeNQT.substring(0, tri.feeNQT.length - 5));
        fee = fee / 1000.0;

        if (copyState === "")
          copyState =
            "Pending transactions  | " +
            tri.senderRS +
            " (" +
            amount +
            "+" +
            fee +
            " BURST)";
      }
      if (this._isMounted) {
        this.setState({ unConf: copyState });
      }
    }

    if (
      copyState === "" ||
      copyState === "Transaction confirmed, ownership transfer being processed"
    )
      copyState = "No pending transactions";

    if (this._isMounted) {
      this.setState({ unConf: copyState });
    }
    //console.log(copyState)
  };

  /* successAccount = (i, value) => {
    if (value.name != null) {
      var account = "name" + value.account + "_" + i;
      var elem = document.getElementById(account);
      if (elem != null) elem.innerHTML = value.name + " ";
    }
  };*/
  updateOwnerChain = value => {
    // list all previous owners
    let owners = [...this.state.owners];
    let lastOwner = creatorRS;
    let lastTransfer = this.state.curBlock;
    let nblocks, nbuys;
    let dict = {};
    let dict2 = {};

    // check for the most recent owner
    for (let i = 0; i < value.transactions.length; i++) {
      let tri = value.transactions[i];
      //console.log(tri);
      if (tri.type === 22) {
        if (tri.attachment != null && tri.attachment.message.startsWith("59")) {
          //   owners = '<strong id="name' + tri.recipient +  "_" + -2 +'"></strong>' + tri.recipientRS;
          //api.account.getAccount(tri.recipient).then(this.successAccount.bind(null, -2));
          lastOwner = tri.recipientRS;
          break;
        }
      }
    }

    let chartLabels = [];
    let chartValues = [];
    let newState = [];
    for (let i = 0; i < value.transactions.length; i++) {
      let tri = value.transactions[i];
      if (tri.type === 22) {
        if (tri.attachment != null && tri.attachment.message.startsWith("4b")) {
          let amount = parseInt(
            tri.amountNQT.substring(0, tri.amountNQT.length - 8)
          );

          let ownersObject = { name: "", amount: 0, lostBlock: 0 };
          ownersObject.name = tri.recipientRS;
          ownersObject.lostBlock = tri.height;
          ownersObject.amount = amount;
          //console.log(ownersObject);
          newState.push(ownersObject);
          //var addressi ='<strong id="name' +tri.recipient + "_" + i +'"></strong>' + tri.recipientRS;
          let lostBlock = tri.height;
          //owners += " | " +   addressi + " (" + amount +" BURST" +", block " + lostBlock +")";
          //api.account.getAccount(tri.recipient).then(successAccount.bind(null, i));

          nblocks = lastTransfer - lostBlock;
          nbuys = 1;
          if (dict[lastOwner] != null) {
            nblocks += dict[lastOwner];
            nbuys += dict2[lastOwner];
          }
          dict[lastOwner] = nblocks;
          dict2[lastOwner] = nbuys;

          lastOwner = tri.recipientRS;
          lastTransfer = lostBlock;

          //chartLabels.unshift(tri.recipientRS);
          chartLabels.unshift(tri.height);
          chartValues.unshift(amount / 1000);
        }
      }
    }
    if (newState !== owners && this._isMounted) {
      this.setState({ owners: newState });
      this.setState({ chartLabels });
      this.setState({ chartValues });
    }

    const atCreation = value.creationBlock;
    nblocks = lastTransfer - atCreation;
    nbuys = 1;
    if (dict[lastOwner] !== null) {
      nblocks += dict[lastOwner];
      nbuys += dict2[lastOwner];
    }

    dict[lastOwner] = nblocks;
    dict2[lastOwner] = nbuys;

    // Sort and show the holding time
    var items = Object.keys(dict).map(function(key) {
      return [key, dict[key]];
    });
    // Sort the array based on the second element
    items.sort(function(first, second) {
      return second[1] - first[1];
    });
    let topHoldersList = "";
    for (let i = 0; i < items.length; i++) {
      if (i > 0) topHoldersList += " | ";
      topHoldersList +=
        i +
        1 +
        ". " +
        items[i][0] +
        " (" +
        items[i][1] +
        " blocks" +
        ", " +
        dict2[items[i][0]] +
        " buys)";
    }
    let fixedTopHoldersList = topHoldersList.slice(0, -55); //removing jjos wallets buy
    if (this._isMounted) {
      this.setState({ topHoldersList: fixedTopHoldersList });
    }
    //document.getElementById("owners").innerHTML = owners;
    //document.getElementById("topholders").innerHTML = topHoldersList;

    // Add the currentl block as well
    //chartLabels.push(curBlock);
    // chartValues.push(chartValues[chartValues.length-1]);

    //if (chartLabels.length > 0) {
    //chart.data.labels = chartLabels;
    //chart.data.datasets[0].data = chartValues;
    //}
    //chart.update();
  };
  hendleChinaClick = () => {
    this.setState({ lang: "ch" });
  };
  hendleEnglishClick = () => {
    this.setState({ lang: "eng" });
  };
  render() {
    const {
      price,
      ownerName,
      owners,
      owner,
      topHoldersList,
      unConf,
      chartLabels,
      chartValues
    } = this.state;
    //console.log(this.state.ownerName)

    return (
      <React.Fragment>
        <First
          lang={this.props.lang}
          price={price}
          owner={owner}
          unConf={unConf}
          ownerName={ownerName}
        />
        <Second
          lang={this.props.lang}
          owners={owners}
          owner={owner}
          topHolders={topHoldersList}
          chartLabels={chartLabels}
          chartValues={chartValues}
          ownerName={ownerName}
        />
        <History lang={this.props.lang} />
        <Fourth lang={this.props.lang} />
      </React.Fragment>
    );
  }
}

export default Kohinoor;
