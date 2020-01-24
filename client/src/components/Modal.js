import React from "react";
import { useOfferValue } from "../contexts";

export default function Modal({ children, styles }) {
  return (
    <div className="modal-overlay">
      <div className={`modal-panel ${styles}`}>{children}</div>
    </div>
  );
}
