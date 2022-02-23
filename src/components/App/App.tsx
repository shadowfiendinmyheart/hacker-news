import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import AuthRouter from "../AuthRouter/AuthRouter";
import Header from "../Header/Header";

import styles from "./App.module.scss";

const App = () => {
  return (
    <div className={styles.wrapper}>
      <BrowserRouter>
        <Header />
        <Switch>
          <AuthRouter />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
