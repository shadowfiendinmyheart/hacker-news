import React from "react";
import { useParams } from "react-router-dom";

const StoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return <h1>StoryPage {id}</h1>;
};

export default StoryPage;
