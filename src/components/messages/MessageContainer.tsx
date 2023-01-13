import React, { useCallback, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { selectGroupMessage } from "../../store/slices/groupMessageSlice";
import {
  editMessageBeingEditedContent,
  resetMessageContainer,
  setIsEditingMessage,
  setSelectedContextMenuPosition,
  setSelectedMessage,
  setShowContextMenu,
} from "../../store/slices/messageContainerSlice";
import { selectConversationMessage } from "../../store/messages/messageSlice";
import { AuthContext } from "../../utils/context/AuthContext";
import {
  MessageItemContainer,
  MessageItemDetails,
  StyledMessageContainer,
} from "../../utils/styles";
import { GroupMessageType, Message } from "../../utils/types";
import SelectedMessageContextMenu from "../context-menus/SelectedMessageContextMenu";
import useClick from "../../hooks/useClick";
import useKeydown from "../../hooks/useKeydown";
import MessageItemContainerBody from "./MessageItemContainerBody";
import MessageItemHeader from "./MessageItemHeader";
import UserAvatar from "../users/UserAvatar";

const MessageContainer = () => {
  const { showContextMenu } = useSelector(
    (state: RootState) => state.messageContainer
  );
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

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
    dispatch(setSelectedContextMenuPosition({ x: e.pageX, y: e.pageY }));
    dispatch(setShowContextMenu(true));
    dispatch(setSelectedMessage(message));
  };

  const onEditMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(editMessageBeingEditedContent(e.target.value));

  const handleClick = useCallback(
    () => dispatch(setShowContextMenu(false)),
    [dispatch]
  );
  useClick(handleClick);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) =>
      e.key === "Escape" && dispatch(setIsEditingMessage(false)),
    [dispatch]
  );
  useKeydown(handleKeydown);

  useEffect(() => {
    return () => {
      dispatch(resetMessageContainer());
    };
  }, [id, dispatch]);

  const mapMessages = (
    message: Message | GroupMessageType,
    index: number,
    messages: Message[] | GroupMessageType[]
  ) => {
    const currentMessage = messages[index];
    const nextMessage = messages[index + 1];
    const showMessageHeader =
      index + 1 === messages.length ||
      currentMessage.author.id !== nextMessage.author.id;
    return (
      <MessageItemContainer
        key={message.id}
        onContextMenu={(e) => onContextMenu(e, message)}
      >
        {showMessageHeader && <UserAvatar user={message.author} />}
        {showMessageHeader ? (
          <MessageItemDetails>
            <MessageItemHeader message={message} />
            <MessageItemContainerBody
              key={message.id}
              message={message}
              onEditMessageChange={onEditMessageInputChange}
              padding="8px 0 0 0"
            />
          </MessageItemDetails>
        ) : (
          <MessageItemContainerBody
            key={message.id}
            message={message}
            onEditMessageChange={onEditMessageInputChange}
            padding="0 0 0 67px"
          />
        )}
      </MessageItemContainer>
    );
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
    <StyledMessageContainer
      onScroll={(e) => {
        const node = e.target as HTMLDivElement;
        const scrollTopMax = node.scrollHeight - node.clientHeight;
        if (-scrollTopMax === node.scrollTop) {
          console.log("asd");
        }
      }}
    >
      <>{formatMessages()}</>
      {showContextMenu && <SelectedMessageContextMenu />}
    </StyledMessageContainer>
  );
};

export default MessageContainer;
