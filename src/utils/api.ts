import axios, { AxiosRequestConfig } from "axios";
import {
  Conversation,
  CreateMessageParams,
  CreateUserParams,
  Message,
  User,
  UserCredentialsParams,
} from "./types";

const { REACT_APP_API_URL } = process.env;

const config: AxiosRequestConfig = {
  withCredentials: true,
};

export const postRegisterUser = (data: CreateUserParams) =>
  axios.post(`${REACT_APP_API_URL}/auth/register`, data, config);

export const postLoginUser = (data: UserCredentialsParams) =>
  axios.post(`${REACT_APP_API_URL}/auth/login`, data, config);

export const getAuthUser = () =>
  axios.get<User>(`${REACT_APP_API_URL}/auth/status`, config);

export const getConversations = () =>
  axios.get<Conversation[]>(`${REACT_APP_API_URL}/conversations`, config);

export const getConversationMessages = (conversationId: number) =>
  axios.get<Message[]>(
    `${REACT_APP_API_URL}/messages/${conversationId}`,
    config
  );

export const postNewMessage = (data: CreateMessageParams) =>
  axios.post(`${REACT_APP_API_URL}/messages`, data, config);
