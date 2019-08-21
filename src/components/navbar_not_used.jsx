
//Not used, moved it to main App.js
import React from "react";
import  Navbar from "react-bootstrap/Navbar";
import  Nav from "react-bootstrap/Nav";
import  Button from "react-bootstrap/Button";
import chinaFlag from "../pictures/china-flag-icon-32.png";
import britishFlag from "../pictures/united-kingdom-flag-xs.png";

const NavBar = ({ onChinaClick, onEnglishClick }) => {
  return (
    <Navbar expand="lg" bg="dark" sticky="top">
      <Navbar.Brand href="https://www.blockplay.io">
        <strong>
          <em>
            <font color="#0022FF">B</font>
          </em>
          <font color="#ff6600">lock</font>
          <font color="#ff3300">Play</font>
        </strong>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="justify-content-center">
          <Nav.Item>
            <Nav.Link href="https://kohinoor.blockplay.io/">
              <Button variant="info" size="sm">Koh-I-Noor</Button>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="https://champions.blockplay.io/">
              <Button variant="info" size="sm">Champions</Button>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="https://championsfun.blockplay.io/">
              <Button variant="info" size="sm">Champions Fun</Button>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="https://slots.blockplay.io/">
              <Button variant="info" size="sm">Slots</Button>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Nav.Link onClick={onChinaClick}>
          <img src={chinaFlag} alt="China flag " />
        </Nav.Link>
        <Nav.Link onClick={onEnglishClick}>
          <img src={britishFlag} alt="English flag " />
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
