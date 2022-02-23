import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import AuthRouter from "../AuthRouter/AuthRouter";

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
