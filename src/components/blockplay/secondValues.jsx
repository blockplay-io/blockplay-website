import React from "react";
import { text } from "./text/text";
import logo from "../../pictures/discord-512x512.png";

const Values = ({ lang }) => {
  return (
    <React.Fragment>
      <section className="features12 cid-rw667MlIi9" id="features12-a">
        <div className="container">
          <h2 className="mbr-section-title pb-2 mbr-fonts-style display-3">
            <span className="font-weight-bold">
              <em>
                <font color="#0022FF">B</font>
              </em>
              <font color="#ff6600">lock</font>
              <font color="#ff3300">Play </font>?
            </span>
          </h2>
          <h3 className="mbr-section-subtitle pb-3 mbr-fonts-style display-5">
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
            <div>
              <strong>{lang === "eng" ? "Values" : "价值"}</strong>
            </div>
          </h2>
          <div className="media-container-row pt-5">
            <div className="block-content align-right">
              <div className="card pl-3 pr-3 pb-5">
                <div className="mbr-card-img-title">
                  <div className="mbr-crt-title">
                    <h4 className="card-title py-2 mbr-crt-title mbr-fonts-style display-7">
                      {lang === "eng"
                        ? text[1].textEng.title
                        : text[1].textCh.title}
                    </h4>
                  </div>
                </div>
                <div className="card-box">
                  <p className="mbr-text mbr-section-text mbr-fonts-style display-7">
                    {lang === "eng"
                      ? text[1].textEng.text
                      : text[1].textCh.text}
                  </p>
                </div>
              </div>
              <div className="card pl-3 pr-3">
                <div className="mbr-card-img-title">
                  <div className="mbr-crt-title">
                    <h4 className="card-title py-2 mbr-crt-title mbr-fonts-style display-7">
                      {lang === "eng"
                        ? text[4].textEng.title
                        : text[4].textCh.title}
                    </h4>
                  </div>
                </div>
                <div className="card-box">
                  <p className="mbr-text mbr-section-text mbr-fonts-style display-7">
                    {lang === "eng"
                      ? text[4].textEng.text
                      : text[4].textCh.text}
                  </p>
                </div>
              </div>
            </div>
            <div className="mbr-figure m-auto" style={{ width: "25%" }}>
              <img src={logo} alt="Blay" title="" />
            </div>
            <div className="block-content align-left">
              <div className="card pl-3 pr-3 pb-5">
                <div className="mbr-card-img-title">
                  <div className="mbr-crt-title">
                    <h4 className="card-title py-2 mbr-crt-title mbr-fonts-style display-7">
                      {lang === "eng"
                        ? text[2].textEng.title
                        : text[2].textCh.title}
                    </h4>
                  </div>
                </div>
                <div className="card-box">
                  <p className="mbr-text mbr-section-text mbr-fonts-style display-7">
                    {lang === "eng"
                      ? text[2].textEng.text
                      : text[2].textCh.text}
                  </p>
                </div>
              </div>
              <div className="card pl-3 pr-3">
                <div className="mbr-card-img-title">
                  <div className="mbr-crt-title">
                    <h4 className="card-title py-2 mbr-crt-title mbr-fonts-style display-7">
                      {lang === "eng"
                        ? text[3].textEng.title
                        : text[3].textCh.title}
                    </h4>
                  </div>
                </div>
                <div className="card-box">
                  <p className="mbr-text mbr-section-text mbr-fonts-style display-7">
                    {lang === "eng"
                      ? text[3].textEng.text
                      : text[3].textCh.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
      </section>
    </React.Fragment>
  );
};

export default Values;
