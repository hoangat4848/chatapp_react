import React from "react";
import { Outlet, useParams } from "react-router-dom";
import ConversationSidebar from "../components/conversations/ConversationSidebar";
import { Page } from "../utils/styles";

const ConversationPage = () => {
  return (
    <Page>
      <ConversationSidebar />
      <Outlet />
    </Page>
  );
};

export default ConversationPage;
