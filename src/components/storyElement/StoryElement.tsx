import React from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { Story } from "../../models/Story.model";
import { formatTime } from "../../utils/time";

import styles from "./StoryElement.module.scss";

type StoryProps = Pick<Story, "title" | "score" | "by" | "time" | "id">;

const StoryElement: React.FC<StoryProps> = ({ title, score, by, time, id }) => {
  return (
    <article className={styles.shadow}>
      <Link to={`${ROUTES.STORY_PAGE.slice(0, -3)}${id}`}>
        <div className={styles.wrapper}>
          <div className={styles.score}>
            <AiFillStar />
            <span>{score}</span>
          </div>
          <div className={styles.about}>
            <h2 className={styles.title}>{title}</h2>
            <span className={styles.author}>{by}</span>
            <time className={styles.time}>{formatTime(time)}</time>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default StoryElement;
