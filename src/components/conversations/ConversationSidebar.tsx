import React from "react";
import {
  ConversationSidebarContainer,
  ConversationSidebarItem,
  ConversationSiderbarHeader,
  StyledConversationSidebar,
} from "../../utils/styles";
import { BsPencilSquare } from "react-icons/bs";
import { ConversationType } from "../../utils/types";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";

type ConversationSidebarProps = {
  conversations: ConversationType[];
};

const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  conversations,
}) => {
  const navigate = useNavigate();

  return (
    <StyledConversationSidebar>
      <ConversationSiderbarHeader>
        <h1>Conversations</h1>
        <BsPencilSquare size={30} />
      </ConversationSiderbarHeader>

      <ConversationSidebarContainer>
        {conversations.map((conversation) => (
          <ConversationSidebarItem
            key={conversation.id}
            onClick={() => navigate(`/conversations/${conversation.id}`)}
          >
            <div className={styles.conversationAvatar}></div>
            <div>
              <span className={styles.conversationName}>
                {conversation.name}
              </span>
              <span className={styles.conversationLastMessage}>
                {conversation.lastMessage}
              </span>
            </div>
          </ConversationSidebarItem>
        ))}
      </ConversationSidebarContainer>
    </StyledConversationSidebar>
  );
};

export default ConversationSidebar;
