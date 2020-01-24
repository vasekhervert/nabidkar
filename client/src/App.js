import React from "react";
import Home from "./components/Home";
import OfferPage from "./components/OfferPage";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create-offer" component={OfferPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
