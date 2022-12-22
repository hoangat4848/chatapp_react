import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteMessage,
  editMessage,
  getConversationMessages,
} from "../../utils/api";
import { DeleteMessageParams, EditMessagePayload } from "../../utils/types";

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

export const editMessageThunk = createAsyncThunk(
  "messages/edit",
  async (params: EditMessagePayload) => {
    return editMessage(params);
  }
);
