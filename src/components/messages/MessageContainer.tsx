import { format, formatRelative } from "date-fns";
import React, { PropsWithChildren, useContext, useEffect } from "react";
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

type Props = {
  messages: Message[];
};

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
        <MessageItemContent>{message.content}</MessageItemContent>
      </MessageItemDetails>
    </MessageItemContainer>
  );
};

const MessageContainer = ({ messages }: Props) => {
  const { user } = useContext(AuthContext);

  const formatMessages = () => {
    return messages.map((m, index, arr) => {
      if (index === arr.length - 1) {
        return <FormattedMessage user={user} message={m} />;
      }
      const currentMessage = arr[index];
      const nextMessage = arr[index + 1];
      if (currentMessage.author.id === nextMessage.author.id)
        return (
          <MessageItemContainer>
            <MessageItemDetails>
              <MessageItemContent padding="0 0 0 65px">
                {m.content}
              </MessageItemContent>
            </MessageItemDetails>
          </MessageItemContainer>
        );
      else return <FormattedMessage user={user} message={m} />;
    });
  };

  return (
    <StyledMessageContainer>
      {/* {messages.map((message) => (
        // <MessageItemContainer>
        //   <MessageItemAvatar />
        //   <MessageItemDetails>
        //     <MessageItemHeader>
        //       <span
        //         className="authorName"
        //         style={{
        //           color: user?.id === message.author.id ? "#5e88ff" : "#757575",
        //         }}
        //       >{`${message.author.firstName} ${message.author.lastName} `}</span>
        //       <span className="time">
        //         {formatRelative(new Date(message.createdAt), new Date())}
        //       </span>
        //     </MessageItemHeader>
        //     <MessageItemContent>{message.content}</MessageItemContent>
        //   </MessageItemDetails>
        // </MessageItemContainer>
      ))} */}

      {formatMessages()}
    </StyledMessageContainer>
  );
};

export default MessageContainer;
