import { formatRelative } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  MessageItemAvatar,
  MessageItemContainer,
  MessageItemContent,
  MessageItemDetails,
  MessageItemHeader,
} from "../../utils/styles";
import { GroupMessageType, Message, User } from "../../utils/types";
import EditMessageContainer from "./EditMessageContainer";

type Props = {
  user?: User;
  message: Message | GroupMessageType;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onEditMessageInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const FormattedMessage = ({
  user,
  message,
  onContextMenu,
  onEditMessageInputChange,
}: Props) => {
  const { isEditingMessage, messageBeingEdited } = useSelector(
    (state: RootState) => state.messageContainer
  );

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
          {isEditingMessage && message.id === messageBeingEdited?.id ? (
            <EditMessageContainer
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
