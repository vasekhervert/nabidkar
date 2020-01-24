import React from "react";
import { Column } from "@bit/digiaonline.react-foundation.grid";

export default function ItemOutput({ value, columns }) {
  const val = Number(value).toFixed(2);
  return (
    <Column large={columns}>
      <div className="item-output">{val}</div>
    </Column>
  );
}
