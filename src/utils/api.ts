import axios, { AxiosRequestConfig } from "axios";
import {
  Conversation,
  CreateMessageParams,
  CreateUserParams,
  ConversationMessage,
  User,
  UserCredentialsParams,
  CreateConversationParams,
  DeleteMessageParams,
  DeleteMessageResponse,
  EditMessagePayload,
  Message,
  Group,
  FetchGroupMessagePayload,
  CreateGroupPayload,
  DeleteGroupMessageParams,
  DeleteGroupMessageReponse,
  EditGroupMessagePayload,
  GroupMessageType,
  AddGroupRecipientParams,
  RemoveGroupRecipientParams,
  UpdateGroupOwnerParams,
  Friend,
  FriendRequest,
  AcceptFriendRequestResponse,
} from "./types";

const { REACT_APP_API_URL: API_URL } = process.env;

const axiosClient = axios.create({ baseURL: API_URL });

const config: AxiosRequestConfig = {
  withCredentials: true,
};

export const postRegisterUser = (data: CreateUserParams) =>
  axiosClient.post(`/auth/register`, data, config);

export const postLoginUser = (data: UserCredentialsParams) =>
  axiosClient.post(`/auth/login`, data, config);

export const getAuthUser = () => axiosClient.get<User>(`/auth/status`, config);

export const getConversations = () =>
  axiosClient.get<Conversation[]>(`/conversations`, config);

export const getConversationById = (id: number) =>
  axiosClient.get<Conversation>(`/conversations/${id}`, config);

export const getConversationMessages = (conversationId: number) =>
  axiosClient.get<ConversationMessage>(
    `/conversations/${conversationId}/messages`,
    config
  );

export const createMessage = ({
  id: conversationId,
  content,
}: CreateMessageParams) =>
  axiosClient.post(
    `/conversations/${conversationId}/messages`,
    { content },
    config
  );

export const postNewConversation = (data: CreateConversationParams) =>
  axiosClient.post<Conversation>(`/conversations`, data, config);

export const deleteMessage = ({
  conversationId,
  messageId,
}: DeleteMessageParams) =>
  axiosClient.delete<DeleteMessageResponse>(
    `/conversations/${conversationId}/messages/${messageId}`,
    config
  );

export const editMessage = ({
  conversationId,
  messageId,
  content,
}: EditMessagePayload) =>
  axiosClient.patch<Message>(
    `/conversations/${conversationId}/messages/${messageId}`,
    {
      content,
    },
    config
  );

export const createGroup = (payload: CreateGroupPayload) =>
  axiosClient.post("/groups", payload, config);

export const fetchGroups = () => axiosClient.get<Group[]>(`/groups`, config);

export const fetchGroupById = (id: number) =>
  axiosClient.get(`/groups/${id}`, config);

export const fetchGroupMessages = (groupId: number) =>
  axiosClient.get<FetchGroupMessagePayload>(
    `/groups/${groupId}/messages`,
    config
  );

export const postGroupMessage = ({
  id: groupId,
  content,
}: CreateMessageParams) =>
  axiosClient.post(`/groups/${groupId}/messages`, { content }, config);

export const deleteGroupMessage = ({
  groupId,
  messageId,
}: DeleteGroupMessageParams) =>
  axiosClient.delete<DeleteGroupMessageReponse>(
    `/groups/${groupId}/messages/${messageId}`,
    config
  );

export const editGroupMessage = ({
  groupId,
  messageId,
  content,
}: EditGroupMessagePayload) =>
  axiosClient.patch<GroupMessageType>(
    `/groups/${groupId}/messages/${messageId}`,
    { content },
    config
  );

export const searchUsers = (query: string) =>
  axiosClient.get<User[]>(`/users/search?query=${query}`, config);

export const addGroupRecipient = ({
  groupId,
  email,
}: AddGroupRecipientParams) =>
  axiosClient.post<Group>(`/groups/${groupId}/recipients`, { email }, config);

export const removeGroupRecipient = ({
  groupId,
  userId,
}: RemoveGroupRecipientParams) =>
  axiosClient.delete<Group>(`/groups/${groupId}/recipients/${userId}`, config);

export const updateGroupOwner = ({
  groupId,
  newOwnerId,
}: UpdateGroupOwnerParams) =>
  axiosClient.patch<Group>(`/groups/${groupId}/owner`, { newOwnerId }, config);

export const leaveGroup = (groupId: number) =>
  axiosClient.delete<Group>(`/groups/${groupId}/recipients/leave`, config);

export const fetchFriends = () => axiosClient.get<Friend[]>(`/friends`, config);

export const fetchFriendRequests = () =>
  axiosClient.get<FriendRequest[]>(`/friends/requests`, config);

export const createFriendRequest = (email: string) =>
  axiosClient.post<FriendRequest>(`friends/requests`, { email }, config);

export const cancelFriendRequest = (id: number) =>
  axiosClient.delete<FriendRequest>(`/friends/requests/${id}/cancel`, config);

export const acceptFriendRequest = (id: number) =>
  axiosClient.patch<AcceptFriendRequestResponse>(
    `/friends/requests/${id}/accept`,
    {},
    config
  );

export const rejectFriendRequest = (id: number) =>
  axiosClient.patch<FriendRequest>(
    `/friends/requests/${id}/reject`,
    {},
    config
  );

export const removeFriend = (id: number) =>
  axiosClient.delete<Friend>(`/friends/${id}`, config);

export const checkUsernameExists = (username: string) =>
  axiosClient.get<User>(`/users/check?username=${username}`, config);
