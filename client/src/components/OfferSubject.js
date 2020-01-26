import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Modal from "./Modal";
import { Row, Column } from "../components/Grid";
import { useOfferValue } from "../contexts";

export default function OfferSubject({ subjectName, subjectPrefix }) {
  const [showModal, setShowModal] = useState(false);
  const { offerValue } = useOfferValue();
  return (
    <>
      <Column large={6}>
        <div className="panel">
          <Row>
            <Column large={6}>
              <span className="part-hl">{subjectName}:</span>
            </Column>
            <Column large={6}>
              {`${subjectPrefix}Name` in offerValue ? (
                <span className="link right" onClick={() => setShowModal(true)}>
                  Upravit {subjectName}e
                </span>
              ) : (
                ""
              )}
            </Column>
          </Row>
          <div className="offer-subject">
            {`${subjectPrefix}Name` in offerValue ? (
              <div className="offer-subject--content">
                <span className="offer-subject-name">
                  {offerValue[subjectPrefix + "Name"]}
                </span>
                <span>{offerValue[subjectPrefix + "Street"]}</span>
                <span className="mb">
                  {offerValue[subjectPrefix + "City"]}{" "}
                  {offerValue[subjectPrefix + "Postcode"]}
                </span>
                <span>IČ:{offerValue[subjectPrefix + "Ico"]}</span>
                <span>DIČ: {offerValue[subjectPrefix + "Dic"]}</span>
              </div>
            ) : (
              <div className="offer-subject--content empty">
                <p>{subjectName} není vyplněn</p>
                <Button action={() => setShowModal(true)}>
                  Vyplnit {subjectName}e
                </Button>
              </div>
            )}
          </div>
        </div>
      </Column>
      {showModal && (
        <Modal>
          <span className="part-hl">{subjectName}:</span>
          <Row>
            <Column large={12}>
              <Input
                label="Jméno/Firma"
                type="text"
                id={`${subjectPrefix}Name`}
              />
            </Column>
          </Row>
          <Row>
            <Column large={12}>
              <Input
                label="Ulice a č.p."
                type="text"
                id={`${subjectPrefix}Street`}
              />
            </Column>
          </Row>
          <Row>
            <Column large={6}>
              <Input label="Město" type="text" id={`${subjectPrefix}City`} />
            </Column>
            <Column large={6}>
              <Input label="PSČ" type="text" id={`${subjectPrefix}Postcode`} />
            </Column>
          </Row>
          <Row>
            <Column large={6}>
              <Input label="IČ" type="text" id={`${subjectPrefix}Ico`} />
            </Column>
            <Column large={6}>
              <Input label="DIČ" type="text" id={`${subjectPrefix}Dic`} />
            </Column>
          </Row>
          <Row>
            <Column large={6}>
              <span className="link" onClick={() => setShowModal(false)}>
                Zavřít
              </span>
            </Column>
            <Column large={6} classes="text-right">
              <Button classes="success" action={() => setShowModal(false)}>
                Hotovo
              </Button>
            </Column>
          </Row>
        </Modal>
      )}
    </>
  );
}
