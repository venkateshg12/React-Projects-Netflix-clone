import { createSlice } from "@reduxjs/toolkit";

const detailInfoSlice = createSlice({
    name: "details",
    initialState: {
        contentDetails: null,
        creditDetails: null,
    },
    reducers: {
        addContentDetails: (state, action) => {
            state.contentDetails = action.payload;
        },
        addCreditDetails: (state, action) => {
            state.creditDetails = action.payload;
        },
        resetMovieData: (state) => {
            state.contentDetails = null;
            state.creditDetails = null;
        },
    }
})

export const { addContentDetails, addCreditDetails, resetMovieData } = detailInfoSlice.actions;
export default detailInfoSlice.reducer;