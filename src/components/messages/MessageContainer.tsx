import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { selectGroupMessage } from "../../store/slices/groupMessageSlice";
import {
  editMessageBeingEditedContent,
  resetMessageContainer,
  setIsEditingMessage,
  setSelectedMessage,
} from "../../store/slices/messageContainerSlice";
import { selectConversationMessage } from "../../store/slices/messageSlice";
import { AuthContext } from "../../utils/context/AuthContext";
import {
  MessageItemContainer,
  MessageItemContent,
  StyledMessageContainer,
} from "../../utils/styles";
import { GroupMessageType, Message } from "../../utils/types";
import SelectedMessageContextMenu from "../context-menus/SelectedMessageContextMenu";
import EditMessageContainer from "./EditMessageContainer";
import { FormattedMessage } from "./FormattedMessage";

const MessageContainer = () => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const { user } = useContext(AuthContext);

  const { isEditingMessage, messageBeingEdited } = useSelector(
    (state: RootState) => state.messageContainer
  );
  const dispatch = useDispatch();

  const { id } = useParams();
  const conversationMessages = useSelector((state: RootState) =>
    selectConversationMessage(state, parseInt(id!))
  );
  const groupMessages = useSelector((state: RootState) =>
    selectGroupMessage(state, parseInt(id!))
  );
  const selectedType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const onContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: Message
  ) => {
    e.preventDefault();
    if (message.author.id !== user?.id) return;
    setContextMenuPosition({ x: e.pageX, y: e.pageY });
    setShowContextMenu(true);
    dispatch(setSelectedMessage(message));
  };

  const onEditMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(editMessageBeingEditedContent(e.target.value));

  useEffect(() => {
    const handleClick = () => setShowContextMenu(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) =>
      e.key === "Escape" && dispatch(setIsEditingMessage(false));
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetMessageContainer());
    };
  }, [id, dispatch]);

  const mapMessages = (
    m: Message | GroupMessageType,
    index: number,
    arr: Message[] | GroupMessageType[]
  ) => {
    const currentMessage = arr[index];
    const nextMessage = arr[index + 1];
    if (
      index === arr.length - 1 ||
      currentMessage.author.id !== nextMessage.author.id
    )
      return (
        <FormattedMessage
          key={m.id}
          user={user}
          message={m}
          onContextMenu={(e) => onContextMenu(e, m)}
          onEditMessageInputChange={onEditMessageInputChange}
        />
      );

    if (currentMessage.author.id === nextMessage.author.id)
      return (
        <MessageItemContainer
          key={m.id}
          onContextMenu={(e) => onContextMenu(e, m)}
        >
          <MessageItemContent padding="0 0 0 65px">
            {isEditingMessage && m.id === messageBeingEdited?.id ? (
              <EditMessageContainer
                onEditMessageChange={onEditMessageInputChange}
              />
            ) : (
              m.content
            )}
          </MessageItemContent>
        </MessageItemContainer>
      );

    return null;
  };

  const formatMessages = () => {
    if (selectedType === "private") {
      if (!conversationMessages) return [];
      return conversationMessages.messages.map(mapMessages);
    }
    if (selectedType === "group") {
      if (!groupMessages) return [];
      return groupMessages.messages.map(mapMessages);
    }
  };

  return (
    <StyledMessageContainer>
      <>{formatMessages()}</>
      {showContextMenu && (
        <SelectedMessageContextMenu point={contextMenuPosition} />
      )}
    </StyledMessageContainer>
  );
};

export default MessageContainer;
