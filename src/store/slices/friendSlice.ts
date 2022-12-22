import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  acceptFriendRequest as acceptFriendRequestAPI,
  cancelFriendRequest as cancelFriendRequestAPI,
  createFriendRequest as createFriendRequestAPI,
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

export const createFriendRequestThunk = createAsyncThunk(
  "friends/requests/create",
  (email: string) => createFriendRequestAPI(email)
);

export const cancelFriendRequestThunk = createAsyncThunk(
  "friends/requests/cancel",
  (id: number) => cancelFriendRequestAPI(id)
);

export const acceptFriendRequestThunk = createAsyncThunk(
  "friends/requests/accept",
  (id: number) => acceptFriendRequestAPI(id)
);

export const friendSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    addFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
      state.friendRequests.push(action.payload);
    },
    removeFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
      const { id } = action.payload;
      state.friendRequests = state.friendRequests.filter(
        (friendRequest) => friendRequest.id !== id
      );
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchFriendThunk.fulfilled, (state, action) => {
        console.log("fetchFriendsThunk.fulfilled");
        state.friends = action.payload.data;
      })
      .addCase(fetchFriendRequestThunk.fulfilled, (state, action) => {
        state.friendRequests = action.payload.data;
      })
      .addCase(createFriendRequestThunk.fulfilled, (state, action) => {
        console.log("friend request received");
        console.log(action.payload.data);

        state.friendRequests.push(action.payload.data);
      })
      .addCase(cancelFriendRequestThunk.fulfilled, (state, action) => {
        console.log("inside cancel friend request thunk fulfilled");

        const { id } = action.payload.data;
        state.friendRequests = state.friendRequests.filter(
          (friendRequest) => friendRequest.id !== id
        );
      })
      .addCase(acceptFriendRequestThunk.fulfilled, (state, action) => {
        console.log("acceptFriendRequestThunk.fulfilled");
        const {
          friend,
          friendRequest: { id },
        } = action.payload.data;
        state.friendRequests = state.friendRequests.filter(
          (friendRequest) => friendRequest.id !== id
        );
      }),
});

export const { addFriendRequest, removeFriendRequest } = friendSlice.actions;

export default friendSlice.reducer;
