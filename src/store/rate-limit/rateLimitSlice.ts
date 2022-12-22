import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateRateLimitPayload } from "../../utils/types";

export interface RateLimitState {
  isGroupMessageRateLimited: boolean;
  isPrivateMessageRateLimited: boolean;
}

const initialState: RateLimitState = {
  isGroupMessageRateLimited: false,
  isPrivateMessageRateLimited: false,
};

export const rateLimitSlice = createSlice({
  name: "rateLimit",
  initialState,
  reducers: {
    updateRateLimit: (state, action: PayloadAction<UpdateRateLimitPayload>) => {
      const { type, status } = action.payload;
      switch (type) {
        case "private":
          state.isPrivateMessageRateLimited = status;
          return;
        case "group":
          state.isGroupMessageRateLimited = status;
          return;
      }
    },
  },
});

export const { updateRateLimit } = rateLimitSlice.actions;

export default rateLimitSlice.reducer;
