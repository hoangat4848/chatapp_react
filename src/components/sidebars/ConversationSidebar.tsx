import { useState } from "react";
import CreateConversationModal from "../modals/CreateConversationModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ConversationTab from "../conversations/ConversationSidebarTab";
import ConversationSidebarItem from "../conversations/ConversationSidebarItem";
import GroupSidebarItem from "../groups/GroupSidebarItem";

import {
  ConversationScrollableContainer,
  ConversationSidebarHeader,
  ConversationSidebarSearchbar,
  StyledConversationSidebar,
} from "../../utils/styles";

// const ConversationSidebar = () => {
//   const [showModal, setShowModal] = useState(false);

//   const conversations = useSelector(
//     (state: RootState) => state.conversation.conversations
//   );

//   const groups = useSelector((state: RootState) => state.group.groups);

//   const selectedConversationType = useSelector(
//     (state: RootState) => state.selectedConversationType.type
//   );

//   return (
//     <>
//       {showModal && <CreateConversationModal setShowModal={setShowModal} />}
//       <StyledConversationSidebar>
//         <ConversationSiderbarHeader>
//           <ConversationSearchbar placeholder="Search for conversation..." />
//           <ConversationTab />
//         </ConversationSiderbarHeader>
//         <ConversationSidebarContainer>
//
//         </ConversationSidebarContainer>
//       </StyledConversationSidebar>
//     </>
//   );
// };

// export default ConversationSidebar;

const ConversationSidebar = () => {
  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );

  const groups = useSelector((state: RootState) => state.group.groups);

  const selectedConversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  return (
    <StyledConversationSidebar>
      <ConversationSidebarHeader>
        <ConversationSidebarSearchbar placeholder="Search for conversation.." />
      </ConversationSidebarHeader>
      <ConversationTab />

      <ConversationScrollableContainer>
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
      </ConversationScrollableContainer>
    </StyledConversationSidebar>
  );
};

export default ConversationSidebar;
