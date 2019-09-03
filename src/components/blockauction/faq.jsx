import React from "react";
import { Accordion, Card } from "react-bootstrap";
import { faqText } from "./text/faq";

const faq = ({ lang }) => {
  return (
    <div>
      <h3 className="display-5">
        <strong>{lang === "eng" ? "FAQ" : "常问问题"}</strong>
      </h3>
      <Accordion>
        {lang === "eng"
          ? faqText.map(t => (
              <Card key={t.id}>
                <Accordion.Toggle
                  as={Card.Header}
                  variant="link"
                  eventKey={t.id}
                >
                  {t.textEng.title}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={t.id}>
                  <Card.Body>{t.textEng.text}</Card.Body>
                </Accordion.Collapse>
              </Card>
            ))
          : faqText.map(t => (
              <Card key={t.id}>
                <Accordion.Toggle
                  as={Card.Header}
                  variant="link"
                  eventKey={t.id}
                >
                  {t.textCh.title}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={t.id}>
                  <Card.Body>{t.textCh.text}</Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
      </Accordion>
    </div>
  );
};

export default faq;
