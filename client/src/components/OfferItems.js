import React, { useState, useEffect } from "react";
import { Row, Column } from "../components/Grid";
import OfferItem from "./OfferItem";
import Button from "./Button";
import TotalPrice from "./TotalPrice";
import { useOfferValue } from "../contexts";

export default function OfferItems() {
  const [items, setItems] = useState({
    items: [
      {
        name: "",
        count: "",
        regularPrice: "",
        sale: "",
        saleType: "%",
        price: "",
        vatRate: "15",
        priceVat: "",
        totalPrice: ""
      }
    ]
  });

  const { setOfferValue } = useOfferValue();

  useEffect(() => {
    setOfferValue(prevState => ({
      ...prevState,
      offerItems: items.items
    }));
  }, [items]);

  function handleAddItem(e) {
    e.preventDefault();

    setItems(prevState => ({
      items: [
        ...prevState.items,
        {
          name: "",
          count: "",
          regularPrice: "",
          sale: "",
          saleType: "%",
          price: "",
          vatRate: "15",
          priceVat: "",
          totalPrice: ""
        }
      ]
    }));
  }

  return (
    <Column large={12}>
      <div className="panel">
        <Row classes="table-head">
          <Column large={4}>Název položky</Column>
          <Column large={1}>Množství</Column>
          <Column large={1}>Cena ks</Column>
          <Column large={1}>Sleva</Column>
          <Column large={1}>Typ slevy</Column>
          <Column large={1}>Cena</Column>
          <Column large={1}>Sazba DPH</Column>
          <Column large={1}>DPH</Column>
          <Column large={1}>Celkem</Column>
        </Row>

        {items.items.map((item, index) => (
          <OfferItem
            key={index}
            item={item}
            items={items.items}
            setItems={setItems}
            idx={index}
          />
        ))}
        <Row>
          <Column large={8}>
            <Button classes="primary" action={handleAddItem}>
              Přidat položku
            </Button>
          </Column>
          <Column large={4}>
            <TotalPrice items={items} />
          </Column>
        </Row>
      </div>
    </Column>
  );
}
