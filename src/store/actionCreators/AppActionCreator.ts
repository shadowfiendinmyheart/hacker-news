import { createAsyncThunk } from "@reduxjs/toolkit";
import { getStoryList } from "./utils";

export const fetchStories = createAsyncThunk(
  "app/init",
  async (_, thunkApi) => {
    try {
      const { stories, storyIds } = await getStoryList();
      return { stories, storyIds };
    } catch (error) {
      return thunkApi.rejectWithValue("Произошла ошибка на сервере");
    }
  }
);

export const refreshStories = createAsyncThunk(
  "app/refresh",
  async (_, thunkApi) => {
    try {
      const { stories, storyIds } = await getStoryList();
      return { stories, storyIds };
    } catch (error) {
      return thunkApi.rejectWithValue("Произошла ошибка на сервере");
    }
  }
);
