import React from 'react';
import {text} from "../text/text";
import bloks from "./data/blocks-2000x3000.jpeg";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const First = ({lang}) => {
    return ( 
        <Container
        fluid
        
        className="bg-dark" style={{ backgroundImage: `url(${bloks})`, height: "100vh", display: "flex"}}

        >
         
         
           <Row className="align-items-center justify-content-center">
              <Col md={10}>
                <h1  className="pb-3 text-white text-center">
                  {lang === "eng" ? text[0].textEng.title : text[0].textCh.title }
                  <em>
                    <font color="#0022FF">B</font>
                  </em>
                  <font color="#ff6600">lock</font>
                  <font color="#ff3300">Play</font>
                </h1>

                <p className="pb-3 text-white text-center">
                {lang === "eng" ? text[0].textEng.text : text[0].textCh.text }
                  <br />
                  <br />
                </p>
               
              </Col>
            </Row> 
          
        </Container>
     );
}
 
export default First;
