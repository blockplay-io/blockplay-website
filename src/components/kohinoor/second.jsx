import React from "react";
import Chart from "../../funcions/line";
import chain from "../../pictures/chain.png";
import { convertNumericIdToAddress } from "@burstjs/util";
import Marquee from "react-text-marquee";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const Second = ({
  lang,
  owners,
  topHolders,
  chartLabels,
  chartValues,
  owner,
  ownerName
}) => {
  return (
    <Container
      className="mbr-fonts-style mbr-fullscreen"
      fluid
      style={{
        backgroundImage: `url(${chain})`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="mbr-overlay"
        style={{ opacity: "0.5", backgroundColor: "rgb(0, 0, 0)" }}
      />
      <Container fluid style={{}}>
        <h3 className="display-4 text-center text-white">
          <strong>{lang === "eng" ? "OWNERS CHAIN" : "所有者链 "}</strong>
        </h3>
        {lang === "eng" ? (
          <p className="text-white text-center">
            The chain of owners, the value they received for the token (10%
            above listed price minus 1% fee), and the block they lost the
            ownership.
          </p>
        ) : (
          <p className="text-white text-center">
            所有者链，他们收到的代币价值（高于上市价格10％减去1％的费用），以及他们失去所有权的区块。
          </p>
        )}

        <Card className="mb-1">
          <Marquee
            loop
            hoverToStop
            text={
              ownerName +
              " " +
              convertNumericIdToAddress(owner) +
              owners.map(
                a =>
                " | " +
                  a.name +
                  " (" +
                  a.amount +
                  "  BURST, block " +
                  a.lostBlock +
                  " )"
              )
            }
          />
        </Card>

        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Chart chartLabels={chartLabels} chartValues={chartValues} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/*<!-- <h3 className="mbr-section-title display-2">TOP HOLDERS</h3> -->*/}
        {lang === "eng" ? (
          <p className="text-white mt-1 text-center">
            Cumulative of blocks an address held ownership of the Koh-i-Noor and
            number of times it was held.
          </p>
        ) : (
          <p className="text-white mt-1 text-center">
            累积的区块地址拥有 Koh-i-Noor 的所有权和持有次数。
          </p>
        )}

        <Card className="mb-1">
          <Marquee loop hoverToStop text={topHolders} />
        </Card>
      </Container>
    </Container>
  );
};

export default Second;
