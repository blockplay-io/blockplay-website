import React from "react";
import { text } from "../text/text";

import logo from "../../pictures/discord-512x512.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";

const Values = ({ lang }) => {
  return (
    <React.Fragment>
      <Container>
        
        <h2 className="pb-2 pt-5 text-center">
          <strong>
            <em>
              <font color="#0022FF">B</font>
            </em>
            <font color="#ff6600">lock</font>
            <font color="#ff3300">Play </font>?
          </strong>
        </h2>
        
        <h3 className="pb-3">
          <strong>{lang === "eng" ? "Vision: " : "愿景："}</strong>{" "}
          {lang === "eng"
            ? "Fair, trustless and open entertainment for the world."
            : "为世界提供公平，无需信任和开放的娱乐。"}
          <div />
          <div>
            <strong>{lang === "eng" ? "Goal: " : "目标："}</strong>{" "}
            {lang === "eng"
              ? "New standard for the entertainment industry."
              : "娱乐业的新标准。"}
          </div>
        </h3>
        <br />
        <h2>
          <div className="text-center" >
            <strong>{lang === "eng" ? "Values" : "价值"}</strong>
          </div>
        </h2>

        <Row className="pt-5">
          <Col sm={12} md={4}>
            <Card border="light" className="pl-3 pr-3 pb-5">
              <Card.Body>
                <Card.Title className="text-right">
                  {lang === "eng"
                    ? text[1].textEng.title
                    : text[1].textCh.title}
                </Card.Title>

                <Card.Text className="text-right">
                  {lang === "eng" ? text[1].textEng.text : text[1].textCh.text}
                </Card.Text>
              </Card.Body>
            </Card>

            <Card border="light" className="pl-3 pr-3">
              <Card.Body>
                <Card.Title className="text-right">
                  {lang === "eng"
                    ? text[4].textEng.title
                    : text[4].textCh.title}
                </Card.Title>

                <Card.Text className="text-right">
                  {lang === "eng" ? text[4].textEng.text : text[4].textCh.text}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4} className="align-self-center">
            <Image src={logo} alt="Blay" title="" className="img-fluid" />
          </Col>
          <Col sm={12} md={4}>
            <Card border="light" className="pl-3 pr-3 pb-5">
              <Card.Body>
                <Card.Title>
                  {lang === "eng"
                    ? text[2].textEng.title
                    : text[2].textCh.title}
                </Card.Title>

                <Card.Text>
                  {lang === "eng" ? text[2].textEng.text : text[2].textCh.text}
                </Card.Text>
              </Card.Body>
            </Card>

            <Card border="light" className="pl-3 pr-3">
              <Card.Body>
                <Card.Title>
                  {lang === "eng"
                    ? text[3].textEng.title
                    : text[3].textCh.title}
                </Card.Title>

                <Card.Text>
                  {lang === "eng" ? text[3].textEng.text : text[3].textCh.text}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <br />
    </React.Fragment>
  );
};

export default Values;
