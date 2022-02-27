import React from "react";
import HomeButton from "../../components/HomeButton/HomeButton";

import styles from "./ErrorPage.module.scss";

const ErrorPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>¯\_(ツ)_/¯</h1>
      <h2>404 story</h2>
      <p>Page not found</p>
      <HomeButton />
    </div>
  );
};

export default ErrorPage;
