import React from "react";

export function Row({ classes, children }) {
  return <div className={`row ${classes ? classes : ""}`}>{children}</div>;
}

export function Column({ children, large, classes }) {
  return (
    <div className={`columns large-${large} ${classes ? classes : ""}`}>
      {children}
    </div>
  );
}
