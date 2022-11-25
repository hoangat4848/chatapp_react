import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Conversation, ConversationMessage } from "../../utils/types";
import { getConversations } from "../../utils/api";
import { startOfYesterday } from "date-fns";

interface ConversationState {
  conversations: Conversation[];
  messages: ConversationMessage[];
  loading: boolean;
}

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
    updateConversation: (state, action: PayloadAction<Conversation>) => {
      const updatedConversation = action.payload;
      const index = state.conversations.findIndex(
        (c) => c.id === updatedConversation.id
      );
      state.conversations.splice(index, 1);
      state.conversations.unshift(updatedConversation);
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

export const { addConversation, updateConversation } =
  conversationSlice.actions;

export default conversationSlice.reducer;
