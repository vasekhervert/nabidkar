import React from "react";
import { OfferContextProvider } from "../contexts";
import OfferHead from "./OfferHead";
import OfferParties from "./OfferParties";
import OfferItems from "./OfferItems";
import Input from "./Input";
import { Row, Column } from "@bit/digiaonline.react-foundation.grid";
import OfferActions from "./OfferActions";

export default function OfferPage() {
  return (
    <OfferContextProvider>
      <div className="content-wrap">
        <Row className="m1">
          <OfferHead />
        </Row>
        <Row className="m1">
          <OfferParties />
        </Row>
        <Row className="m1">
          <OfferItems />
        </Row>

        <Row className="m1">
          <Column large={12}>
            <div className="panel">
              <Row>
                <Column large={4}>
                  <Input label="Vystavil" type="text" id="offerAuthor" />
                </Column>
                <Column large={8}>
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
        <Row className="m1">
          <OfferActions />
        </Row>
      </div>
    </OfferContextProvider>
  );
}
