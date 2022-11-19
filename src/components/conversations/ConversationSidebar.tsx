import React, { useState } from "react";
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
import CreateConversationModal from "../modals/CreateConversationModal";

type ConversationSidebarProps = {
  conversations: ConversationType[];
};

const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  conversations,
}) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      <StyledConversationSidebar>
        <ConversationSiderbarHeader>
          <h1>Conversations</h1>
          <div onClick={() => setShowModal(true)}>
            <BsPencilSquare size={30} />
          </div>
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
    </>
  );
};

export default ConversationSidebar;
