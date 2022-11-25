import React, { useContext, useEffect, useState } from "react";
import {
  ConversationSidebarContainer,
  ConversationSidebarItem,
  ConversationSiderbarHeader,
  StyledConversationSidebar,
} from "../../utils/styles";
import { BsPencilSquare } from "react-icons/bs";
import { Conversation } from "../../utils/types";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import CreateConversationModal from "../modals/CreateConversationModal";
import { AuthContext } from "../../utils/context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";

const ConversationSidebar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );

  const getDisplayUser = (conversation: Conversation) => {
    const userId = user?.id;
    return conversation.creator.id === userId
      ? conversation.recipient
      : conversation.creator;
  };

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
                  {`${getDisplayUser(conversation).firstName} ${
                    getDisplayUser(conversation).lastName
                  }`}
                </span>
                <span className={styles.conversationLastMessage}>
                  {conversation.lastMessageSent.content}
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
