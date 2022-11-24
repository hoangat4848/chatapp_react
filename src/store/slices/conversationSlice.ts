import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Conversation, FetchMessagePayload } from "../../utils/types";
import { getConversationMessages, getConversations } from "../../utils/api";

interface ConversationState {
  conversations: Conversation[];
  messages: FetchMessagePayload[];
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

export const fetchMessagesThunk = createAsyncThunk(
  "messages/fetch",
  async (id: number) => {
    return getConversationMessages(id);
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
      })
      .addCase(fetchMessagesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        const { id } = action.payload.data;
        const index = state.messages.findIndex((cm) => cm.id === id);
        if (index > -1) {
          console.log("exists");
          state.messages[index] = action.payload.data;
        } else {
          state.messages.push(action.payload.data);
        }
      });
  },
});

export const { addConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
