import React from "react";
import Hypnosis from "react-cssfx-loading/lib/Hypnosis";

import styles from "./LoadingPage.module.scss";

const LoadingPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Hypnosis width="100px" height="100px" color="#D4D4D4" />
    </div>
  );
};

export default LoadingPage;
