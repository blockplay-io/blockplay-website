import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Kohinoor = ({ lang }) => {
  return (
    <Container
      fluid
      className="article"
      style={{
        backgroundColor: "rgb(242, 242, 242)",
        paddingTop: "120px",
        paddingBottom: "120px"
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h3 className="display-4 mb-4">KOH-I-NOOR SMART CONTRACT</h3>
            {lang === "eng" ? (
              <div className="lead">
                <p>
                  Check the Java{" "}
                  <a
                    className="text-primary"
                    href="https://github.com/burst-apps-team/blocktalk/blob/master/src/main/java/bt/sample/KohINoor.java"
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
                  Multi-out transactions or transactions with less than 30 BURST
                  are ignored. Never send funds directly from an exchange, use{" "}
                  <a
                    href="https://www.burst-coin.org/download-wallet"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    your own wallet
                  </a>
                  . Anyone sending the current price become the new owner and
                  price is increased by 10%. Transactions sending less than the
                  current price are refunded (minus 30 BURST). Previous owner
                  receives a return of investment of 10% over his entering price
                  (minus 1% fee). If the amount sent is higher than the current
                  price, the value in excess is taken as fee. After receiving a
                  transaction, the ownership transfer and payment of previous
                  owner takes place in the next block. If two or more
                  transactions are received in the same block, one randomly
                  chosen is the new owner and the others refunded (minus 30
                  BURST). The smart contract code running is available{" "}
                  <a
                    href="https://github.com/burst-apps-team/blocktalk/blob/master/src/main/java/bt/sample/KohINoor.java"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    on github
                  </a>
                  . Inspect this code, the bytecode running, and{" "}
                  <a
                    href="https://github.com/burst-apps-team/burstcoin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    BRS code
                  </a>
                  , since there is absolutely no warranty it actually works this
                  way!
                </p>
              </div>
            ) : (
              <div className="lead">
                <p>
                  检查使用
                  <a
                    className="text-primary"
                    href="https://github.com/burst-apps-team/blocktalk"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    BlockTalk
                  </a>{" "}
                  Burst的智能合约编写的{" "}
                  <a
                    className="text-primary"
                    href="https://github.com/burst-apps-team/blocktalk/blob/master/src/main/java/bt/sample/KohINoor.java"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Java
                  </a>
                  智能合约源代码。{" "}
                </p>
                <p>
                  多出或少于30 BURST 的交易将自动被忽略。
                  切勿直接从交易所汇款,请使用自己的钱包。{" "}
                  任何发送当前价格的人都将成为新的所有者，价格将增加10%
                  低于当前价格发送的交易将被退回(减去30 BURST)。
                  前任所有者收到的投资回报率为其进入价格的10％(减去 1% fee)。
                  如果发送的金额高于当前价格,则将超出的金额作为费用。
                  收到交易后，所有权转移和先前所有者的付款将在下一个区块中进行。
                  如果在同一个区块中收到两个或多个交易，则随机选择一个新的所有者，其他人退还（减去30
                  BURST）。
                  检查此代码、正在运行的字节码和BRS代码，因为没有绝对保证它能够这样运行！{" "}
                </p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Kohinoor;
