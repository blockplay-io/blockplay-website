import React from "react";

const FirstTextCh = () => {
  return (
    <div className="display-4">
      <p className="lead text-white">
      选择您的级别 - 从重量级到轻量级 – 打倒对手！ 
      </p>
      <p className="lead text-white">
      您的挑战费越高，您的机会就越高。如果您获胜的话，那么您将可取回您的挑战费并成为新的冠军。如果您是卫冕冠军，您将得到您击败的每个人的挑战费。
      </p>
      <p className="lead text-white">
      您需要一个{" "}
        <a
          href="https://www.burst-coin.org/download-wallet"
          target="_blank"
          rel="noopener noreferrer"
        >
          Burstcoin 
        </a>{" "}
        钱包来玩这个游戏。最低挑战费（激活费用）是30 BURST。挑战费用为1％。
      </p>
    </div>
  );
};

export default FirstTextCh;
