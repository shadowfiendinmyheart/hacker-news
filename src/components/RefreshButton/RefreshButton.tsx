import React from "react";
import Hypnosis from "react-cssfx-loading/lib/Hypnosis";
import { BiRefresh } from "react-icons/bi";

import styles from "./RefreshButton.module.scss";

interface RefreshButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isUpdating?: boolean;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({
  isUpdating,
  ...props
}) => {
  return (
    <button {...props} className={styles.button}>
      <div className={styles.icon}>
        {isUpdating ? (
          <div className={styles.loader}>
            <Hypnosis width="30px" height="30px" color="#D4D4D4" />
          </div>
        ) : (
          <BiRefresh size={"30px"} />
        )}
      </div>
    </button>
  );
};

export default RefreshButton;
