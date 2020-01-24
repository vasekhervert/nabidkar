import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useOfferValue } from "../contexts";

export default function DragDrop() {
  const [status, setStatus] = useState("Přetáhněte obrázek z počítače");
  const [preview, setPreview] = useState(null);
  const { offerValue, setOfferValue } = useOfferValue();

  const onDragEnter = e => {
    setStatus("Můžete pustit obrázek");
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragLeave = e => {
    setStatus("Přetáhněte obrázek z počítače");
    e.preventDefault();
  };

  const onDragOver = e => {
    setStatus("Můžete pustit obrázek");
    e.preventDefault();
  };

  const onDrop = e => {
    const supportedFilesTypes = ["image/jpeg", "image/png"];
    const { type } = e.dataTransfer.files[0];
    if (supportedFilesTypes.indexOf(type) > -1) {
      const reader = new FileReader();
      reader.onload = e => {
        setOfferValue(prevState => ({
          ...prevState,
          offerImage: e.target.result
        }));
        setStatus("");
      };
      reader.readAsDataURL(e.dataTransfer.files[0]);
    }
    e.preventDefault();
  };

  const clearDropArea = () => {
    setOfferValue(prevState => ({
      ...prevState,
      offerImage: null
    }));
    setStatus("Přetáhněte obrázek z počítače");
  };

  return (
    <div
      className={`drop-area ${
        status === "Můžete pustit obrázek" ? "over" : ""
      } ${offerValue.offerImage !== null ? "preview-on" : ""}`}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {offerValue.offerImage !== null ? (
        <div
          className="preview"
          style={{ backgroundImage: `url(${offerValue.offerImage})` }}
        >
          <span
            className="delete-image"
            onClick={() => {
              clearDropArea();
            }}
          >
            <FaTrashAlt />
          </span>
        </div>
      ) : (
        ""
      )}
      {status !== "" ? <span>{status}</span> : ""}
    </div>
  );
}
