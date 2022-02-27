import React from "react";
import { RiMoreFill } from "react-icons/ri";

import styles from "./MoreButton.module.scss";

const MoreButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  ...props
}) => {
  return (
    <button className={styles.button} {...props}>
      <RiMoreFill />
    </button>
  );
};

export default MoreButton;
