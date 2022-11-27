import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteMessage, getConversationMessages } from "../../utils/api";
import {
  ConversationMessage,
  DeleteMessageParams,
  MessageEventPayload,
} from "../../utils/types";

export interface MessagesState {
  messages: ConversationMessage[];
  loading: boolean;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
};

export const fetchMessagesThunk = createAsyncThunk(
  "messages/fetch",
  async (id: number) => {
    return getConversationMessages(id);
  }
);

export const deleteMessageThunk = createAsyncThunk(
  "messages/delete",
  async (params: DeleteMessageParams) => {
    return deleteMessage(params);
  }
);

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageEventPayload>) => {
      console.log(state);
      console.log(action);
      const {
        conversation,
        message: { conversation: messageConversation, ...newMessage },
      } = action.payload;
      const conversationMessage = state.messages.find(
        (cm) => cm.id === conversation.id
      );
      conversationMessage?.messages.unshift(newMessage);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        const { id } = action.payload.data;
        const index = state.messages.findIndex((cm) => cm.id === id);
        if (index > -1) {
          state.messages[index] = action.payload.data;
        } else {
          state.messages.push(action.payload.data);
        }
        state.loading = false;
      });
  },
});

export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;
