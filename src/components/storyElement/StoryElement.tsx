import React from "react";
import { Story } from "../../models/Story.model";

type StoryProps = Pick<Story, "title" | "score" | "by" | "time">;

const StoryElement: React.FC<StoryProps> = ({ title, score, by, time }) => {
  return (
    <>
      <h3>{title}</h3>
      <h5>{by}</h5>
      <p>{time}</p>
      <p>{score}</p>
    </>
  );
};

export default StoryElement;
