import React from "react";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <h1 className={styles.title}>Hacker news</h1>
    </header>
  );
};

export default Header;
