import React, { useEffect } from "react";
import { Row, Column } from "@bit/digiaonline.react-foundation.grid";
import { useOfferValue } from "../contexts";

export default function TotalPrice({ items }) {
  const { offerValue, setOfferValue } = useOfferValue();
  useEffect(() => {
    const { total, vat, totalVat } = countOfferTotal();
    setOfferValue(prevState => ({
      ...prevState,
      offerTotal: {
        totalPrice: total,
        totalVat: vat,
        totalPriceVat: totalVat
      }
    }));
  }, [items]);

  function countOfferTotal() {
    const total = items.items.reduce((acc, el) => {
      acc += Number(el.price);
      return acc;
    }, 0);
    const vat = items.items.reduce((acc, el) => {
      acc += Number(el.priceVat);
      return acc;
    }, 0);
    const totalVat = Number(total) + Number(vat);
    return { total, vat, totalVat };
  }
  return (
    <>
      <Row>
        <Column large={6}>Cena celkem bez DPH:</Column>
        <Column large={6}>
          <div className="total">{offerValue.offerTotal.totalPrice}</div>
        </Column>
      </Row>
      <Row>
        <Column large={6}>DPH:</Column>
        <Column large={6}>
          <div className="total">
            {Number(offerValue.offerTotal.totalVat).toFixed(2) || 0}
          </div>
        </Column>
      </Row>
      <Row>
        <Column large={6}>Cena celkem s DPH:</Column>
        <Column large={6}>
          <div className="total">
            {Number(offerValue.offerTotal.totalPriceVat).toFixed(2) || 0}
          </div>
        </Column>
      </Row>
    </>
  );
}
