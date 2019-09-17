import React from "react";

import EventFun from "./text/eventFun";
import EventReal from "./text/eventReal";
import EventFaq from "./eventFaq";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Event = ({ fun }) => {
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
            {fun ? <EventFun/> : <EventReal />}
            <br />
            <EventFaq  />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Event;
