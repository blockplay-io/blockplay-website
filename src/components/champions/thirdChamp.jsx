import React from "react";
import QRCode from "qrcode.react";


import { convertNumericIdToAddress, sumNQTStringToNumber } from "@burstjs/util";
import { copyToClip } from "./funcions/funcions";

import Marquee from 'react-text-marquee';


import Container from "react-bootstrap/Container";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Champ = ({
  background,
  title,
  atAddress,
  defending,
  fighting,
  unConfTrans,
  weight,
  ownersList,
  lang,
  fun,
  explorer,
  name,
  smallestName,
  smallests,
  event
}) => {
  let atAddressString = convertNumericIdToAddress(atAddress);
  let defenderAddress = convertNumericIdToAddress(defending);
  const smallestAddress = smallests ? convertNumericIdToAddress(smallests[0]): null
  
  return (
    <React.Fragment>
      <Container
        fluid
        className="mbr-fonts-style mbr-fullscreen justify-content-center"
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat:"no-repeat",
          backgroundSize: "cover"
        }}
      >
        
        <div className="mbr-overlay" style={{opacity: "0.5", backgroundColor: "rgb(15, 0, 0)"}}></div>
        <Container>
          <h3 className="display-5 text-light ml-5">{title}{fun && " FUN"}</h3>
          <Container>
          { smallests ? <Button
                className="btn-lg btn-info text-left text-white btn-block"
                target="_blank"
                
                rel="noopener noreferrer"
                href={explorer + smallests[0]}
              >
               
                  <div>Lucky winner </div>
                 <strong>{smallestName} {smallestAddress} {smallests[1] ? smallests[1] + " BURST": null } </strong>
                
              </Button> : event ?
              <Button
                className="btn-lg btn-info text-left text-white btn-block"
              >
                <div>Lucky Winner</div>
                No particepants in the event
              </Button> : null
            }
            <div onClick={() => copyToClip(atAddressString)}>
              <div
                className="btn-group btn-block"
                role="group"
                aria-label="Button group with nested information"
              >
                <Button className="btn-lg btn-info text-left text-white">
                  {lang === "eng" ? (
                    <div>Smart contract address, send BURST to challenge</div>
                  ) : (
                    <div>智能合同地址，发送Burst以挑战</div>
                  )}
                  <div>
                    <strong>{atAddressString}</strong>
                  </div>
                </Button>
                <QRCode value={atAddressString} className="border" />
              </div>
            </div>
            
              <Button
                className="btn-lg btn-info text-left text-white btn-block"
                target="_blank"
                
                rel="noopener noreferrer"
                href={explorer + defending}
              >
                {lang === "eng" ? (
                  <div>Defending champion</div>
                ) : (
                  <div>卫冕冠军</div>
                )}
                <div>
                  <strong>{name} {defenderAddress}</strong> {/*  id="champ1" */}
                </div>
              </Button>

              

            
              <Button
                block
                className="btn-lg btn-info text-left text-white"
               
                target="_blank"
                rel="noopener noreferrer"
                href={explorer + atAddress}
              >
                 <Marquee loop hoverToStop text={lang === "eng" ? (
                    !fighting && unConfTrans.length === 0 ? (
                      "Waiting for challenge"
                    ) : fighting ? (
                      
                        "Fighting on-chain!"
                      
                    ) : (
                      <span>
                        {`Next fight | finale ${unConfTrans.map(
                          t =>
                            t.senderRS.substring(21) +
                            " (" +
                            sumNQTStringToNumber(t.amountNQT) +
                            " BURST," +
                            ` ${Math.ceil(
                              (sumNQTStringToNumber(t.amountNQT) /
                                (weight + sumNQTStringToNumber(t.amountNQT))) *
                                100
                            )} % Chanse) `
                        )}`}{" "}
                      </span>
                    )
                  ) : !fighting && unConfTrans.length === 0 ? (
                    <span>等待挑战者</span>
                  ) : fighting ? (
                    <span>
                      <i>Fighting</i> on-chain!(no translation )
                    </span>
                  ) : (
                    <span>
                      {`Next fight | finale ${unConfTrans.map(
                        t =>
                          t.senderRS.substring(21) +
                          " (" +
                          sumNQTStringToNumber(t.amountNQT) +
                          " BURST," +
                          ` ${Math.ceil(
                            (sumNQTStringToNumber(t.amountNQT) /
                              (weight + sumNQTStringToNumber(t.amountNQT))) *
                              100
                          )} % Chanse) `
                      )}`}{" "}
                    </span>
                  )} />
                                 
                
              </Button>
            
            <Card className="lead ml-4">
           
          <Marquee loop hoverToStop text={ownersList.toString()} />
          
          </Card>
          </Container>
          
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default Champ;
