import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Message } from "../../utils/types";

export interface MessageContainerState {
  selectedMessage?: Message;
  messageBeingEdited?: Message;
  isEditingMessage: boolean;
}

const initialState: MessageContainerState = {
  isEditingMessage: false,
};

export const messageContainerSlice = createSlice({
  name: "contextMenu",
  initialState,
  reducers: {
    setSelectedMessage: (state, action: PayloadAction<Message>) => {
      state.selectedMessage = action.payload;
    },
    setMessageBeingEdited: (state, action: PayloadAction<Message>) => {
      state.messageBeingEdited = action.payload;
    },
    setIsEditingMessage: (state, action: PayloadAction<boolean>) => {
      state.isEditingMessage = action.payload;
    },
    editMessageBeingEditedContent: (state, action: PayloadAction<string>) => {
      console.log("okok");

      if (state.messageBeingEdited)
        state.messageBeingEdited.content = action.payload;
    },
    resetMessageContainer: (state) => {
      state.isEditingMessage = false;
      state.selectedMessage = undefined;
      state.messageBeingEdited = undefined;
    },
  },
});

export const selectIsEditing = (state: RootState) =>
  state.messageContainer.isEditingMessage;

export const selectEditingMessage = (state: RootState) =>
  state.messageContainer.messageBeingEdited;

export const {
  setSelectedMessage,
  setIsEditingMessage,
  setMessageBeingEdited,
  editMessageBeingEditedContent,
  resetMessageContainer,
} = messageContainerSlice.actions;

export default messageContainerSlice.reducer;
