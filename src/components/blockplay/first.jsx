import React from "react";
import { text } from "./text/text";
const First = ({ lang }) => {
  return (
    <section
      className="cid-qTkA127IK8 mbr-fullscreen mbr-parallax-background"
      id="header2-1"
    >
      <div
        className="mbr-overlay"
        style={{ opacity: "0.6", backgroundColor: "rgb(118, 118, 118)" }}
      />
      <div className="container align-center">
        <div className="row justify-content-md-center">
          <div className="mbr-white col-md-10">
            <h1 className="mbr-section-title mbr-bold pb-3 mbr-fonts-style display-3">
              <strong>
                {lang === "eng" ? text[0].textEng.title : text[0].textCh.title}
              </strong>
              <span className="font-weight-bold">
                <em>
                  <font color="#0022FF">B</font>
                </em>
                <font color="#ff6600">lock</font>
                <font color="#ff3300">Play</font>
              </span>
            </h1>
            <p className="mbr-text pb-3 mbr-fonts-style display-5">
              {lang === "eng" ? text[0].textEng.text : text[0].textCh.text}
              <br />
              <br />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default First;
