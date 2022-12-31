import { formatRelative } from "date-fns";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../utils/context/AuthContext";
import { getRecipientFromConversation } from "../../utils/helpers";
import { StyledConversationSidebarItem } from "../../utils/styles";
import { Conversation } from "../../utils/types";
import styles from "./index.module.scss";

type Props = {
  conversation: Conversation;
};
const ConversationSidebarItem = ({ conversation }: Props) => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const recipient = getRecipientFromConversation(user, conversation);
  const content = conversation.lastMessageSent?.content;
  const displayContent =
    content && content.length > 10 ? content.substring(0, 20) + "..." : content;

  return (
    <StyledConversationSidebarItem
      onClick={() => navigate(`/conversations/${conversation.id}`)}
      selected={parseInt(id!) === conversation.id}
    >
      <div className={styles.conversationAvatar}></div>
      <div>
        <span className={styles.conversationName}>
          {`${recipient?.firstName} ${recipient?.lastName}`}
        </span>
        <span className={styles.conversationLastMessage}>{displayContent}</span>
        <span className={styles.conversationLastMessageSentTime}>
          {formatRelative(new Date(conversation.lastMessageSentAt), new Date())}
        </span>
      </div>
    </StyledConversationSidebarItem>
  );
};

export default ConversationSidebarItem;
