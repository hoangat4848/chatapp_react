import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "../../utils/types";
import { getConversations } from "../../utils/api";

interface ConversationState {
  // conversations: Conversation[];
  conversations: Map<string, Conversation>;
}

// Define the initial state using that type
const initialState: ConversationState = {
  conversations: new Map(),
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
      const { id } = action.payload;
      console.log("addConversation");
      // state.conversations.set(id, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversationsThunk.fulfilled, (state, action) => {
      action.payload.data.forEach((conversation) => {
        console.log(conversation);
        state.conversations.set(conversation.id.toString(), conversation);
      });
      console.log(state.conversations);
    });
  },
});

export const { addConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
