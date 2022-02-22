import { createSlice } from "@reduxjs/toolkit";
import { Comment } from "../../models/Comment.model";
import { Story } from "../../models/Story.model";

interface StoryState extends Story {
  kids: Comment[];
}

const initialState: StoryState = {
  by: "",
  descendants: 0,
  id: 0,
  score: 0,
  time: 0,
  title: "",
  type: "story",
  url: "",
  kidsIds: [],
  kids: [],
};

export const storySLice = createSlice({
  name: "story",
  initialState,
  reducers: {},
});

export default storySLice.reducer;
