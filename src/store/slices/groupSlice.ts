import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  createGroup as createGroupAPI,
  fetchGroups,
  removeGroupRecipient as removeGroupRecipientAPI,
  updateGroupOwner as updateGroupOwnerAPI,
} from "../../utils/api";
import {
  CreateGroupPayload,
  Group,
  RemoveGroupRecipientParams,
  UpdateGroupOwnerParams,
} from "../../utils/types";

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

export const removeGroupRecipientThunk = createAsyncThunk(
  "groups/recipients/delete",
  (params: RemoveGroupRecipientParams) => removeGroupRecipientAPI(params)
);

export const updateGroupOwnerThunk = createAsyncThunk(
  "groups/owner/update",
  (params: UpdateGroupOwnerParams) => updateGroupOwnerAPI(params)
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
      console.log("update group");

      const updatedGroup = action.payload;
      const index = state.groups.findIndex((c) => c.id === updatedGroup.id);
      // if (index > -1) state.groups.splice(index, 1);
      // state.groups.unshift(updatedGroup);
      if (index > -1) state.groups[index] = updatedGroup;
    },
    updateGroupLastMessageSent: (state, action: PayloadAction<Group>) => {
      console.log("update group");

      const updatedGroup = action.payload;
      const index = state.groups.findIndex((c) => c.id === updatedGroup.id);
      if (index > -1) state.groups.splice(index, 1);
      state.groups.unshift(updatedGroup);
    },
    removeGroup: (state, action: PayloadAction<Group>) => {
      const index = state.groups.findIndex((g) => g.id === action.payload.id);
      if (index < 0) return;
      state.groups.splice(index, 1);
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchGroupsThunk.fulfilled, (state, action) => {
        state.groups = action.payload.data;
      })
      .addCase(removeGroupRecipientThunk.fulfilled, (state, action) => {
        const { data: updatedGroup } = action.payload;
        const index = state.groups.findIndex((g) => g.id === updatedGroup.id);
        if (index > -1) {
          state.groups[index] = updatedGroup;
          console.log("updating group...");
        }
      })
      .addCase(updateGroupOwnerThunk.fulfilled, (state, action) => {
        const { data: updatedGroup } = action.payload;
        const index = state.groups.findIndex(
          (group) => group.id === updatedGroup.id
        );
        if (index < 0) return;
        state.groups[index] = updatedGroup;
      });
  },
});

const selectGroups = (state: RootState) => state.group.groups;
const selectGroupId = (state: RootState, id: number) => id;

export const selectGroupById = createSelector(
  [selectGroups, selectGroupId],
  (groups, groupId) => groups.find((g) => g.id === groupId)
);

export const {
  addGroup,
  updateGroup,
  updateGroupLastMessageSent,
  removeGroup,
} = groupsSlice.actions;

export default groupsSlice.reducer;
