import React, { useEffect } from "react";
import StoryElement from "../../components/StoryElement/StoryElement";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchStories,
  refreshStories,
} from "../../store/actionCreators/AppActionCreator";
import { appSlice } from "../../store/reducers/AppSlice";

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
    <div>
      <ul>
        {stories.map(
          (story) =>
            story && (
              <li key={story.id}>
                <StoryElement {...story} />
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default MainPage;
