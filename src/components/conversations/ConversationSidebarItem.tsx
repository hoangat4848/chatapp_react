import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/context/AuthContext";
import { getRecipientFromConversation } from "../../utils/helpers";
import { StyledConversationSidebarItem } from "../../utils/styles";
import { Conversation } from "../../utils/types";
import styles from "./index.module.scss";

type Props = {
  conversation: Conversation;
};
const ConversationSidebarItem = ({ conversation }: Props) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const recipient = getRecipientFromConversation(user, conversation);

  return (
    <StyledConversationSidebarItem
      onClick={() => navigate(`/conversations/${conversation.id}`)}
    >
      <div className={styles.conversationAvatar}></div>
      <div>
        <span className={styles.conversationName}>
          {`${recipient?.firstName} ${recipient?.lastName}`}
        </span>
        <span className={styles.conversationLastMessage}>
          {conversation.lastMessageSent?.content}
        </span>
      </div>
    </StyledConversationSidebarItem>
  );
};

export default ConversationSidebarItem;
