import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "../../utils/types";

interface ConversationState {
  conversations: Conversation[];
}

// Define the initial state using that type
const initialState: ConversationState = {
  conversations: [],
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      console.log("addConversation");
      state.conversations.push(action.payload);
    },
  },
});

export const { addConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
