import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Conversation, CreateConversationParams } from "../../utils/types";
import { getConversations, postNewConversation } from "../../utils/api";
import { RootState } from "..";

interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
};

export const fetchConversationsThunk = createAsyncThunk(
  "conversations/fetch",
  async () => {
    return getConversations();
  }
);

export const createConversationThunk = createAsyncThunk(
  "conversations/create",
  async (data: CreateConversationParams) => {
    return postNewConversation(data);
  }
);

export const conversationSlice = createSlice({
  name: "conversations",
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
      })
      .addCase(createConversationThunk.fulfilled, (state, action) => {
        state.conversations.unshift(action.payload.data);
      });
  },
});

const selectConversations = (state: RootState) =>
  state.conversation.conversations;

const selectConversationId = (state: RootState, id: number) => id;

export const selectConversationById = createSelector(
  [selectConversations, selectConversationId],
  (conversations, conversationId) => {
    return conversations.find((c) => c.id === conversationId);
  }
);

export const { addConversation, updateConversation } =
  conversationSlice.actions;

export default conversationSlice.reducer;
