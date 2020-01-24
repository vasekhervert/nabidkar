import React from "react";

import { Row, Column } from "../components/Grid";
import ItemInput from "./ItemInput";
import ItemOutput from "./ItemOutput";
import { FaTrashAlt } from "react-icons/fa";

export default function OfferItem({ item, items, idx, setItems }) {
  function onTextInputChange(e) {
    let newItems = [...items];
    newItems[e.target.dataset.index][e.target.name] = e.target.value;

    if (e.target.name !== "name") {
      //pokud pole neni jmeno, budeme pocitat
      const currentItem = newItems[e.target.dataset.index]; //polozka, kterou budeme pocitat
      const price =
        Number(currentItem.count) * Number(currentItem.regularPrice);
      let sale;

      if (currentItem.saleType === "%") {
        sale = (price / 100) * currentItem.sale;
      } else {
        sale = currentItem.sale;
      }

      function round(value, decimals) {
        //funkce pro spravne zaokrouhlovani desetinnych cisel
        return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
      }

      const exactPrice = price - sale;
      currentItem.price = round(exactPrice, 2);

      const exactPriceVat = (exactPrice / 100) * currentItem.vatRate;
      currentItem.priceVat = round(exactPriceVat, 2);

      const exactTotalPrice =
        Number(currentItem.priceVat) + Number(currentItem.price);
      currentItem.totalPrice = round(exactTotalPrice, 2);
    }
    setItems({ items: newItems });
  }

  function handleDelete(idx) {
    const newItems = items.filter((item, index) => {
      if (idx !== index) {
        return item;
      }
    });

    setItems({ items: newItems });
  }

  return (
    <Row classes="offer-item">
      {idx !== 0 ? (
        <div
          className="delete-item"
          onClick={() => {
            handleDelete(idx);
          }}
        >
          <FaTrashAlt />
        </div>
      ) : (
        ""
      )}
      <ItemInput
        type="text"
        name="name"
        value={item.name}
        columns={4}
        idx={idx}
        onChangeFunction={onTextInputChange}
      />
      <ItemInput
        type="number"
        name="count"
        value={item.count}
        columns={1}
        idx={idx}
        onChangeFunction={onTextInputChange}
      />
      <ItemInput
        type="number"
        name="regularPrice"
        value={item.regularPrice}
        columns={1}
        idx={idx}
        onChangeFunction={onTextInputChange}
      />
      <ItemInput
        type="number"
        name="sale"
        value={item.sale}
        columns={1}
        idx={idx}
        onChangeFunction={onTextInputChange}
      />
      <ItemInput
        type="select"
        name="saleType"
        choices={["%", "Kč"]}
        value={item.saleType}
        columns={1}
        idx={idx}
        onChangeFunction={onTextInputChange}
      />
      <ItemOutput value={item.price} columns={1} />
      <ItemInput
        type="select"
        name="vatRate"
        choices={["15", "21", "0"]}
        value={item.vatRate}
        columns={1}
        idx={idx}
        onChangeFunction={onTextInputChange}
      />
      <ItemOutput value={item.priceVat} columns={1} />
      <ItemOutput value={item.totalPrice} columns={1} />
    </Row>
  );
}
