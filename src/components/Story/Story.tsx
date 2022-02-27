import React from "react";
import { AiFillStar } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { Story as StoryProps } from "../../models/Story.model";
import { formatTime } from "../../utils/time";

import styles from "./Story.module.scss";

const Story: React.FC<StoryProps> = ({ title, url, by, score, time }) => {
  return (
    <article className={styles.wrapper}>
      <header>
        <a className={styles.source} href={url}>
          [Source]
        </a>
        <h1>{title}</h1>
      </header>
      <div title="author" className={styles.row}>
        <FaUser />
        <span>: {by}</span>
      </div>
      <div title="score" className={styles.row}>
        <AiFillStar />
        <span>: {score}</span>
      </div>
      <div title="created" className={styles.row}>
        <MdAccessTimeFilled />
        <time>: {formatTime(time)}</time>
      </div>
    </article>
  );
};

export default Story;
