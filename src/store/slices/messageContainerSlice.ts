import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Message, Point } from "../../utils/types";

export interface MessageContainerState {
  selectedMessage?: Message;
  messageBeingEdited?: Message;
  isEditingMessage: boolean;
  showContextMenu: boolean;
  selectedContextMenuPosition: Point;
}

const initialState: MessageContainerState = {
  isEditingMessage: false,
  showContextMenu: false,
  selectedContextMenuPosition: { x: 0, y: 0 },
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
    setShowContextMenu: (state, action: PayloadAction<boolean>) => {
      state.showContextMenu = action.payload;
    },
    setSelectedContextMenuPosition: (state, action: PayloadAction<Point>) => {
      state.selectedContextMenuPosition = action.payload;
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
  setShowContextMenu,
  setSelectedContextMenuPosition,
} = messageContainerSlice.actions;

export default messageContainerSlice.reducer;
