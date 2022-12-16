import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Point, User } from "../../utils/types";

export interface GroupRecipientsSidebarState {
  showSidebar: boolean;
  showUserContextMenu: boolean;
  selectedUser?: User;
  location: Point;
}

const initialState: GroupRecipientsSidebarState = {
  showSidebar: true,
  showUserContextMenu: false,
  location: { x: 0, y: 0 },
};

export const groupRecipientsSidebarSlice = createSlice({
  name: "groupRecipientSidebarSlice",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    toggleContextMenu: (state) => {
      state.showUserContextMenu = !state.showUserContextMenu;
    },
    setShowContextMenu: (state, action: PayloadAction<boolean>) => {
      state.showUserContextMenu = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
    setContextMenuLocation: (state, action: PayloadAction<Point>) => {
      state.location = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  toggleContextMenu,
  setContextMenuLocation,
  setSelectedUser,
  setShowContextMenu,
} = groupRecipientsSidebarSlice.actions;

export default groupRecipientsSidebarSlice.reducer;
