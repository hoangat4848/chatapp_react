import React from "react";

export type CreateUserParams = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type UserCredentialsParams = {
  username: string;
  password: string;
};

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  profile?: Profile;
};

export type Profile = {
  id: number;
  about?: string;
  banner?: string;
  avatar?: string;
};

export type Conversation = {
  id: number;
  creator: User;
  recipient: User;
  createdAt: string;
  lastMessageSent?: Message;
  lastMessageSentAt: string;
};

export type CreateConversationParams = {
  username: string;
  message: string;
};

export type Message = {
  id: number;
  content?: string;
  createdAt: string;
  author: User;
  conversation?: Conversation;
  attachments?: MessageAttachment[];
};

export type ConversationMessage = {
  id: number;
  messages: Message[];
};

export type MessageEventPayload = {
  message: Message;
  conversation: Conversation;
};

export type CreateMessageParams = {
  id: number;
  content: string;
};

export type DeleteMessageParams = {
  conversationId: number;
  messageId: number;
};

export type DeleteMessageResponse = {
  conversationId: number;
  messageId: number;
};
export type DeleteGroupMessageReponse = {
  groupId: number;
  messageId: number;
};

export type EditMessagePayload = {
  conversationId: number;
  messageId: number;
  content: string;
};

export type ConversationSelectedProps = {
  selected: boolean;
};

export type ConversationType = "private" | "group";

export type ConversationTypeData = {
  type: ConversationType;
  label: string;
};

export type Group = {
  id: number;
  title?: string;
  users: User[];
  creator: User;
  owner: User;
  messages: Message[];
  lastMessageSent: Message;
  lastMessageSentAt: Date;
  avatar?: string;
};

export type GroupMessageType = {
  id: number;
  content?: string;
  createdAt: string;
  author: User;
  group?: Group;
  attachments?: MessageAttachment[];
};

export type GroupMessage = {
  id: number;
  messages: GroupMessageType[];
};

export type FetchGroupMessagePayload = {
  id: number;
  messages: GroupMessageType[];
};

export type GroupMessageEventPayload = {
  message: GroupMessageType;
  group: Group;
};

export type CreateGroupPayload = {
  users: string[];
  title: string;
};

export type DeleteGroupMessageParams = {
  groupId: number;
  messageId: number;
};

export type EditGroupMessagePayload = {
  groupId: number;
  messageId: number;
  content: string;
};

export type AddGroupRecipientParams = {
  groupId: number;
  username: string;
};

export type RemoveGroupRecipientParams = {
  groupId: number;
  userId: number;
};

export type RemoveGroupUserMessagePayload = {
  group: Group;
  user: User;
};

export type Point = {
  x: number;
  y: number;
};

export type UserContextMenuActionType = "kick" | "transfer_owner" | "profile";

export type ContextMenuItemType = {
  label: string;
  action: UserContextMenuActionType;
  color: string;
  ownerOnly: boolean;
};

export type UpdateGroupOwnerParams = {
  groupId: number;
  newOwnerId: number;
};

export type ContextMenuEvent<T = HTMLDivElement> = React.MouseEvent<
  T,
  MouseEvent
>;
export type DivMouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type DragEvent = React.DragEvent<HTMLTextAreaElement>;
export type ClipboardEvent = React.ClipboardEvent<HTMLTextAreaElement>;

export type Friend = {
  id: number;
  sender: User;
  receiver: User;
  createdAt: number;
};

export type FriendRequest = {
  id: number;
  sender: User;
  receiver: User;
  createdAt: number;
};

export type HandleFriendRequestAction = "accept" | "reject" | "cancel";

export type AcceptFriendRequestResponse = {
  friend: Friend;
  friendRequest: FriendRequest;
};

export type UserSidebarRoute =
  | "conversations"
  | "friends"
  | "connections"
  | "settings";
export type UserSidebarItemType = {
  id: UserSidebarRoute;
  pathname: string;
};

export type SettingsSidebarRouteType =
  | "profile"
  | "security"
  | "notifications"
  | "integrations"
  | "appearance";

export type SettingsItem = {
  id: SettingsSidebarRouteType;
  label: string;
  pathname: string;
};

export type RateLimitType = "group" | "private";
export type UpdateRateLimitPayload = {
  type: RateLimitType;
  status: boolean;
};

export type Attachment = {
  id: number;
  file: File;
};

export type MessageAttachment = {
  key: string;
};

export type FriendRequestDetail = {
  status: string;
  displayName: string;
  user: User;
  incoming: boolean;
};

export type SelectableTheme = "dark" | "light";

export type UpdateGroupDetailsPayload = {
  groupId: number;
  data: FormData;
};
