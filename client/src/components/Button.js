import React from "react";

export default function Button({ children, classes, action }) {
  return (
    <button className={classes} onClick={action}>
      {children}
    </button>
  );
}
