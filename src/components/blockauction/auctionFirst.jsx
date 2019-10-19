import React from "react";
import QRCode from "qrcode.react";
import Marquee from "react-text-marquee";

import { copyToClip } from "../../funcions/funcions";

import { convertNumericIdToAddress, sumNQTStringToNumber } from "@burstjs/util";
import keyChainSea from "./pictures/keyChainSeaResized.jpg";
import keyChainHolding from "./pictures/keyChainHoldingResized.jpg";
import keyChainParket from "./pictures/keyChainParketResized.jpg";
import clip from "./pictures/clip.jpg";
import clipBack from "./pictures/clipBack.jpg";
import clipSide from "./pictures/clipSide.jpg";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";

const AuctionsFirst = ({
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
            THE FIRST BURST AUCTION
          </h1>
          <div className="mr-3">
            <p className="lead font-italic">
              This is <strong>The First Burst Auction! </strong> 
              It was created in 663607 Block and finished after 12h 2019/09/12. 
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

                {/*<strong>
                  {ownerName + " " + convertNumericIdToAddress(owner)}
                </strong>{" "}*/}
                {/* Here need on click convert address to numeric id or way araound */}
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
                  "Auction timer will start after the first bid" : startTimer ?
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
              {/* <p>{unConf}</p> */}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AuctionsFirst;
