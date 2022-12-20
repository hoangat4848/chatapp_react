import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchFriendRequests as fetchFriendRequestsAPI,
  fetchFriends as fetchFriendsAPI,
} from "../../utils/api";
import { Friend, FriendRequest } from "../../utils/types";

export interface FriendState {
  friends: Friend[];
  friendRequests: FriendRequest[];
}

const initialState: FriendState = {
  friends: [],
  friendRequests: [],
};

export const fetchFriendThunk = createAsyncThunk("friends/fetch", () =>
  fetchFriendsAPI()
);

export const fetchFriendRequestThunk = createAsyncThunk(
  "friends/requests/fetch",
  () => fetchFriendRequestsAPI()
);

export const friendSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchFriendThunk.fulfilled, (state, action) => {
        console.log("fetchFriendsThunk.fulfilled");
        state.friends = action.payload.data;
      })
      .addCase(fetchFriendRequestThunk.fulfilled, (state, action) => {
        state.friendRequests = action.payload.data;
      }),
});

export const {} = friendSlice.actions;

export default friendSlice.reducer;
