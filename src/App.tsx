import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import AuthRouter from "./components/AuthRouter/AuthRouter";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRouter />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
