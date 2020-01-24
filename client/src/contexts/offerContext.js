import React, { createContext, useContext, useState } from "react";

export const OfferContext = createContext();
export const OfferContextProvider = ({ children }) => {
  const [offerValue, setOfferValue] = useState({
    offerStatus: "filling",
    offerTotal: {
      totalPrice: "0",
      totalVat: "0",
      totalPriceVat: "0"
    },
    offerImage: null,
    offerLink: ""
  });

  return (
    <OfferContext.Provider value={{ offerValue, setOfferValue }}>
      {children}
    </OfferContext.Provider>
  );
};

export const useOfferValue = () => useContext(OfferContext);
