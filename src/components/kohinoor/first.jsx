import React from "react";
import QRCode from "qrcode.react";
import daimondImg from "../../pictures/daimond.png";
import { copyToClip } from "../../funcions/funcions";
import { EXPLORER, at } from "./constants/const";
import { convertNumericIdToAddress } from "@burstjs/util";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const atRS = convertNumericIdToAddress(at);

const First = ({ lang, price, owner, unConf, ownerName }) => {
  return (
    <Container
      fluid
      className="mbr-fonts-style"
      style={{ backgroundImage: `url(${daimondImg})`, backgroundSize: "cover" }}
    >
      <div
        className="mbr-overlay"
        style={{ opacity: "0.5", backgroundColor: "rgb(0, 0, 0)" }}
      />
      <Row className="justify-content-end">
        <Col
          md={{ span: 10, offset: 2 }}
          className="text-xs-right text-right text-white mr-4"
        >
          <h1 className="display-4 text-right text-white font-weight-bold m-5 font-italic">
            KOH-I-NOOR EXPERIMENT
          </h1>
          <div>
            {lang === "eng" ? (
              <p className="lead font-italic">
                Become the Koh-i-Noor owner in this virtual reality experiment
                by transfering
                <strong> {price}</strong> to <strong>{atRS}</strong>. There is
                only one token for the entire world and for every new owner the
                price is increased by 10%. Then you either keep the token or
                have 10% return of investment when a new owner arrives (minus 1%
                fee).
              </p>
            ) : (
              <p className="lead">
                通过将
                <strong> {price}</strong> 转移到 <strong>{atRS}</strong>,
                成为此虚拟现实实验中的Koh-i-Noor所有者。
                整个世界只有一种代币，每个新的所有者的价格都会提高10％。
                然后，您可以保留代币，或者在新所有者加入时获得10％的投资回报（减去1％的费用）。
              </p>
            )}
          </div>

          <div>
            <div style={{ width: "210px", float: "left" }}>
              <QRCode value={atRS} className="border" />
            </div>
            <div>
              <Button
                variant="info"
                size="lg"
                className="text-right text-white mb-2"
                onClick={() => copyToClip(atRS)}
              >
                {lang === "eng" ? (
                  <div>Token address</div>
                ) : (
                  <div>代币地址</div>
                )}

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
                href={EXPLORER + owner}
              >
                {lang === "eng" ? (
                  <div>Current owner</div>
                ) : (
                  <div>现任所有者</div>
                )}
                <strong>
                  {ownerName + " " + convertNumericIdToAddress(owner)}
                </strong>{" "}
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
                {lang === "eng" ? (
                  <div>Current price</div>
                ) : (
                  <div>目前价格</div>
                )}
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
                target="_blank"
                rel="noopener noreferrer"
                href={EXPLORER + at}
              >
                <p>{unConf}</p>
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default First;
