import React from "react";
import QRCode from "qrcode.react";
import Marquee from "react-text-marquee";

import { copyToClip } from "../../funcions/funcions";

import { convertNumericIdToAddress, sumNQTStringToNumber } from "@burstjs/util";
import keyChainSea from "./data/keyChainSeaResized.jpg";
import keyChainHolding from "./data/keyChainHoldingResized.jpg";
import keyChainParket from "./data/keyChainParketResized.jpg";
import clip from "./data/clip.jpg";
import clipBack from "./data/clipBack.jpg";
import clipSide from "./data/clipSide.jpg";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";

const AuctionsSecond = ({
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
        backgroundImage: `url(${keyChainSea})`,
        backgroundSize: "cover"
      }}
    >
      <div
        className="mbr-overlay"
        style={{ opacity: "0.5", backgroundColor: "rgb(0, 0, 0)" }}
      />
      <Row>
        <Col xs={12} lg={6}>
          <Carousel style={{ maxWidth: 600 }}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={keyChainHolding}
                alt="First slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src={keyChainParket}
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={keyChainSea}
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={clipSide} alt="Clip Side" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={clip} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={clipBack} alt="Clip Back" />
            </Carousel.Item>
          </Carousel>
        </Col>

        <Col xs={12} lg={6} className="text-xs-right text-right text-white">
          <h1 className="display-4 text-right text-white font-weight-bold font-italic mr-3">
            KEY CHAIN AND CLIP
          </h1>
          <div className="mr-3">
            <p className="lead font-italic">
              Win the auction and get key chain and clip with Burst logo! The auction will start after it gets the first transaction and will last 24h. 
              Both items made from metal. Free worldwide shipment. Before bidding please look to FAQ.
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
                      : `Unconfirmed bid list: ${unConfTrans.map(
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

export default AuctionsSecond;
