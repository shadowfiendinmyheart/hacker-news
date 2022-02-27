import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

import styles from "./HomeButton.module.scss";

const HomeButton: React.FC = () => {
  return (
    <Link to={ROUTES.MAIN_PAGE} className={styles.button}>
      <FaHome size={"27px"} />
    </Link>
  );
};

export default HomeButton;
