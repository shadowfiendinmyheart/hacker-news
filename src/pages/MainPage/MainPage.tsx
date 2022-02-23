import React, { useEffect } from "react";
import StoryElement from "../../components/StoryElement/StoryElement";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchStories,
  refreshStories,
} from "../../store/actionCreators/AppActionCreator";
import { appSlice } from "../../store/reducers/AppSlice";

import styles from "./MainPage.module.scss";

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { storiesFilter } = appSlice.actions;
  const { stories, isLoading, error } = useAppSelector(
    (state) => state.appReducer
  );

  useEffect(() => {
    dispatch(fetchStories());

    const refresher = setInterval(() => {
      console.log("refreshing...");
      dispatch(refreshStories());
    }, 60000);

    return () => {
      clearInterval(refresher);
    };
  }, [dispatch, storiesFilter]);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.stories}>
        {stories.map((story) => {
          return story && <StoryElement key={story.id} {...story} />;
        })}
      </div>
    </div>
  );
};

export default MainPage;
