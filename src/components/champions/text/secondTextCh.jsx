import React from "react";

const SecondTextEn = () => {
  return (
    <React.Fragment>
      <h3 className="mbr-section-title  display-5 mb-4">BLOCK CHAMPIONS 智能合约</h3>
					<div>
      <p>
      这个游戏秉着自主和无需信任模下以{" "}
        <a
          href="https://www.burst-coin.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Burstcoin 
        </a>{" "}
        区块链运行。可检查{" "}
        <a
          className="text-primary"
          href="https://github.com/blockplay-io/contracts/blob/master/Champions.java"
          target="_blank"
          rel="noopener noreferrer"
        >
          智能合约源代码
        </a>
        , 它以{" "}
        <a
          className="text-primary"
          href="https://github.com/burst-apps-team/blocktalk"
          target="_blank"
          rel="noopener noreferrer"
        >
          BlockTalk
        </a>{" "}
        的智能合约为 Burst编写.
      </p>
      <p>
      多出或少于30 BURST的交易将自动被忽略。请切勿直接从交易所汇款，可使用自己的钱包。选择一个级别，
      并用BURST挑战当前的冠军。您的挑战费越高，您成为新冠军的机率就越高（挑战费除以挑战费和重量之和后得出的数量就是您的机率）。
      以轻量级（1'000）为例：如果您用1'000 BURST挑战费，您会有50％的机率成为新的冠军，若是100 BURST您则有9％的机率。完成交易后，战斗将发生在下一个区块。
      如果在同一块中同时接收到两个或更多的挑战，那么战斗会以随机顺序发生。
      </p>
      <p>
      如果现任冠军是胜利者，那么他将获得挑战者的金额。如果挑战者是胜利者，那么他的挑战费将被退还，并成为新的冠军。挑战费用为1％（加上30 BURST激活费）。
      </p>
      </div>
    </React.Fragment>
  );
};

export default SecondTextEn;
