import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import CommentsContainer from "../CommentsContainer/CommentsContainer/CommentsContainer";
import MoreButton from "../MoreButton/MoreButton";
import LoadingComment from "./LoadingComment";
import { fetchComment } from "../../store/actionCreators/StoryActionCreator";
import { formatTime } from "../../utils/time";

import styles from "./Comment.module.scss";

interface CommentProps {
  commentId: number;
}

const Comment: React.FC<CommentProps> = ({ commentId }) => {
  const [isOpened, setOpened] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector((state) => state.storyReducer);
  const comment = comments.find((c) => c?.id === commentId);

  useEffect(() => {
    if (!comment) {
      dispatch(fetchComment(commentId));
    }
  }, [comment, commentId, dispatch]);

  const handleOpenButtonClick = () => {
    setOpened(!isOpened);
  };

  if (!comment) {
    return <LoadingComment />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <span className={styles.author}>{comment.by}</span>
        <time>{formatTime(comment.time)}</time>
      </div>
      {comment.text ? (
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.text) }}
        />
      ) : (
        <div>НЛО прилетело и опубликовало эту надпись здесь.</div>
      )}
      {comment.kids && <MoreButton onClick={handleOpenButtonClick} />}
      {isOpened && <CommentsContainer commentIds={comment.kids} />}
    </div>
  );
};

export default Comment;
