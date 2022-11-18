import React from "react";
import { Outlet, useParams } from "react-router-dom";
import ConversationSidebar from "../components/conversations/ConversationSidebar";
import { Page } from "../utils/styles";
import mockConversations from "../__mock__/conversations";

const ConversationPage = () => {
  return (
    <Page>
      <ConversationSidebar conversations={mockConversations} />
      <Outlet />
    </Page>
  );
};

export default ConversationPage;
