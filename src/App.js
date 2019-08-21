import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch
} from "react-router-dom";
import ScrollToTop from 'react-router-scroll-top';

import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/bootstrap/css/bootstrap-reboot.min.css";
import "./assets/bootstrap/css/bootstrap-grid.min.css";
import "./assets/tether/tether.min.css";
import "./assets/theme/css/style.css";
import "./assets/mobirise/css/mbr-additional.css";

//import NavBar from "./components/navbar";
import Champions from "./components/champions/App";
import ChampionsFun from "./components/champions/AppFun";
import BlockPlay from "./components/blockplay/App";
import {
  ats,
  atsFUN,
  NODEFUN,
  EXPLORER,
  EXPLORERFUN
} from "./components/champions/constants/const";

import Footer from "./components/footer";

import Kohinoor from "./components/kohinoor/App";

import { ApiSettings } from "@burstjs/core";
import { NODE } from "./components/kohinoor/constants/const";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import chinaFlag from "./pictures/china-flag-icon-32.png";
import britishFlag from "./pictures/united-kingdom-flag-xs.png";

//const api = composeApi(apiSettings);

class App extends Component {
  state = {
    lang: "eng"
  };

  hendleChinaClick = () => {
    this.setState({ lang: "ch" });
  };
  hendleEnglishClick = () => {
    this.setState({ lang: "eng" });
  };

  render() {
    const apiSettings = new ApiSettings(NODE, "burst");
    const apiSettingsFun = new ApiSettings(NODEFUN, "burst");
    const { lang } = this.state;

    return (
      <React.Fragment>
        <Router>
        <ScrollToTop>
          <Navbar expand="md" bg="dark" sticky="top">
            <Navbar.Brand as={Link} to="/">
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
                  <Button
                    as={NavLink}
                    className="mt-3"
                    to="/kohinoor"
                    variant="info"
                    activeClassName="border"
                    size="sm"
                  >
                    Koh-I-Noor
                  </Button>
                </Nav.Item>
                <Nav.Item>
                  <Button
                    as={NavLink}
                    onClick={() => this.setState({ fun: false })}
                    className="mt-3"
                    to="/champions"
                    variant="info"
                    activeClassName="border"
                    size="sm"
                  >
                    Champions
                  </Button>
                </Nav.Item>
                <Nav.Item>
                  <Button
                    as={NavLink}
                    onClick={() => this.setState({ fun: true })}
                    className="mt-3"
                    to="/championsfun"
                    variant="info"
                    activeClassName="border"
                    size="sm"
                  >
                    Champions Fun
                  </Button>
                </Nav.Item>
                {/*<Nav.Item>
                  <Nav.Link href="https://slots.blockplay.io/" target="_blank">
                    <Button variant="info" size="sm">
                      Slots
                    </Button>
                  </Nav.Link>
                </Nav.Item>*/}
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Nav.Link onClick={this.hendleChinaClick}>
                <img src={chinaFlag} alt="China flag " />
              </Nav.Link>
              <Nav.Link onClick={this.hendleEnglishClick}>
                <img src={britishFlag} alt="English flag " />
              </Nav.Link>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/" render={props => <BlockPlay lang={lang} />} />
            <Route
              exact
              path="/kohinoor"
              render={props => <Kohinoor lang={lang} />}
            />
            <Route
              exact
              path="/champions"
              render={props => (
                <Champions
                  apiSettings={apiSettings}
                  ats={ats}
                  fun={false}
                  lang={lang}
                  explorer={EXPLORER}
                />
              )}
            />
            <Route
              exact
              path="/championsfun"
              render={props => (
                <ChampionsFun
                  apiSettings={apiSettingsFun}
                  ats={atsFUN}
                  fun={true}
                  lang={lang}
                  explorer={EXPLORERFUN}
                />
              )}
            />
          </Switch>
          </ScrollToTop>
        </Router>
        <Footer lang={lang} />
      </React.Fragment>
    );
  }
}

export default App;

//<BlockPlay lang={lang}/>
//<Kohinoor lang={lang} />
//<Champions apiSettings={apiSettings} ats={atsX} fun={fun} lang={lang} />
//<NavBar onChinaClick={this.hendleChinaClick} onEnglishClick={this.hendleEnglishClick}/>
// <Footer lang={lang} />

/* <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={BlockPlay} />
        <Route path="/about" component={Kohinoor} />
        <Route path="/topics" component={Champions} />
      </div>
    </Router>*/
