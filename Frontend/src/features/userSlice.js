// src/features/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.user = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { addUser, removeUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
