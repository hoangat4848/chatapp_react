import { formatRelative } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import {
  MessageItemAvatar,
  MessageItemContainer,
  MessageItemContent,
  MessageItemDetails,
  MessageItemHeader,
} from "../../utils/styles";
import { Message, User } from "../../utils/types";
import EditMessageContainer from "./EditMessageContainer";

type FormattedMessageProps = {
  user?: User;
  message: Message;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isEditing: boolean;
  selectedEditMessage: Message | undefined;
  setSelectedEditMessage: Dispatch<SetStateAction<Message | undefined>>;
  onEditMessageInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const FormattedMessage = ({
  user,
  message,
  onContextMenu,
  isEditing,
  selectedEditMessage,
  setSelectedEditMessage,
  onEditMessageInputChange,
}: FormattedMessageProps) => {
  return (
    <MessageItemContainer onContextMenu={onContextMenu}>
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
          {isEditing && message.id === selectedEditMessage?.id ? (
            <EditMessageContainer
              selectedEditMessage={selectedEditMessage}
              onEditMessageChange={onEditMessageInputChange}
            />
          ) : (
            message.content
          )}
        </MessageItemContent>
      </MessageItemDetails>
    </MessageItemContainer>
  );
};
