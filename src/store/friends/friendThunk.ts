import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  acceptFriendRequest as acceptFriendRequestAPI,
  cancelFriendRequest as cancelFriendRequestAPI,
  createFriendRequest as createFriendRequestAPI,
  fetchFriendRequests as fetchFriendRequestsAPI,
  fetchFriends as fetchFriendsAPI,
  rejectFriendRequest as rejectFriendRequestAPI,
  removeFriend as removeFriendAPI,
} from "../../utils/api";

export const fetchFriendThunk = createAsyncThunk("friends/fetch", () =>
  fetchFriendsAPI()
);

export const fetchFriendRequestThunk = createAsyncThunk(
  "friends/requests/fetch",
  () => fetchFriendRequestsAPI()
);

export const createFriendRequestThunk = createAsyncThunk(
  "friends/requests/create",
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await createFriendRequestAPI(username);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const cancelFriendRequestThunk = createAsyncThunk(
  "friends/requests/cancel",
  (id: number) => cancelFriendRequestAPI(id)
);

export const acceptFriendRequestThunk = createAsyncThunk(
  "friends/requests/accept",
  (id: number) => acceptFriendRequestAPI(id)
);

export const rejectFriendRequestThunk = createAsyncThunk(
  "friends/requests/reject",
  (id: number) => rejectFriendRequestAPI(id)
);

export const removeFriendThunk = createAsyncThunk(
  "friends/remove",
  (id: number) => removeFriendAPI(id)
);
