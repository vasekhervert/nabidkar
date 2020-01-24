import React from "react";
import { Column } from "@bit/digiaonline.react-foundation.grid";

export default function Select({ value, choices, columns, name, idx }) {
  function changeValue(e) {
    const clickedElement = document.getElementById(e.target.id);
    const targetElement = document.getElementById(`${name}-${idx}`);

    targetElement.setAttribute("value", clickedElement.getAttribute("value"));
  }
  return (
    <Column large={columns}>
      <div className="select">
        {choices.map(choice => (
          <span
            key={choice}
            name={name}
            index={idx}
            value={choice}
            id={`${choice}-${idx}`}
            className={
              value === choice ? "select-choice selected" : "select-choice"
            }
            onClick={changeValue}
          >
            {choice}
          </span>
        ))}
      </div>
    </Column>
  );
}
