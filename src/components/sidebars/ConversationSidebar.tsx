import { useState } from "react";
import CreateConversationModal from "../modals/CreateConversationModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ConversationTab from "../conversations/ConversationSidebarTab";
import ConversationSidebarItem from "../conversations/ConversationSidebarItem";
import GroupSidebarItem from "../groups/GroupSidebarItem";

import {
  ConversationCreateButton,
  ConversationScrollableContainer,
  ConversationSidebarHeader,
  ConversationSidebarSearchbar,
  StyledConversationSidebar,
} from "../../utils/styles";
import { ChatAdd, PeopleGroup } from "akar-icons";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import CreateGroupModal from "../modals/CreateGroupModal";

const ConversationSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );

  const groups = useSelector((state: RootState) => state.group.groups);

  const conversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  return (
    <>
      {showModal && conversationType === "private" && (
        <CreateConversationModal setShowModal={setShowModal} />
      )}
      {showModal && conversationType === "group" && (
        <CreateGroupModal setShowModal={setShowModal} />
      )}
      <StyledConversationSidebar>
        <ConversationSidebarHeader>
          <ConversationSidebarSearchbar placeholder="Search for conversation.." />
          {conversationType === "private" ? (
            <ChatAdd
              size={24}
              strokeWidth={2}
              cursor="pointer"
              onClick={() => setShowModal(true)}
            />
          ) : (
            <AiOutlineUsergroupAdd
              size={24}
              strokeWidth={2}
              cursor="pointer"
              onClick={() => setShowModal(true)}
            />
          )}
        </ConversationSidebarHeader>
        <ConversationTab />

        <ConversationScrollableContainer>
          <section>
            {conversationType === "private"
              ? conversations.map((conversation) => (
                  <ConversationSidebarItem
                    key={conversation.id}
                    conversation={conversation}
                  />
                ))
              : groups.map((group) => (
                  <GroupSidebarItem key={group.id} group={group} />
                ))}
          </section>
        </ConversationScrollableContainer>
      </StyledConversationSidebar>
    </>
  );
};

export default ConversationSidebar;
