import { format, formatRelative } from "date-fns";
import React, { PropsWithChildren, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { AuthContext } from "../../utils/context/AuthContext";
import {
  MessageItemAvatar,
  MessageItemContainer,
  MessageItemContent,
  MessageItemDetails,
  MessageItemHeader,
  StyledMessageContainer,
} from "../../utils/styles";
import { Message, User } from "../../utils/types";

type FormattedMessageProps = {
  user?: User;
  message: Message;
};
export const FormattedMessage = ({ user, message }: FormattedMessageProps) => {
  return (
    <MessageItemContainer>
      <MessageItemAvatar />
      <MessageItemDetails>
        <MessageItemHeader>
          <span
            className="authorName"
            style={{
              color: user?.id === message.author.id ? "#5e88ff" : "#757575",
            }}
          >{`${message.author.firstName} ${message.author.lastName} `}</span>
          <span className="time">
            {formatRelative(new Date(message.createdAt), new Date())}
          </span>
        </MessageItemHeader>
        <MessageItemContent padding="8px 0 0 0">
          {message.content}
        </MessageItemContent>
      </MessageItemDetails>
    </MessageItemContainer>
  );
};

const MessageContainer = () => {
  const { user } = useContext(AuthContext);
  const { id: conversationId } = useParams();
  const messages =
    useSelector(
      (state: RootState) =>
        state.conversation.messages.find(
          (m) => m.id === parseInt(conversationId!)
        )?.messages
    ) ?? [];

  const formatMessages = () => {
    return messages.map((m, index, arr) => {
      if (index === arr.length - 1) {
        return <FormattedMessage key={m.id} user={user} message={m} />;
      }
      const currentMessage = arr[index];
      const nextMessage = arr[index + 1];
      if (currentMessage.author.id === nextMessage.author.id)
        return (
          <MessageItemContainer key={m.id}>
            <MessageItemContent padding="0 0 0 65px">
              {m.content}
            </MessageItemContent>
          </MessageItemContainer>
        );
      else return <FormattedMessage key={m.id} user={user} message={m} />;
    });
  };

  return <StyledMessageContainer>{formatMessages()}</StyledMessageContainer>;
};

export default MessageContainer;
