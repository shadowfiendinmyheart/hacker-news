import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, STORY_ELEMENTS_LIMIT } from "../../constants";
import { Story } from "../../models/Story.model";

export const fetchStories = createAsyncThunk(
  "stories/init",
  async (_, thunkApi) => {
    try {
      const response = await axios.get<number[]>(`${API_URL}newstories.json`);
      const storyIds = response.data.slice(0, STORY_ELEMENTS_LIMIT);
      const storiesResponse = await Promise.all(
        storyIds.map((id) => {
          return axios.get<Story>(`${API_URL}item/${id}.json`);
        })
      );
      const stories = storiesResponse.map((storyRes) => storyRes.data);
      return { stories, storyIds };
    } catch (error) {
      return thunkApi.rejectWithValue("Произошла ошибка на сервере");
    }
  }
);

export const refreshStories = createAsyncThunk(
  "stories/refresh",
  async (_, thunkApi) => {
    try {
      const state: any = thunkApi.getState();

      const response = await axios.get<number[]>(`${API_URL}newstories.json`);
      const storyIds = response.data.slice(0, STORY_ELEMENTS_LIMIT);

      const newStoriesId = storyIds.filter(
        (id) => !state.appReducer.storyIds.includes(id)
      );
      const newStoriesResponse = await Promise.all(
        newStoriesId.map((id) => {
          return axios.get<Story>(`${API_URL}item/${id}.json`);
        })
      );
      const newStories = newStoriesResponse.map((newStory) => newStory.data);

      return { stories: newStories, storyIds };
    } catch (error) {
      return thunkApi.rejectWithValue("Произошла ошибка на сервере");
    }
  }
);
