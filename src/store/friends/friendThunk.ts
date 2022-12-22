import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  acceptFriendRequest as acceptFriendRequestAPI,
  cancelFriendRequest as cancelFriendRequestAPI,
  createFriendRequest as createFriendRequestAPI,
  fetchFriendRequests as fetchFriendRequestsAPI,
  fetchFriends as fetchFriendsAPI,
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
