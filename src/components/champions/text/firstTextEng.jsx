import React from "react";

const FirstTextEnglish = () => {
  return (
    <div className="display-4">
      <p className="text-white lead">
        Choose your class - from heavyweight to lightweight - and knock
        their block off!
      </p>
      <p className="text-white lead">
        The higher your challenge, the higher your chances. If you win, you get
        your challenge back and become the new champion. If you are the
        defending champion, you get the challenge of everyone you defeat.
      </p>
      <p className="lead text-white">
        You need a{" "}
        <a
          href="https://www.burst-coin.org/download-wallet"
          target="_blank"
          rel="noopener noreferrer"
        >
          Burstcoin wallet
        </a>{" "}
        to play this game. Minimum challenge (activation fee) is 30 BURST. There
        is 1% fee on the challenges.
      </p>
    </div>
  );
};

export default FirstTextEnglish;
