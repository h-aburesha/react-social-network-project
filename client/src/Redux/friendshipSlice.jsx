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

export const {
    setFriends,
    setRequests,
    acceptRequest,
    rejectRequest,
    endFriendship,
} = friendshipSlice.actions;

export default friendshipSlice;

/* 
acceptRequest: (state, action) => {
            const request = state.requests.find(
                (req) => req.id === action.payload
            );
            if (request) {
                request.accepted = true;
                state.friends.push(request);
                state.requests = state.requests.filter(
                    (req) => req.id !== action.payload
                );
            }
        },
        rejectRequest: (state, action) => {
            state.requests = state.requests.filter(
                (req) => req.id !== action.payload
            );
        },
        endFriendship: (state, action) => {
            state.friends = state.friends.filter(
                (friend) => friend.id !== action.payload
            );
        },
*/
