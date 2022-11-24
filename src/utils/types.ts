export type CreateUserParams = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type UserCredentialsParams = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

export type Conversation = {
  id: number;
  creator: User;
  recipient: User;
  createdAt: string;
  messages: Message[];
};

export type CreateConversationParams = {
  recipient: string;
};

export type Message = {
  id: number;
  content: string;
  createdAt: string;
  author: User;
};

export type ConversationMessage = {
  id: number;
  messages: Message[];
};

export type MessageEventPayload = {
  id: number;
  conversation: Conversation;
  author: User;
  content: string;
  createdAt: string;
};

export type CreateMessageParams = {
  content: string;
  conversationId: number;
};
