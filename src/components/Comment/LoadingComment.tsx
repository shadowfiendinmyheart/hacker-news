import React from "react";
import Hypnosis from "react-cssfx-loading/lib/Hypnosis";
import { LOADER_COLOR } from "../../constants";

import styles from "./Comment.module.scss";

const LoadingComment: React.FC = () => {
  return (
    <div className={styles.loading}>
      <Hypnosis width="30px" height="30px" color={LOADER_COLOR} />
    </div>
  );
};

export default LoadingComment;
