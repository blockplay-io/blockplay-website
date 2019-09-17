import React from "react";

const SecondTextEn = () => {
  return (
    <React.Fragment>
      <h3 className="mbr-section-title display-5 mb-4">BLOCK CHAMPIONS SMART CONTRACT</h3>
					<div className="lead">
      <p>
        This game runs on the{" "}
        <a
          href="https://www.burst-coin.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Burstcoin blockchain
        </a>{" "}
        in an autonomous and trustless way. Check the Java{" "}
        <a
          className="text-primary"
          href="https://github.com/blockplay-io/contracts/blob/master/Champions.java"
          target="_blank"
          rel="noopener noreferrer"
        >
          smart contract source code
        </a>
        , written using{" "}
        <a
          className="text-primary"
          href="https://github.com/burst-apps-team/blocktalk"
          target="_blank"
          rel="noopener noreferrer"
        >
          BlockTalk
        </a>{" "}
        smart contracts for Burst.
      </p>
      <p>
        Multi-out transactions or transactions with less than 30 BURST are
        ignored. Never send funds directly from an exchange, use{" "}
        <a
          href="https://www.burst-coin.org/download-wallet"
          target="_blank"
          rel="noopener noreferrer"
        >
          your own wallet
        </a>
        . Choose one class and challenge the current champion with BURST.
        The higher your challenge, the higher your chances to become the new
        champion (chances are given by your challenge divided by the sum of
        challenge and weight). Taking the lightweight className (1'000) as an
        example: if you challenge with 1'000 BURST there is a 50% chance you
        will become the new champion, with 100 BURST you have 9% chance. After
        receiving a transaction, the <i>fight</i> takes place in the next block.
        If two or more challenges are received in the same block, the{" "}
        <i>fights</i>
        occur in a random order.
      </p>
      <p>
        If the current champion is the winner, he takes the challenger's amount.
        If the challenger is the winner, his challenge is refunded and he
        becomes the new champion. There is 1% fee on challenges (plus 30 BURST
        activation fee).
      </p>
      </div>
    </React.Fragment>
  );
};

export default SecondTextEn;
