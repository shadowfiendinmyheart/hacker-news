import React, { useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import Story from "../../components/Story/Story";
import LoadingPage from "../LoadingPage/LoadingPage";
import Comment from "../../components/Comment/Comment";
import HomeButton from "../../components/HomeButton/HomeButton";
import RefreshButton from "../../components/RefreshButton/RefreshButton";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  initStory,
  refreshComments,
} from "../../store/actionCreators/StoryActionCreator";
import { storySlice } from "../../store/reducers/StorySlice";
import { ROUTES } from "../../constants/routes";
import { REFRESH_TIME } from "../../constants";

import styles from "./StoryPage.module.scss";

const StoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { clearStory } = storySlice.actions;
  const dispatch = useAppDispatch();
  const { story, comments, isLoading, error, isUpdating } = useAppSelector(
    (state) => state.storyReducer
  );

  useEffect(() => {
    dispatch(initStory(Number(id)));

    const refresher = setInterval(() => {
      dispatch(refreshComments());
    }, REFRESH_TIME);

    return () => {
      dispatch(clearStory());
      clearInterval(refresher);
    };
  }, [dispatch, id, clearStory]);

  const handleRefreshButtonClick = () => {
    dispatch(refreshComments());
  };

  if (error) {
    return <Redirect to={ROUTES.ERROR_PAGE} />;
  }

  if (isLoading || !story.id) {
    return <LoadingPage />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.home_button}>
        <HomeButton />
      </div>
      <Story {...story} />
      <div className={styles.comments_header}>
        <RefreshButton
          disabled={isUpdating}
          isUpdating={isUpdating}
          onClick={handleRefreshButtonClick}
        />
        <div>
          <h2>Comments:</h2>
          <span>Counter: {comments.length}</span>
        </div>
      </div>
      {story.kids.map((commentId) => {
        return <Comment key={commentId} commentId={commentId} />;
      })}
    </div>
  );
};

export default StoryPage;
