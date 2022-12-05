import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ConversationType } from "../../utils/types";

export interface SelectedTypeState {
  type: "group" | "private";
}

const initialState: SelectedTypeState = {
  type: "private",
};

export const selectedSlice = createSlice({
  name: "selectedType",
  initialState,
  reducers: {
    updateType: (state, action: PayloadAction<ConversationType>) => {
      state.type = action.payload;
    },
  },
});

export const selectType = (state: RootState) =>
  state.selectedConversationType.type;

export const { updateType } = selectedSlice.actions;

export default selectedSlice.reducer;
