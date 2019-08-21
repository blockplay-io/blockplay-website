import React from "react";
import mainPicture from "./data/main-d.jpg";
import FirstTextEnglish from "./text/firstTextEng";
import FirstTextCh from "./text/firstTextCh";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const First = ({ lang, fun }) => {
  return (
    <Container
      className="mbr-fonts-style"
      fluid
      style={{
        backgroundImage: `url(${mainPicture})`,
        backgroundSize: "cover",
        paddingTop: "115px",
        paddingBottom: "115px"
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
                BLOCK CHAMPIONS
              </h1>
              {fun && (
                <h4 className="display-5">
                  THIS VERSION RUNS AT TESTNET WITH NO REAL VALUE
                </h4>
              )}
              {lang === "eng" ? <FirstTextEnglish /> : <FirstTextCh />}
            </Col>
          </Row>
        </Container>
      </Col>
    </Container>
  );
};

export default First;
