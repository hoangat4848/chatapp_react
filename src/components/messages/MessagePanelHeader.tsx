import { PersonAdd } from "akar-icons";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { selectConversationById } from "../../store/slices/conversationSlice";
import { selectGroupById } from "../../store/slices/groupSlice";
import { selectType } from "../../store/slices/selectedSlice";
import { AuthContext } from "../../utils/context/AuthContext";
import { StyledMessagePanelHeader } from "../../utils/styles";

const MessagePanelHeader = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const type = useSelector(selectType);

  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(id!))
  );
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(id!))
  );

  const displayName =
    user?.id === conversation?.creator.id
      ? `${conversation?.recipient.firstName} ${conversation?.recipient.lastName}`
      : `${conversation?.creator.firstName} ${conversation?.creator.lastName}`;

  const groupTitle = group?.title ?? "Group";

  const headerTitle = type === "group" ? groupTitle : displayName;

  // TODO: Add avatar
  return (
    <StyledMessagePanelHeader>
      <p>{headerTitle}</p>
      {type === "group" && <PersonAdd size={24} />}
    </StyledMessagePanelHeader>
  );
};

export default MessagePanelHeader;
