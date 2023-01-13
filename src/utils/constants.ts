import {
  ContextMenuItemType,
  ConversationTypeData,
  SettingsItem,
  UserSidebarItemType,
} from "./types";

export const chatTypes: ConversationTypeData[] = [
  {
    type: "private",
    label: "Private",
  },
  {
    type: "group",
    label: "Group",
  },
];

export const userContextMenuItems: ContextMenuItemType[] = [
  {
    label: "Kick User",
    action: "kick",
    color: "#ff0000",
    ownerOnly: true,
  },
  {
    label: "Transfer Owner",
    action: "transfer_owner",
    color: "#FFB800",
    ownerOnly: true,
  },
  {
    label: "Profile",
    action: "profile",
    color: "#7c7c7c",
    ownerOnly: false,
  },
];

export const friendsNavbarItems = [
  { id: "friends", label: "Friends", pathname: "/friends" },
  { id: "requests", label: "Requests", pathname: "/friends/requests" },
];

export const useSidebarItems: UserSidebarItemType[] = [
  {
    id: "conversations",
    pathname: "/conversations",
  },
  {
    id: "friends",
    pathname: "/friends",
  },
  {
    id: "settings",
    pathname: "/settings",
  },
];

export const settingsItem: SettingsItem[] = [
  {
    id: "profile",
    label: "Profile",
    pathname: "/settings/profile",
  },
  {
    id: "appearance",
    label: "Appearance",
    pathname: "/settings/appearance",
  },
];

export const PUBLIC_URL = "http://localhost:3001" + "/public/";
