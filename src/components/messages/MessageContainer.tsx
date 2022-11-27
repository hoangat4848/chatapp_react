import { format, formatRelative } from "date-fns";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { AuthContext } from "../../utils/context/AuthContext";
import { MessageMenuContext } from "../../utils/context/MessageMenuContext";
import {
  ContextMenu,
  MessageItemAvatar,
  MessageItemContainer,
  MessageItemContent,
  MessageItemDetails,
  MessageItemHeader,
  StyledMessageContainer,
} from "../../utils/styles";
import { Message, User } from "../../utils/types";
import SelectedMessageContextMenu from "../context-menus/SelectedMessageContextMenu";

type FormattedMessageProps = {
  user?: User;
  message: Message;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
export const FormattedMessage = ({
  user,
  message,
  onContextMenu,
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
          {message.content}
        </MessageItemContent>
      </MessageItemDetails>
    </MessageItemContainer>
  );
};

const MessageContainer = () => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [selectedMessage, setSelectedMessage] = useState<Message>();
  const { user } = useContext(AuthContext);
  const { id: conversationId } = useParams();
  const messages =
    useSelector(
      (state: RootState) =>
        state.message.messages.find((m) => m.id === parseInt(conversationId!))
          ?.messages
    ) ?? [];

  const onContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: Message
  ) => {
    e.preventDefault();
    setPoint({ x: e.pageX, y: e.pageY });
    setShowContextMenu(true);
    setSelectedMessage(message);
  };

  useEffect(() => {
    const handleClick = () => setShowContextMenu(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const formatMessages = () => {
    return messages.map((m, index, arr) => {
      if (index === arr.length - 1) {
        return (
          <FormattedMessage
            key={m.id}
            user={user}
            message={m}
            onContextMenu={(e) => onContextMenu(e, m)}
          />
        );
      }
      const currentMessage = arr[index];
      const nextMessage = arr[index + 1];
      if (currentMessage.author.id === nextMessage.author.id)
        return (
          <MessageItemContainer
            key={m.id}
            onContextMenu={(e) => onContextMenu(e, m)}
          >
            <MessageItemContent padding="0 0 0 65px">
              {m.content}
            </MessageItemContent>
          </MessageItemContainer>
        );
      else
        return (
          <FormattedMessage
            key={m.id}
            user={user}
            message={m}
            onContextMenu={(e) => onContextMenu(e, m)}
          />
        );
    });
  };

  return (
    <MessageMenuContext.Provider
      value={{ message: selectedMessage, setMessage: setSelectedMessage }}
    >
      <StyledMessageContainer>
        <>{formatMessages()}</>
        {showContextMenu && <SelectedMessageContextMenu point={point} />}
      </StyledMessageContainer>
    </MessageMenuContext.Provider>
  );
};

export default MessageContainer;
