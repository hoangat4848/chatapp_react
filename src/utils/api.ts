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
  GroupMessage,
  FetchGroupMessagePayload,
} from "./types";

const { REACT_APP_API_URL: API_URL } = process.env;

const config: AxiosRequestConfig = {
  withCredentials: true,
};

export const postRegisterUser = (data: CreateUserParams) =>
  axios.post(`${API_URL}/auth/register`, data, config);

export const postLoginUser = (data: UserCredentialsParams) =>
  axios.post(`${API_URL}/auth/login`, data, config);

export const getAuthUser = () =>
  axios.get<User>(`${API_URL}/auth/status`, config);

export const getConversations = () =>
  axios.get<Conversation[]>(`${API_URL}/conversations`, config);

export const getConversationMessages = (conversationId: number) =>
  axios.get<ConversationMessage>(
    `${API_URL}/conversations/${conversationId}/messages`,
    config
  );

export const postNewMessage = (
  conversationId: number,
  data: CreateMessageParams
) =>
  axios.post(
    `${API_URL}/conversations/${conversationId}/messages`,
    data,
    config
  );

export const postNewConversation = (data: CreateConversationParams) =>
  axios.post<Conversation>(`${API_URL}/conversations`, data, config);

export const deleteMessage = ({
  conversationId,
  messageId,
}: DeleteMessageParams) =>
  axios.delete<DeleteMessageResponse>(
    `${API_URL}/conversations/${conversationId}/messages/${messageId}`,
    config
  );

export const editMessage = ({
  conversationId,
  messageId,
  content,
}: EditMessagePayload) =>
  axios.patch<Message>(
    `${API_URL}/conversations/${conversationId}/messages/${messageId}`,
    {
      content,
    },
    config
  );

export const fetchGroups = () =>
  axios.get<Group[]>(`${API_URL}/groups`, config);

export const fetchGroupMessages = (groupId: number) =>
  axios.get<FetchGroupMessagePayload>(
    `${API_URL}/groups/${groupId}/messages`,
    config
  );
