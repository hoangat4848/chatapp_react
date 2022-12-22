import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  ConversationMessage,
  DeleteMessageResponse,
  Message,
  MessageEventPayload,
} from "../../utils/types";
import {
  deleteMessageThunk,
  editMessageThunk,
  fetchMessagesThunk,
} from "./messageThunk";

export interface MessagesState {
  messages: ConversationMessage[];
  loading: boolean;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
};

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
    deleteMessage: (state, action: PayloadAction<DeleteMessageResponse>) => {
      const { payload } = action;
      const conversationMessages = state.messages.find(
        (cm) => cm.id === payload.conversationId
      );
      if (!conversationMessages) return;
      const messageIndex = conversationMessages.messages.findIndex(
        (m) => m.id === payload.messageId
      );

      if (messageIndex !== -1) {
        conversationMessages.messages.splice(messageIndex, 1);
      }
    },
    editMessage: (state, action: PayloadAction<Message>) => {
      const editedMessage = action.payload;
      const conversation = editedMessage.conversation;
      if (!conversation) return;
      const conversationMessage = state.messages.find(
        (cm) => cm.id === conversation.id
      );
      if (!conversationMessage) return;
      const messageIndex = conversationMessage.messages.findIndex(
        (m) => m.id === editedMessage.id
      );
      conversationMessage.messages[messageIndex] = editedMessage;
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
      })
      .addCase(deleteMessageThunk.fulfilled, (state, action) => {
        const { data } = action.payload;
        const conversationMessages = state.messages.find(
          (cm) => cm.id === data.conversationId
        );
        if (!conversationMessages) return;
        const messageIndex = conversationMessages.messages.findIndex(
          (m) => m.id === data.messageId
        );

        if (messageIndex !== -1) {
          conversationMessages.messages.splice(messageIndex, 1);
        }
      })
      .addCase(editMessageThunk.fulfilled, (state, action) => {
        const { data: editedMessage } = action.payload;
        const conversation = editedMessage.conversation;
        if (!conversation) return;
        const conversationMessage = state.messages.find(
          (cm) => cm.id === conversation.id
        );
        if (!conversationMessage) return;
        const messageIndex = conversationMessage.messages.findIndex(
          (m) => m.id === editedMessage.id
        );
        conversationMessage.messages[messageIndex] = editedMessage;
      });
  },
});

const selectConversationMessages = (state: RootState) => state.message.messages;
const selectConversationMessageId = (state: RootState, id: number) => id;
export const selectConversationMessage = createSelector(
  [selectConversationMessages, selectConversationMessageId],
  (conversationMessages, id) => conversationMessages.find((cm) => cm.id === id)
);

export const { addMessage, deleteMessage, editMessage } = messageSlice.actions;

export default messageSlice.reducer;
