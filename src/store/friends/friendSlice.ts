import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Friend, FriendRequest } from "../../utils/types";
import {
  fetchFriendThunk,
  fetchFriendRequestThunk,
  createFriendRequestThunk,
  cancelFriendRequestThunk,
  acceptFriendRequestThunk,
  rejectFriendRequestThunk,
} from "./friendThunk";

export interface FriendState {
  friends: Friend[];
  friendRequests: FriendRequest[];
  onlineFriends: Friend[];
  offlineFriends: Friend[];
}

const initialState: FriendState = {
  friends: [],
  friendRequests: [],
  onlineFriends: [],
  offlineFriends: [],
};

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
    setOnlineFriends: (state, action: PayloadAction<Friend[]>) => {
      state.onlineFriends = action.payload;
    },
    setOfflineFriends: (state) => {
      state.offlineFriends = state.friends.filter(
        (friend) =>
          !state.onlineFriends.find(
            (onlineFriend) => onlineFriend.id === friend.id
          )
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
          friendRequest: { id },
        } = action.payload.data;
        state.friendRequests = state.friendRequests.filter(
          (friendRequest) => friendRequest.id !== id
        );
      })
      .addCase(rejectFriendRequestThunk.fulfilled, (state, action) => {
        const { id } = action.payload.data;
        state.friendRequests = state.friendRequests.filter(
          (friendRequest) => friendRequest.id !== id
        );
      }),
});

export const {
  addFriendRequest,
  removeFriendRequest,
  setOnlineFriends,
  setOfflineFriends,
} = friendSlice.actions;

export default friendSlice.reducer;
