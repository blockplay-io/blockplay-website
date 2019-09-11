import React from "react";
import mainPicture from "./data/hammer.jpg";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const First = ({ lang }) => {
  return (
    <Container
      className="mbr-fonts-style mbr-fullscreen"
      fluid
      style={{
        backgroundImage: `url(${mainPicture})`,
        backgroundSize: "cover"
      }}
    >
      <div
        className="mbr-overlay"
        style={{ opacity: "0.5", backgroundColor: "rgb(0, 0, 0)" }}
      />
      <Col>
        <Container>
          <Row className="justify-content-end">
            <Col
              md={{ span: 10, offset: 2 }}
              className="text-xs-right text-right text-white"
            >
              <h1 className="display-4 font-weight-bold m-4 font-italic">
               <span style={{whiteSpace: "nowrap"}}> BLOCK</span> <span style={{whiteSpace: "nowrap"}}>AUCTION</span>
              </h1>

              <h5>Decentralized auctions? Yes! Take this <a href="https://github.com/blockplay-io/contracts/blob/master/Auction.java" target="_blank" rel="noopener noreferrer">code</a> of smart contract 
                and create your auction with <a href="https://github.com/burst-apps-team/blocktalk" target="_blank" rel="noopener noreferrer">
                  BlockTalk</a> or just contact <a href="#socNetworks">us</a> and we will help you.</h5>
            </Col>
          </Row>
        </Container>
      </Col>
    </Container>
  );
};

export default First;
