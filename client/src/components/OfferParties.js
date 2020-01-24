import React from "react";
import Input from "./Input";
import { Row, Column } from "@bit/digiaonline.react-foundation.grid";

export default function OfferParties() {
  return (
    <>
      <Column large={6}>
        <div className="panel left">
          <span className="part-hl">Dodavatel:</span>
          <Input label="Jméno/Firma" type="text" id="sellerName" />
          <Row>
            <Column large={6}>
              <Input label="IČ" type="text" id="sellerIco" />
            </Column>
            <Column large={6}>
              <Input label="DIČ" type="text" id="sellerDic" />
            </Column>
          </Row>
          <Input label="Ulice a č.p." type="text" id="sellerStreet" />
          <Row>
            <Column large={6}>
              <Input label="Město" type="text" id="sellerCity" />
            </Column>
            <Column large={6}>
              <Input label="PSČ" type="text" id="sellerPostcode" />
            </Column>
          </Row>
        </div>
      </Column>

      <Column large={6}>
        <div className="panel right">
          <span className="part-hl">Odběratel:</span>
          <Input label="Jméno/Firma" type="text" id="buyerName" />
          <Row>
            <Column large={6}>
              <Input label="IČ" type="text" id="buyerIco" />
            </Column>
            <Column large={6}>
              <Input label="DIČ" type="text" id="buyerDic" />
            </Column>
          </Row>
          <Input label="Ulice a č.p." type="text" id="buyerStreet" />
          <Row>
            <Column large={6}>
              <Input label="Město" type="text" id="buyerCity" />
            </Column>
            <Column large={6}>
              <Input label="PSČ" type="text" id="buyerPostcode" />
            </Column>
          </Row>
        </div>
      </Column>
    </>
  );
}
