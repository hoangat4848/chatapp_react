import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import { fetchGroups } from "../../utils/api";
import { Group } from "../../utils/types";

export interface GroupState {
  groups: Group[];
}

const initialState: GroupState = {
  groups: [],
};

export const fetchGroupsThunk = createAsyncThunk("groups/fetch", () => {
  return fetchGroups();
});

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    updateGroup: (state, action: PayloadAction<Group>) => {
      const updatedGroup = action.payload;
      const index = state.groups.findIndex((c) => c.id === updatedGroup.id);
      if (index > -1) state.groups.splice(index, 1);
      state.groups.unshift(updatedGroup);
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchGroupsThunk.fulfilled, (state, action) => {
      state.groups = action.payload.data;
    });
  },
});

const selectGroups = (state: RootState) => state.group.groups;
const selectGroupId = (state: RootState, id: number) => id;

export const selectGroupById = createSelector(
  [selectGroups, selectGroupId],
  (groups, groupId) => groups.find((g) => g.id === groupId)
);

export const { updateGroup } = groupsSlice.actions;

export default groupsSlice.reducer;
