import React from "react";
import { OfferContextProvider } from "../contexts";
import OfferHead from "./OfferHead";
import OfferSubject from "./OfferSubject";
import OfferItems from "./OfferItems";
import Input from "./Input";
import { Row, Column } from "../components/Grid";
import OfferActions from "./OfferActions";

export default function OfferPage() {
  return (
    <OfferContextProvider>
      <div className="content-wrap">
        <Row classes="m1">
          <OfferHead />
        </Row>
        <Row classes="m1">
          <OfferSubject subjectName="Dodavatel" subjectPrefix="seller" />
          <OfferSubject subjectName="Odběratel" subjectPrefix="buyer" />
        </Row>
        <Row classes="m1">
          <OfferItems />
        </Row>

        <Row classes="m1">
          <Column large={12}>
            <div className="panel">
              <Row>
                <Column large={3}>
                  <Input label="Vystavil" type="text" id="offerAuthor" />
                </Column>
                <Column large={9}>
                  <Input
                    label="Text v patičce nabídky"
                    type="text"
                    id="offerFooter"
                  />
                </Column>
              </Row>
            </div>
          </Column>
        </Row>
        <Row classes="m1">
          <OfferActions />
        </Row>
      </div>
    </OfferContextProvider>
  );
}
