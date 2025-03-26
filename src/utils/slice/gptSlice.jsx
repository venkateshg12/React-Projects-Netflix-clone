import { createSlice } from "@reduxjs/toolkit";


const gptSlice = createSlice({
    name: "info",
    initialState: {
        showInfo: false,
        movieCategory: null,
        seriesCategory: null,
        moviesInfo: null,
        seriesInfo: null,
    },
    reducers: {
        addInfoState: (state, action) => {
            state.showInfo = true;
        },
        removeInfoState: (state, action) => {
            state.showInfo = false;
        },
        addGptMovieDetails: (state, action) => {
            state.moviesInfo = action.payload;
        },
        addMovieCategory: (state, action) => {
            state.movieCategory = action.payload;
        },
        addGptSeriesDetails: (state, action) => {
            state.seriesInfo = action.payload;
        },
        addSeriesCategory : (state, action) => {
            state.seriesCategory = action.payload;
        },
        removeInfo : (state) =>{
            state.moviesInfo = null;
            state.seriesInfo = null;
            state.movieCategory = null;
            state.seriesCategory = null;
        },
    }
})
export const { addGptMovieDetails,  addGptSeriesDetails, removeInfo, addInfoState, removeInfoState, addMovieCategory, addSeriesCategory } = gptSlice.actions;
export default gptSlice.reducer;