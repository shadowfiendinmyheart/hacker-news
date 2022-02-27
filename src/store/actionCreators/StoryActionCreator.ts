import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { Comment } from "../../models/Comment.model";
import { Story } from "../../models/Story.model";
import { API_URL } from "../../constants";

export const initStory = createAsyncThunk(
  "story/init",
  async (id: number, thunkApi) => {
    try {
      const responseStory = await axios.get<Story>(`${API_URL}item/${id}.json`);
      if (responseStory.data === null) {
        return thunkApi.rejectWithValue("Произошла ошибка на сервере");
      }

      const commentsIds = responseStory.data?.kids;
      const commentsResponse = commentsIds
        ? await Promise.all(
            commentsIds.map((commentId) => {
              return axios.get<Comment>(`${API_URL}item/${commentId}.json`);
            })
          )
        : [];
      const comments = commentsResponse.map((commentRes) => commentRes.data);
      return { story: responseStory.data, comments };
    } catch (error) {
      return thunkApi.rejectWithValue("Произошла ошибка на сервере");
    }
  }
);

export const fetchComment = createAsyncThunk(
  "story/comments",
  async (id: number, thunkApi) => {
    try {
      const responseComment = await axios.get<Comment>(
        `${API_URL}item/${id}.json`
      );

      return responseComment.data;
    } catch (error) {
      return thunkApi.rejectWithValue("Произошла ошибка на сервере");
    }
  }
);

export const refreshComments = createAsyncThunk(
  "story/refresh",
  async (_, thunkApi) => {
    try {
      const state: any = thunkApi.getState();
      const parentIds = state.storyReducer.comments.map(
        (comment: Comment) => comment.parent
      );

      const uniqueParentIds = [
        ...parentIds,
        state.storyReducer.story.id,
      ].reduce((uniqueIds: number[], id: number) => {
        return uniqueIds.includes(id) ? uniqueIds : [...uniqueIds, id];
      }, []);

      const updateParentResponse = await Promise.all(
        uniqueParentIds.map((id: number) => {
          return axios.get<Comment>(`${API_URL}item/${id}.json`);
        })
      );

      const updatedKidsIds = updateParentResponse.reduce(
        (kidsIds: number[], comment: AxiosResponse<Comment>) => {
          return comment.data.kids
            ? [...kidsIds, ...comment.data.kids]
            : [...kidsIds];
        },
        []
      );
      const updateKidsResponse = await Promise.all(
        updatedKidsIds.map((id: number) => {
          return axios.get<Comment>(`${API_URL}item/${id}.json`);
        })
      );

      const updatedComments = [
        ...updateParentResponse,
        ...updateKidsResponse,
      ].reduce((comments: Comment[], comment: AxiosResponse<Comment>) => {
        if (comment.data.id === state.storyReducer.story.id) {
          return [...comments];
        }

        return comments.find((c) => c.id === comment.data.id)
          ? [...comments]
          : [...comments, comment.data];
      }, []);

      return updatedComments;
    } catch (error) {
      return thunkApi.rejectWithValue("Произошла ошибка на сервере");
    }
  }
);
