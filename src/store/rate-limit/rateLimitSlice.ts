import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateRateLimitPayload } from "../../utils/types";

export interface RateLimitState {
  groupRateLimited: boolean;
  privateRateLimited: boolean;
}

const initialState: RateLimitState = {
  groupRateLimited: false,
  privateRateLimited: false,
};

export const rateLimitSlice = createSlice({
  name: "rateLimit",
  initialState,
  reducers: {
    setRateLimitStatus: (
      state,
      action: PayloadAction<UpdateRateLimitPayload>
    ) => {
      const { type, status } = action.payload;
      switch (type) {
        case "private":
          state.privateRateLimited = status;
          return;
        case "group":
          state.groupRateLimited = status;
          return;
      }
    },
  },
});

export const { setRateLimitStatus } = rateLimitSlice.actions;

export default rateLimitSlice.reducer;
