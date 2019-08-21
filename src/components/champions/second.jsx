import React from "react";

import SecondTextEn from "./text/secondTextEn";
import SecondTextCh from "./text/secondTextCh";
import Faq from "./thirdFaq";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Second = ({ lang }) => {
  return (
    <Container
      fluid
      className="mbr-fonts-style mbr-fullscreen"
      style={{
        backgroundColor: "rgb(242, 242, 242)",
        backgroundSize: "cover"
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            {lang === "eng" ? <SecondTextEn /> : <SecondTextCh />}
            <br />
            <Faq lang={lang} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Second;
