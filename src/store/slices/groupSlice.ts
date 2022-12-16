import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import { createGroup as createGroupAPI, fetchGroups } from "../../utils/api";
import { CreateGroupPayload, Group, User } from "../../utils/types";

export interface GroupState {
  groups: Group[];
}

const initialState: GroupState = {
  groups: [],
};

export const fetchGroupsThunk = createAsyncThunk("groups/fetch", () => {
  return fetchGroups();
});

export const createGroupThunk = createAsyncThunk(
  "groups/create",
  (payload: CreateGroupPayload) => createGroupAPI(payload)
);

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Group>) => {
      console.log(`addGroup reducer: Adding ${action.payload.id} group`);

      state.groups.unshift(action.payload);
    },
    updateGroup: (state, action: PayloadAction<Group>) => {
      const updatedGroup = action.payload;
      const existingGroup = state.groups.find((g) => g.id === updatedGroup.id);
      const index = state.groups.findIndex((c) => c.id === updatedGroup.id);
      // if (index > -1) state.groups.splice(index, 1);
      // state.groups.unshift(updatedGroup);
      if (index > -1) state.groups[index] = updatedGroup;
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

export const { addGroup, updateGroup } = groupsSlice.actions;

export default groupsSlice.reducer;
