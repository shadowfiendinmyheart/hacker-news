import axios from "axios";
import { API_URL, STORY_ELEMENTS_LIMIT } from "../../constants";
import { Story } from "../../models/Story.model";

export const getStoryList = async () => {
  const response = await axios.get<number[]>(`${API_URL}newstories.json`);
  const storyIds = response.data.slice(0, STORY_ELEMENTS_LIMIT);
  const storiesResponse = await Promise.all(
    storyIds.map((id) => {
      return axios.get<Story>(`${API_URL}item/${id}.json`);
    })
  );
  const stories = storiesResponse.map((storyRes) => storyRes.data);

  return { stories, storyIds };
};
