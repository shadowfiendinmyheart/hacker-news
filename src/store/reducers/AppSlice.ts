import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Story } from "../../models/Story.model";
import {
  fetchStories,
  refreshStories,
} from "../actionCreators/AppActionCreator";

interface AppState {
  storyIds: number[];
  stories: Story[];
  isLoading: boolean;
  isUpdating: boolean;
  error: string;
}

const initialState: AppState = {
  storyIds: [],
  stories: [],
  isLoading: false,
  isUpdating: false,
  error: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    storiesFilter(state) {
      state.stories = state.stories.filter((story) => {
        return state.storyIds.includes(story?.id);
      });
    },
  },
  extraReducers: {
    [fetchStories.fulfilled.type]: (
      state,
      action: PayloadAction<{ storyIds: number[]; stories: Story[] }>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.storyIds = action.payload.storyIds;
      state.stories = action.payload.stories;
    },
    [fetchStories.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchStories.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [refreshStories.fulfilled.type]: (
      state,
      action: PayloadAction<{ storyIds: number[]; stories: Story[] }>
    ) => {
      state.isUpdating = false;
      state.error = "";
      state.storyIds = action.payload.storyIds;
      state.stories = [...action.payload.stories, ...state.stories].filter(
        (story) => action.payload.storyIds.includes(story?.id)
      );
    },
    [refreshStories.pending.type]: (state) => {
      state.isUpdating = true;
    },
    [refreshStories.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isUpdating = false;
      state.error = action.payload;
    },
  },
});

export default appSlice.reducer;
