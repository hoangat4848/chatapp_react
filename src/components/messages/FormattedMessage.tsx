import { formatRelative } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getImageUrl } from "../../utils/helpers";
import {
  UserAvatar,
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
      <UserAvatar />
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
        {isEditingMessage && message.id === messageBeingEdited?.id ? (
          <MessageItemContent padding="8px 0 0 0">
            <EditMessageContainer
              onEditMessageChange={onEditMessageInputChange}
            />
          </MessageItemContent>
        ) : (
          <MessageItemContent padding="8px 0 0 0">
            {message.content}
            <div>
              {message.attachments?.map((attachment) => (
                <img
                  key={attachment.key}
                  src={getImageUrl(attachment.key)}
                  width={300}
                  alt={attachment.key}
                />
              ))}
            </div>
          </MessageItemContent>
        )}
      </MessageItemDetails>
    </MessageItemContainer>
  );
};
