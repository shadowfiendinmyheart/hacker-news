import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import RefreshButton from "../../components/RefreshButton/RefreshButton";
import StoryElement from "../../components/StoryElement/StoryElement";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchStories,
  refreshStories,
} from "../../store/actionCreators/AppActionCreator";
import { appSlice } from "../../store/reducers/AppSlice";
import { ROUTES } from "../../constants/routes";
import { REFRESH_TIME } from "../../constants";

import styles from "./MainPage.module.scss";

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { clearStories } = appSlice.actions;
  const { stories, isLoading, isUpdating, error } = useAppSelector(
    (state) => state.appReducer
  );

  useEffect(() => {
    dispatch(fetchStories());

    const refresher = setInterval(() => {
      dispatch(refreshStories());
    }, REFRESH_TIME);

    return () => {
      dispatch(clearStories());
      clearInterval(refresher);
    };
  }, [dispatch, clearStories]);

  const handleRefreshButtonClick = () => {
    dispatch(refreshStories());
  };

  if (error) {
    return <Redirect to={ROUTES.ERROR_PAGE} />;
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className={styles.wrapper}>
      <RefreshButton
        onClick={handleRefreshButtonClick}
        disabled={isUpdating}
        isUpdating={isUpdating}
      />
      <div className={styles.stories}>
        {stories.map((story) => {
          return story && <StoryElement key={story.id} {...story} />;
        })}
      </div>
    </div>
  );
};

export default MainPage;
