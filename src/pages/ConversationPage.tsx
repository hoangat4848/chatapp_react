import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import ConversationSidebar from "../components/conversations/ConversationSidebar";
import { getConversations } from "../utils/api";
import { Page } from "../utils/styles";
import { Conversation } from "../utils/types";

const ConversationPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    getConversations()
      .then(({ data }) => setConversations(data))
      .catch((err) => console.log(err));
  }, []);

  console.log(conversations);

  return (
    <Page>
      <ConversationSidebar conversations={conversations} />
      <Outlet />
    </Page>
  );
};

export default ConversationPage;
