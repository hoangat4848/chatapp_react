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
  leaveGroup as leaveGroupAPI,
  removeGroupRecipient as removeGroupRecipientAPI,
  updateGroupDetails as updateGroupDetailsAPI,
  updateGroupOwner as updateGroupOwnerAPI,
} from "../../utils/api";
import {
  CreateGroupPayload,
  Group,
  Point,
  RemoveGroupRecipientParams,
  UpdateGroupDetailsPayload,
  UpdateGroupOwnerParams,
} from "../../utils/types";

export interface GroupState {
  groups: Group[];
  showGroupContextMenu: boolean;
  selectedGroupContextMenu?: Group;
  contextMenuLocation: Point;
  showEditGroupModal: boolean;
  isSavingChanges: boolean;
}

const initialState: GroupState = {
  groups: [],
  showGroupContextMenu: false,
  contextMenuLocation: { x: 0, y: 0 },
  showEditGroupModal: false,
  isSavingChanges: false,
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

export const leaveGroupThunk = createAsyncThunk(
  "groups/leave",
  async (groupId: number, { rejectWithValue }) => {
    try {
      const response = await leaveGroupAPI(groupId);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateGroupDetailsThunk = createAsyncThunk(
  "group/update/details",
  async (payload: UpdateGroupDetailsPayload, { rejectWithValue }) => {
    try {
      const { data } = await updateGroupDetailsAPI(payload);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
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
    setShowGroupContextMenu: (state, action: PayloadAction<boolean>) => {
      state.showGroupContextMenu = action.payload;
    },
    setSelectedGroup: (state, action: PayloadAction<Group>) => {
      state.selectedGroupContextMenu = action.payload;
    },
    setGroupContextMenuLocation: (state, action: PayloadAction<Point>) => {
      state.contextMenuLocation = action.payload;
    },
    setShowEditGroupModal: (state, action: PayloadAction<boolean>) => {
      state.showEditGroupModal = action.payload;
    },
    setIsSavingChanges: (state, action: PayloadAction<boolean>) => {
      state.isSavingChanges = action.payload;
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
      })
      .addCase(leaveGroupThunk.fulfilled, (state, action) => {
        console.log("leave group fulfilled");
      })
      .addCase(updateGroupDetailsThunk.fulfilled, (state, action) => {
        console.log("update group details thunk fulfilled");
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
  setSelectedGroup,
  setShowGroupContextMenu,
  setGroupContextMenuLocation,
  setShowEditGroupModal,
  setIsSavingChanges,
} = groupsSlice.actions;

export default groupsSlice.reducer;
