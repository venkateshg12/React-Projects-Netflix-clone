import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        trailerVideo: null,
    },
    reducers: {
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
        removeTrailerVideo: (state, action) => {
            state.trailerVideo = null;
        },
    },
})

export const { addTrailerVideo, removeTrailerVideo } = movieSlice.actions;
export default movieSlice.reducer;
