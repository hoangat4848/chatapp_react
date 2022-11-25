import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { selectConversationById } from "../../store/slices/conversationSlice";
import { AuthContext } from "../../utils/context/AuthContext";
import { StyledMessagePanelHeader } from "../../utils/styles";

const MessagePanelHeader = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(id!))
  );
  if (!conversation)
    return <StyledMessagePanelHeader>...</StyledMessagePanelHeader>;

  const { creator, recipient } = conversation;
  const displayName =
    user?.id === creator.id
      ? `${recipient.firstName} ${recipient.lastName}`
      : `${creator.firstName} ${creator.lastName}`;

  // TODO: Add avatar
  return <StyledMessagePanelHeader>{displayName}</StyledMessagePanelHeader>;
};

export default MessagePanelHeader;
