import { createSlice } from "@reduxjs/toolkit";


const TypeIdSlice = createSlice({
    name: "info",
    initialState: {
        type: null,
        id: null,
        page: "/browse",
    },

    reducers: {
        addType: (state, action) => {
            state.type = action.payload;
        },
        addId: (state, action) => {
            state.id = action.payload;
        },
        addPage: (state, action) => {
            state.page = action.payload;
        },

        removeTypeId: (state) => {
            state.type = null;
            state.id = null;
        }
    }
})

export const { addType, addId, removeTypeId, addPage } = TypeIdSlice.actions;
export default TypeIdSlice.reducer;