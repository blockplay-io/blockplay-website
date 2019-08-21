import React from "react";
import img from "../pictures/pbb1-128x52.png";
import imgJs from "../pictures/burstjs.png";

import "socicon";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Footer = ({ lang }) => {
  return (
    <Container
      fluid
      className="bg-dark pt-70"
      style={{
        paddingTop: "70px",
        paddingBottom: "70px"
      }}
    >
      <Container>
        <Row>
          <Col xs={12} md={3}>
            <div>
              <a
                href="https://www.burst-coin.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={img} alt="Powered By Burst" />
              </a>
            </div>
            <br />
            <div>
              <a
                href="https://burstappsteam.org/phoenix"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={imgJs} alt="BurstJs" />
              </a>
            </div>
          </Col>
          <Col xs={12} md={3}>
            <div className="text-light">
              {lang === "eng" ? (
                <strong>Enjoy with moderation</strong>
              ) : (
                <strong>适度享受</strong>
              )}
              <br />
              <a
                className="text-white"
                href="http://blockplay.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                BlockPlay.io
              </a>
              <br />
              <Row className="mt-1">
                <ButtonGroup aria-label="Social networks">
                  <Button
                    href="https://twitter.com/shefass"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="info"
                    className="socicon-twitter mr-1"
                  />

                  <Button
                    href="https://discord.gg/wfqmn3e"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="info"
                    className="socicon-discord mr-1"
                  />
                  <Button
                    href="http://t.me/blockplay"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="info"
                    className="socicon-telegram mr-1"
                  />
                  <Button
                    href="http://reddit.com/r/BlockPlay/"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="info"
                    className="socicon-reddit mr-1"
                  />
                  <Button
                    href="https://github.com/blockplay-io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="info"
                    className="socicon-github"
                  />
                </ButtonGroup>
              </Row>
              <br />
            </div>
          </Col>
          <Col xs={12} md={3}>
            <p className="text-light">
              {lang === "eng" ? (
                <strong>Other Smart Contracts</strong>
              ) : (
                <strong>其他智能合约</strong>
              )}
              <br />
              <a
                className="text-light"
                href="https://github.com/blockplay-io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source code
              </a>
              <br />
            </p>
          </Col>
          <Col className="mbr-footer-content col-xs-12 col-md-3">
            <p className="text-light">
              {lang === "eng" ? <strong>Links</strong> : <strong>链接</strong>}
              <br />
              <a
                className="text-light"
                href="https://www.burst-coin.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Burstcoin Website
              </a>
              <br />
              <a
                className="text-light"
                href="https://www.burstcoin.ist/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Burstcoin.ist
              </a>
              <br />
              <a
                className="text-light"
                href="https://slots.blockplay.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                Slots
              </a>
              
              <br />
              <a
                className="text-light"
                href="https://forums.getburst.net/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Getburst Forums
              </a>
              <br />
              <a
                className="text-light"
                href="https://github.com/burst-apps-team/blocktalk"
                target="_blank"
                rel="noopener noreferrer"
              >
                BlockTalk Burst Smart Contracts
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Footer;
