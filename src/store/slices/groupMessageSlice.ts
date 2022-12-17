import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  deleteGroupMessage as deleteGroupMessageAPI,
  editGroupMessage as editGroupMessageAPI,
  fetchGroupMessages as fetchGroupMessagesAPI,
} from "../../utils/api";

import {
  GroupMessageEventPayload,
  GroupMessage,
  DeleteGroupMessageParams,
  GroupMessageType,
  EditGroupMessagePayload,
} from "../../utils/types";

export interface GroupMessagesState {
  messages: GroupMessage[];
}

const initialState: GroupMessagesState = {
  messages: [],
};

export const fetchGroupMessagesThunk = createAsyncThunk(
  "groupMessages/fetch",
  (id: number) => fetchGroupMessagesAPI(id)
);

export const deleteGroupMessageThunk = createAsyncThunk(
  "groupMessages/delete",
  (params: DeleteGroupMessageParams) => deleteGroupMessageAPI(params)
);

export const editGroupMessageThunk = createAsyncThunk(
  "groupMessages/edit",
  (params: EditGroupMessagePayload) => editGroupMessageAPI(params)
);

export const groupMessagesSlice = createSlice({
  name: "groupMessages",
  initialState,
  reducers: {
    addGroupMessage: (
      state,
      action: PayloadAction<GroupMessageEventPayload>
    ) => {
      console.log("add group message");

      const { group, message } = action.payload;
      const groupMessage = state.messages.find((gm) => gm.id === group.id);
      groupMessage?.messages.unshift(message);
    },
    editGroupMessage: (state, action: PayloadAction<GroupMessageType>) => {
      const updatedMessage = action.payload;
      if (!updatedMessage.group) return;
      const { id } = updatedMessage.group;
      const groupMessage = state.messages.find((gm) => gm.id === id);
      if (!groupMessage) return;
      const messageIndex = groupMessage.messages.findIndex(
        (m) => m.id === updatedMessage.id
      );
      groupMessage.messages[messageIndex] = updatedMessage;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupMessagesThunk.fulfilled, (state, action) => {
        const { id } = action.payload.data;
        const index = state.messages.findIndex((gm) => gm.id === id);
        const exists = state.messages.find((gm) => gm.id === id);
        exists
          ? (state.messages[index] = action.payload.data)
          : state.messages.push(action.payload.data);
      })
      .addCase(deleteGroupMessageThunk.fulfilled, (state, action) => {
        const { data } = action.payload;
        const groupMessages = state.messages.find(
          (gm) => gm.id === data.groupId
        );
        if (!groupMessages) return;
        const messageIndex = groupMessages.messages.findIndex(
          (m) => m.id === data.messageId
        );
        if (messageIndex !== -1) {
          groupMessages.messages.splice(messageIndex, 1);
        }
      });
    // .addCase(editGroupMessageThunk.fulfilled, (state, action) => {
    //   const { data: editedMessage } = action.payload;
    //   const group = editedMessage.group;
    //   if (!group) return;
    //   const groupMessages = state.messages.find((cm) => cm.id === group.id);
    //   if (!groupMessages) return;
    //   const messageIndex = groupMessages.messages.findIndex(
    //     (m) => m.id === editedMessage.id
    //   );
    //   groupMessages.messages[messageIndex] = editedMessage;
    // });
  },
});

const selectGroupMessages = (state: RootState) => state.groupMessage.messages;
const selectGroupMessageId = (state: RootState, id: number) => id;
export const selectGroupMessage = createSelector(
  [selectGroupMessages, selectGroupMessageId],
  (groupMessages, id) => groupMessages.find((gm) => gm.id === id)
);

export const { addGroupMessage, editGroupMessage } = groupMessagesSlice.actions;

export default groupMessagesSlice.reducer;
