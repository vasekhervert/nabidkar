import React from "react";
import { Row, Column } from "../components/Grid";

export default function ItemInput({
  type,
  onChangeFunction,
  value,
  choices,
  columns,
  name,
  idx
}) {
  if (type === "select") {
    return (
      <Column large={columns}>
        <select
          name={name}
          value={value}
          onChange={onChangeFunction}
          data-index={idx}
        >
          {choices.map(choice => (
            <option key={choice}>{choice}</option>
          ))}
        </select>
      </Column>
    );
  } else {
    return (
      <Column large={columns}>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChangeFunction}
          autoComplete="off"
          data-index={idx}
        />
      </Column>
    );
  }
}
