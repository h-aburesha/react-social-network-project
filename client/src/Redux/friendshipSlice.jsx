import { createSlice } from "@reduxjs/toolkit";

const friendshipSlice = createSlice({
    name: "friendships",
    initialState: {
        friends: [],
        requests: [],
    },
    reducers: {
        setFriends: (state, action) => {
            state.friends = action.payload;
        },
        setRequests: (state, action) => {
            state.requests = action.payload;
        },
    },
});

export const { setFriends, setRequests } = friendshipSlice.actions;

export default friendshipSlice;
