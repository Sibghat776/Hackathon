import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: null, // Initially koi user nahi
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.userData = action.payload;
        },
        removeUser: (state) => {
            state.userData = null;
        },
    },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;