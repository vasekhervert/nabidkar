import React from "react";

import Input from "./Input";
import { Row, Column } from "../components/Grid";
import DragDrop from "./DragDrop";

export default function OfferHead() {
  return (
    <>
      <Column large={4}>
        <DragDrop />
      </Column>
      <Column large={8}>
        <Row className="display">
          <Column large={4}>
            <Input label="Číslo nabídky" type="number" id="offerNumber" />
          </Column>
          <Column large={4}>
            <Input label="Datum vystavení" type="date" id="offerDate" />
          </Column>
          <Column large={4}>
            <Input label="Platná do" type="date" id="offerValitTill" />
          </Column>
        </Row>
      </Column>
    </>
  );
}
