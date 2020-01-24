import React from "react";
import { Row, Column } from "../components/Grid";

export default function ItemOutput({ value, columns }) {
  const val = Number(value).toFixed(2);
  return (
    <Column large={columns}>
      <div className="item-output">{val}</div>
    </Column>
  );
}
