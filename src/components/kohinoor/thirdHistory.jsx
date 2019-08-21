import React from "react";
import drawing from "../../pictures/drawing.jpg";

import Container from "react-bootstrap/Container";

const History = ({ lang }) => {
  return (
    <Container
      fluid
      style={{
        backgroundImage: `url(${drawing})`,
        backgroundSize: "cover",
        paddingTop: "120px",
        paddingBottom: "120px"
      }}
    >
      <Container>
        <h3 className="display-4 text-white">
          <strong>{lang === "eng" ? "HISTORY" : "历史"}</strong>
        </h3>
        {lang === "eng" ? (
          <div className="text-white font-italic">
            <p>
              Koh-i-Noor is the most famous diamond of the ancient world,
              discovered in India about 5000 years ago.
              <span style={{ fontSize: "1.07rem" }}>
                &nbsp; This diamond passed the hand of many rulers until being
                ceded to Queen Victoria after the British annexation of the
                Punjab in 1849.&nbsp;
              </span>
              <span style={{ fontSize: "1.07rem" }}>
                The Koh-i-Noor has long been a subject of diplomatic
                controversy, with India, Pakistan, Iran, and Afghanistan&nbsp;
              </span>
              <span style={{ fontSize: "1.07rem" }}>
                all demanding its return from the UK at various points.
              </span>
            </p>
            <p>
              <br />
              <span style={{ fontSize: "1.07rem" }}>
                In this virtual reality experiment, you can own the Koh-i-Noor
                token but you will never know for how long...
              </span>
            </p>
          </div>
        ) : (
          <div className="text-white">
            <p>
              Koh-i-Noor 是古代世界最著名的钻石,大约 5000 年前在印度被发现。
              <span style={{ fontSize: "1.07rem" }}>
                &nbsp;这颗钻石经过了许多统治者之手，直到1849年英国吞并旁遮普后才被割让给维多利亚女王。&nbsp;
              </span>
              <span style={{ fontSize: "1.07rem" }}>
                长期以来，Koh-i-Noor
                一直都是外交争议的话题，印度，巴基斯坦，伊朗和阿富汗都在各个方面要求它从英国返回。&nbsp;
              </span>
            </p>
            <p>
              <br />
              <span style={{ fontSize: "1.07rem" }}>
                在这个虚拟现实实验中，您可以拥有koh-i-noor代币，但是你永远不会知道有多长时间…
              </span>
            </p>
          </div>
        )}
      </Container>
    </Container>
  );
};

export default History;
