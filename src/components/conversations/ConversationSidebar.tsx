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

type ConversationSidebarProps = {
  conversations: ConversationType[];
};

const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  conversations,
}) => {
  return (
    <StyledConversationSidebar>
      <ConversationSiderbarHeader>
        <h1>Conversations</h1>
        <BsPencilSquare size={30} />
      </ConversationSiderbarHeader>

      <ConversationSidebarContainer>
        {conversations.map((conversation) => (
          <ConversationSidebarItem key={conversation.id}>
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
