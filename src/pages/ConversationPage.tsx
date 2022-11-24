import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import ConversationSidebar from "../components/conversations/ConversationSidebar";
import { AppDispatch } from "../store";
import { fetchConversationsThunk } from "../store/slices/conversationSlice";
import { getConversations } from "../utils/api";
import { Page } from "../utils/styles";
import { Conversation } from "../utils/types";

const ConversationPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchConversationsThunk());
  }, []);

  return (
    <Page>
      <ConversationSidebar />
      <Outlet />
    </Page>
  );
};

export default ConversationPage;
