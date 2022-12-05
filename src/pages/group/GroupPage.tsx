import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import ConversationSidebar from "../../components/conversations/ConversationSidebar";
import { AppDispatch } from "../../store";
import { fetchConversationsThunk } from "../../store/slices/conversationSlice";
import { fetchGroupsThunk } from "../../store/slices/groupSlice";
import { updateType } from "../../store/slices/selectedSlice";
import { SocketContext } from "../../utils/context/SocketContext";
import { Page } from "../../utils/styles";

const GroupPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname.substring(1));

    dispatch(updateType("group"));
    dispatch(fetchGroupsThunk());
  }, [dispatch]);

  return (
    <Page>
      <ConversationSidebar />
      <Outlet />
    </Page>
  );
};

export default GroupPage;
