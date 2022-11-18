import React from "react";
import { StyledConversationSidebar } from "../../utils/styles";
import { BsPencilSquare } from "react-icons/bs";

const ConversationSidebar = () => {
  return (
    <StyledConversationSidebar>
      <header>
        <h1>Conversations</h1>
        <BsPencilSquare size={30} />
      </header>
    </StyledConversationSidebar>
  );
};

export default ConversationSidebar;
