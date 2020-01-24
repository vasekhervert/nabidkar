import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="homepage-wrap">
        <div className="container">
          <h1>Nabídkář</h1>
          <p className="description">Aplikace pro tvorbu prodejních nabídek</p>

          <Link to="create-offer">
            <Button classes="primary cta">Vytvořit nabídku</Button>
          </Link>
        </div>
      </div>
      <div className="copyright">
        <span>Verze: 1.0.0</span>
        <span>
          Vytvořil <a href="http://simpled.cz/">Václav Hervert</a>
        </span>
      </div>
    </>
  );
}
