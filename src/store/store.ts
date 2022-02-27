import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/AppSlice";
import storyReducer from "./reducers/StorySlice";

const rootReducer = combineReducers({
  appReducer,
  storyReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
