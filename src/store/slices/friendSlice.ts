import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchFriends as fetchFriendsAPI } from "../../utils/api";
import { Friend } from "../../utils/types";

export interface FriendState {
  friends: Friend[];
}

const initialState: FriendState = {
  friends: [],
};

export const fetchFriendThunk = createAsyncThunk("friends/fetch", () =>
  fetchFriendsAPI()
);

export const friendSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(fetchFriendThunk.fulfilled, (state, action) => {
      console.log("fetchFriendsThunk.fulfilled");
      state.friends = action.payload.data;
    }),
});

export const {} = friendSlice.actions;

export default friendSlice.reducer;
