import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createMessage as createMessageAPI,
  deleteMessage,
  editMessage,
  getConversationMessages,
} from "../../utils/api";
import {
  CreateMessageParams,
  DeleteMessageParams,
  EditMessagePayload,
} from "../../utils/types";

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

export const createMessageThunk = createAsyncThunk(
  "messages/create",
  async (params: CreateMessageParams, thunkAPI) => {
    try {
      const response = await createMessageAPI(params);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
