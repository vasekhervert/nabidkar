import React from "react";
import Button from "./Button";
import Modal from "./Modal";
import { FaSpinner, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useOfferValue } from "../contexts";

export default function OfferActions() {
  const { offerValue, setOfferValue } = useOfferValue();

  async function createPdf(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    });
    return await response.json();
  }
  const createOutput = () => {
    setOfferValue(prevState => ({
      ...prevState,
      offerStatus: "creating"
    }));

    createPdf("/create-pdf", offerValue)
      .then(response => {
        setOfferValue(prevState => ({
          ...prevState,
          offerStatus: "done",
          offerLink: response.Location
        }));
      })
      .catch(err => {
        setOfferValue(prevState => ({
          ...prevState,
          offerStatus: "error"
        }));
        console.log(err);
      });
  };

  const closeModal = () => {
    setOfferValue(prevState => ({
      ...prevState,
      offerStatus: "filling"
    }));
  };
  return (
    <div>
      <Button classes="success centered" action={() => createOutput()}>
        Vytvořit PDF
      </Button>
      {offerValue.offerStatus !== "filling" ? (
        <Modal styles={offerValue.offerStatus} closeAction={() => closeModal()}>
          {offerValue.offerStatus === "creating" ? (
            <div className="offer-create">
              <FaSpinner />
              <p>Vaše nabídka se připravuje...</p>
            </div>
          ) : offerValue.offerStatus === "done" ? (
            <div className="offer-create">
              <FaCheckCircle />
              <p>Vaše nabídka je připravena.</p>
              <a href={offerValue.offerLink} className="button primary">
                Stáhnout nabídku<span>(.pdf)</span>
              </a>
              <span className="link center" onClick={() => closeModal()}>
                Zavřít
              </span>
            </div>
          ) : (
            <div className="offer-create">
              <FaTimesCircle />
              <p>Něco se pokazilo. Zkuste to prosím znovu.</p>
              <span className="link" onClick={() => closeModal()}>
                Zavřít
              </span>
            </div>
          )}
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
