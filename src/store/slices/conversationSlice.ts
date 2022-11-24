import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Conversation, ConversationMessage } from "../../utils/types";
import { getConversations } from "../../utils/api";

interface ConversationState {
  conversations: Conversation[];
  messages: ConversationMessage[];
  loading: boolean;
}

// Define the initial state using that type
const initialState: ConversationState = {
  conversations: [],
  messages: [],
  loading: false,
};

export const fetchConversationsThunk = createAsyncThunk(
  "conversations/fetch",
  async (thunkAPI) => {
    return getConversations();
  }
);

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      console.log("addConversation");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
        state.conversations = action.payload.data;
        state.loading = false;
      });
  },
});

export const { addConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
