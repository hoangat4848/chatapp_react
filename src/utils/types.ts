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
  lastMessageSent?: Message;
  lastMessageSentAt: string;
};

export type CreateConversationParams = {
  recipient: string;
};

export type Message = {
  id: number;
  content: string;
  createdAt: string;
  author: User;
  conversation?: Conversation;
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
  content: string;
  conversationId: number;
};
