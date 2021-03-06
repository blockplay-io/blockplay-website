import React from "react";
import QRCode from "qrcode.react";
import Marquee from "react-text-marquee";

import { copyToClip } from "../../funcions/funcions";

import { convertNumericIdToAddress, sumNQTStringToNumber } from "@burstjs/util";
import coin from "./pictures/Coin.png";



import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image';


const Auctions = ({
  lang,
  price,
  owner,
  at,
  explorer,
  time,
  unConfTrans,
  name,
  finished,
  active,
  startTimer
}) => {
  const atRS = convertNumericIdToAddress(at);
  const ownerRs = convertNumericIdToAddress(owner);
  return (
    <Container
      fluid
      className="mbr-fonts-style  mbr-fullscreen"
      style={{
        backgroundImage: `url(${coin})`,
        backgroundSize: "cover"
      }}
    >
      <div
        className="mbr-overlay"
        style={{ opacity: "0.5", backgroundColor: "rgb(0, 0, 0)" }}
      />
      <Row>
        <Col xs={12} lg={6}>
          <Image src={coin} thumbnail />
        </Col>

        <Col xs={12} lg={6} className="text-xs-right text-right text-white">
          <h1 className="display-4 text-right text-white font-weight-bold font-italic mr-3">
            CUSTOM BURST COIN
          </h1>
          <div className="mr-3">
            <p className="lead font-italic">
              Win the auction and get a custom burst coin. This is skipper's design. The coin is made from metal, one side dark blue and another side black.
              Free worldwide shipment. The auction will start after it gets the first transaction and will last 24h. Before bidding please look to FAQ.
            </p>
          </div>

          <div>
            <div style={{ width: "210px", float: "left" }}></div>
            <div>
              <Button
                variant="info"
                size="lg"
                className="text-right text-white mb-2"
                onClick={() => copyToClip(atRS)}
              >
                <QRCode value={atRS} className="border" />
                <div>Auction address</div>

                <div>
                  <strong>{atRS}</strong>
                </div>
              </Button>
            </div>
            <div>
              <Button
                size="lg"
                variant="info"
                className="text-right text-white mb-2"
                target="_blank"
                rel="noopener noreferrer"
                href={explorer + owner}
              >
                <div>Current auction leader</div>
                <div>
                  <strong>
                    {name} {ownerRs}
                  </strong>
                </div>

              </Button>
            </div>

            <div>
              <Button
                size="lg"
                variant="info"
                className="text-right text-white mb-2"
                onClick={() => copyToClip(price)}
              >
                <div>Current bid</div>

                <div>
                  <strong>{price + " BURST"}</strong>
                </div>
              </Button>
            </div>
            <div>
              <Button
                size="lg"
                variant="info"
                className="text-right text-white mb-2"
              >
                <div>Time left until the auction will finish</div>
                {!startTimer & !finished ? 
                  "Auction timer will start after the first bid" : startTimer & !finished ?
                (
                  `${time} blocks or about ${Math.floor(
                    (time * 4) / 60
                  )}h and ${time * 4 - Math.floor((time * 4) / 60) * 60}min`
                ) : (
                  <strong>Auction finished! Wait for next one</strong>
                )}
              </Button>
            </div>
            <div>
              <Button
                size="lg"
                variant="info"
                className="text-right text-white mb-2"
                target="_blank"
                rel="noopener noreferrer"
                style={{ maxWidth: 400 }}
                href={explorer + at}
              >
                <Marquee
                  loop
                  hoverToStop
                  text={
                    finished ? "Auction finished":
                    unConfTrans.length === 0
                      ? "Waiting for bid"
                      : `Biders list: ${unConfTrans.map(
                          t =>
                            t.senderRS.substring(21) +
                            " (" +
                            sumNQTStringToNumber(t.amountNQT) +
                            " BURST)"
                        )}
                      `
                  }
                />
              </Button>
             
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Auctions;
