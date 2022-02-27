import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "../../models/Comment.model";
import { Story } from "../../models/Story.model";
import {
  fetchComment,
  initStory,
  refreshComments,
} from "../actionCreators/StoryActionCreator";

interface StoryState {
  story: Story;
  comments: Comment[];
  isLoading: boolean;
  isUpdating: boolean;
  error: string;
}

const initialState: StoryState = {
  story: {
    by: "",
    descendants: 0,
    id: 0,
    score: 0,
    time: 0,
    title: "",
    type: "story",
    url: "",
    kids: [],
  },
  comments: [],
  isLoading: false,
  isUpdating: false,
  error: "",
};

export const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    clearStory(state) {
      state.story = {
        by: "",
        descendants: 0,
        id: 0,
        score: 0,
        time: 0,
        title: "",
        type: "story",
        url: "",
        kids: [],
      };
      state.comments = [];
    },
  },
  extraReducers: {
    [initStory.fulfilled.type]: (
      state,
      action: PayloadAction<{ story: Story; comments: Comment[] }>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.story = { ...state.story, ...action.payload.story };
      state.comments = action.payload.comments;
    },
    [initStory.pending.type]: (state) => {
      state.isLoading = true;
    },
    [initStory.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [fetchComment.fulfilled.type]: (state, action: PayloadAction<Comment>) => {
      state.error = "";
      state.comments = [...state.comments, action.payload];
    },
    [fetchComment.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    [refreshComments.fulfilled.type]: (
      state,
      action: PayloadAction<Comment[]>
    ) => {
      state.isUpdating = false;
      state.error = "";
      state.comments = action.payload;
    },
    [refreshComments.pending.type]: (state) => {
      state.isUpdating = true;
    },
    [refreshComments.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isUpdating = false;
      state.error = action.payload;
    },
  },
});

export default storySlice.reducer;
