import React from "react";
import { useParams } from "react-router-dom";
import { StyledConversationChannelPage } from "../utils/styles";

const ConversationChannelPage = () => {
  const { id } = useParams();

  return <StyledConversationChannelPage>{id}</StyledConversationChannelPage>;
};

export default ConversationChannelPage;
