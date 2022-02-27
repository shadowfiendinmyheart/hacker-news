import React from "react";
import Comment from "../../Comment/Comment";

import styles from "./CommentsContainer.module.scss";

interface CommentsContainerProps {
  commentIds: number[];
}

const CommentsContainer: React.FC<CommentsContainerProps> = ({
  commentIds,
}) => {
  return (
    <div className={styles.container}>
      {commentIds.map((commentId) => {
        return <Comment key={commentId} commentId={commentId} />;
      })}
    </div>
  );
};

export default CommentsContainer;
