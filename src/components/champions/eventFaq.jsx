import React from "react";
import { Accordion, Card } from "react-bootstrap";
import { eventFaqText } from "./text/eventFaq";


const EventFaq = ({lang}) => {
  
  return ( 
    <div>
        <br />
        
        <h3 className="display-5"><strong>EVENT FAQ </strong></h3>
        <Accordion>
          {eventFaqText.map(t => (
            <Card key={t.id}>
              <Accordion.Toggle as={Card.Header} variant="link" eventKey={t.id}>
                {t.textEng.title}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={t.id}>
                <Card.Body>{t.textEng.text}</Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
          
        </Accordion>
      </div>
   );
}
 




export default EventFaq;
