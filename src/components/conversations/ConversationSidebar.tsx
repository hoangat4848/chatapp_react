import { useState } from "react";
import {
  ConversationSidebarContainer,
  ConversationSiderbarHeader,
  StyledConversationSidebar,
} from "../../utils/styles";
import { BsPencilSquare } from "react-icons/bs";
import CreateConversationModal from "../modals/CreateConversationModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ConversationSelected from "./ConversationSelected";
import ConversationSidebarItem from "./ConversationSidebarItem";
import GroupSidebarItem from "../groups/GroupSidebarItem";

const ConversationSidebar = () => {
  const [showModal, setShowModal] = useState(false);

  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );

  const groups = useSelector((state: RootState) => state.group.groups);

  const selectedConversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

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
          <ConversationSelected />
          <section>
            {selectedConversationType === "private"
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
        </ConversationSidebarContainer>
      </StyledConversationSidebar>
    </>
  );
};

export default ConversationSidebar;
