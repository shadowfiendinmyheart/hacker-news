import { Story } from "../../models/Story.model";

interface StoryState {
    stories: Story[],
    isLoading: boolean,
    error: string
}

const initialState = {

}