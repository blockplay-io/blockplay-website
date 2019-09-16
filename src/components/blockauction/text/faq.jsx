

export const  faqText = [
    {
      id: 1,
      textEng: {
        title: "To which address should I send BURST to bid in a auction?",
        text:
          `Always send BURST to the smart contract address which is called "Auction address", never to the current auction leader.`
      },
      textCh: {
        title: "Sorry, no translation",
       
      }
    },
    {
      id: 2,
      textEng: {
        title: "How is the winner established?",
        text:
         "After time out, the smart contract will finish and sends to auction owner biggest bid. All transactions are public in the Burst blockchain, "+
         "so seller and buyer can see that it is fair."
      },
      textCh: {
        title: "Sorry, no translation",
      }
    },
    {
      id: 3,
      textEng: {
        title: "What happens then a auction finish?",
        text:
          "After this time the auctions smart contract will be sleeping and it will only returns back transactions,  so don't send to it."
      },
      textCh: {
        title: "Sorry, no translation",
      }
    },
    {
      id: 4,
      textEng: {
        title: "If I win a auction, what should I do?",
        text:
          "Congratulations, take a screenshot and share with your friends! Now you just have to wait for auction owner to contact you and ask for "+
          "the real world address, so he can send your items to you."
      },
      textCh: {
        title: "Sorry, no translation",
      }
    },
    {
      id: 5,
      textEng: {
        title: "How the auction owner will contact me?",
        text:
          "Auction owner will send you message to the Burst address which you used in the auction."
      },
      textCh: {
        title: "Sorry, no translation",
      }
    },
    {
      id: 6,
      textEng: {
        title: "Who is the auction owner?",
        text:
          "Auction owner is a person who is beneficiary of the auction. He/she is responsible for a items delivery or quality."
      },
      textCh: {
        title: "Sorry, no translation",
      }
    },
    {
      id: 7,
      textEng: {
        title: "How I can create own auction?",
        text:
          "You can use public auctions smart contract code by compiling it with BlockTalk and putting it in the Burst blockchain or just contact us, we will help you."
      },
      textCh: {
        title: "Sorry, no translation",
      }
    },
    {
      id: 8,
      textEng: {
        title: "Can I bid if there is other bid in line?",
        text:
          "You can bid in auction anytime. If there are multiple bids in line, all smaller bids will be refunded."
      },
      textCh: {
        title: "Sorry, no translation",
      }
    },
    {
      id: 9,
      textEng: {
        title: "I changed my mind. Give my Burst back!",
        text:
          "All transactions in the Burst blockchain are irreversible. Burst is a decentralized network, so you are the owner of your funds and have all "+
          "freedoms to use it how you want, but with big freedom comes big responsibility."
      },
      textCh: {
        title: "Sorry, no translation",
      }
    },
    {
      id: 10,
      textEng: {
        title: "Where the 22 BURST go (activation fee)?",
        text:
          "Every smart contract running in the blockchain cost BURST to" +
          " run, collected by miners. The block auction smart contract costs around 22 BURST to run."
      },
      textCh: {
        title: "22 BURST的用意是什么（激活费）？",
        text: "在区块链中运行的每个智能合约都需要BURST来运营，并由矿工收集。该区块冠军的智能合约需约22 BURST的成本。"
      }
    },
    {
      id: 11,
      textEng: {
        title: "What is the minimum transaction fee?",
        text:
          " Every transaction in Burst blockchain cost a fee to be processed. Higher fees have higher priority, you should have" +
          "no problem if you choose the standard fee."
      },
      textCh: {
        title: "什么是最低交易费？",
        text: "Burst区块链中的每笔交易都需要付费才能获得处理。更高的费用具有更高的优先级，但如果您选择标准费用，您也应该不会有问题。"
      }
    },
    {
      id: 12,
      textEng: {
        title: "What is a block?",
        text:
          "Blockchain consists from the chain of blocks, every block holds transactions and blockchain state. Burst blocks time is 4 minutes average." +
          "It is average, so block time can be shorter or longer."
      },
      textCh: {
        title: "sorry no translation"
      
      }
    },
    {
      id: 13,
      textEng: {
        title: "When a auction will start?",
        text:
          "It will start after the first minimal transaction to it. Minimal transaction depends on price set by owner. All other transactions " +
          "will be refunded (minus minimum transaction fee) and will not start a auction." 
      },
      textCh: {
        title: "sorry no translation"
      }
    },
    {
      id: 14,
      textEng: {
        title: "What is a unconfirmed bid list?",
        text:
          "Then you do a transaction to the auction, it shows this transaction in an unconfirmed bid list. " +
          "It is not confirmed or verified by blockchain. Then this transaction gots verification. " 
      },
      textCh: {
        title: "sorry no translation"
      }
    }
  ];
  