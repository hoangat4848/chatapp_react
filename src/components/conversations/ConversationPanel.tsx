import React from "react";
import { useParams } from "react-router-dom";
import { StyledConversationChannelPage } from "../../utils/styles/index";

const ConversationChannelPage = () => {
  console.log(useParams());
  return (
    <StyledConversationChannelPage>
      Hello welcome back
    </StyledConversationChannelPage>
  );
};

export default ConversationChannelPage;
