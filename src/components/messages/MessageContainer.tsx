import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { AuthContext } from "../../utils/context/AuthContext";
import { MessageMenuContext } from "../../utils/context/MessageMenuContext";
import {
  MessageItemContainer,
  MessageItemContent,
  StyledMessageContainer,
} from "../../utils/styles";
import { Message } from "../../utils/types";
import SelectedMessageContextMenu from "../context-menus/SelectedMessageContextMenu";
import EditMessageContainer from "./EditMessageContainer";
import { FormattedMessage } from "./FormattedMessage";

const MessageContainer = () => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [selectedMessage, setSelectedMessage] = useState<Message>();
  const [selectedEditMessage, setSelectedEditMessage] = useState<Message>();
  const [isEditing, setIsEditing] = useState(false);
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
    if (message.author.id !== user?.id) return;
    setContextMenuPosition({ x: e.pageX, y: e.pageY });
    setShowContextMenu(true);
    setSelectedMessage(message);
  };

  const onEditMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedEditMessage) return;
    setSelectedEditMessage(
      (prev) => prev && { ...prev, content: e.target.value }
    );
  };

  useEffect(() => {
    const handleClick = () => setShowContextMenu(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) =>
      e.key === "Escape" && setIsEditing(false);
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    return () => {
      setSelectedEditMessage(undefined);
      setSelectedMessage(undefined);
      setIsEditing(false);
    };
  }, [conversationId]);

  const formatMessages = () => {
    return messages.map((m, index, arr) => {
      const currentMessage = arr[index];
      const nextMessage = arr[index + 1];
      if (
        index === arr.length - 1 ||
        currentMessage.author.id !== nextMessage.author.id
      ) {
        return (
          <FormattedMessage
            key={m.id}
            user={user}
            message={m}
            onContextMenu={(e) => onContextMenu(e, m)}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            selectedEditMessage={selectedEditMessage}
            setSelectedEditMessage={setSelectedEditMessage}
            onEditMessageInputChange={onEditMessageInputChange}
          />
        );
      } else if (currentMessage.author.id === nextMessage.author.id)
        return (
          <MessageItemContainer
            key={m.id}
            onContextMenu={(e) => onContextMenu(e, m)}
          >
            <MessageItemContent padding="0 0 0 65px">
              {isEditing && m.id === selectedEditMessage?.id ? (
                <EditMessageContainer
                  selectedEditMessage={selectedEditMessage}
                  onEditMessageChange={onEditMessageInputChange}
                  setIsEditing={setIsEditing}
                />
              ) : (
                m.content
              )}
            </MessageItemContent>
          </MessageItemContainer>
        );
      else return null;
    });
  };

  return (
    <MessageMenuContext.Provider
      value={{
        message: selectedMessage,
        setMessage: setSelectedMessage,
        editMessage: selectedEditMessage,
        setEditMessage: setSelectedEditMessage,
      }}
    >
      <StyledMessageContainer>
        <>{formatMessages()}</>
        {showContextMenu && (
          <SelectedMessageContextMenu
            point={contextMenuPosition}
            setIsEditing={setIsEditing}
          />
        )}
      </StyledMessageContainer>
    </MessageMenuContext.Provider>
  );
};

export default MessageContainer;
