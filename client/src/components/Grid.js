import React from "react";

export function Row({ classes, children }) {
  return <div className={`row ${classes}`}>{children}</div>;
}

export function Column({ children, large }) {
  return <div className={`columns large-${large}`}>{children}</div>;
}
