import React from "react";
import { useOfferValue } from "../contexts";

export default function Input({ id, label, type }) {
  const { offerValue, setOfferValue } = useOfferValue();

  function handleInputChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setOfferValue(prevState => ({ ...prevState, [name]: value }));
  }

  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        value={offerValue[id] || ""}
        onChange={handleInputChange}
        autoComplete="off"
      />
    </div>
  );
}
