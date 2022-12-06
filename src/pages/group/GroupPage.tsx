import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { AppDispatch } from "../../store";
import { fetchConversationsThunk } from "../../store/slices/conversationSlice";
import { fetchGroupsThunk } from "../../store/slices/groupSlice";
import { updateType } from "../../store/slices/selectedSlice";
import { SocketContext } from "../../utils/context/SocketContext";
import { Page } from "../../utils/styles";
import { MessageEventPayload } from "../../utils/types";

const GroupPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);

  useEffect(() => {
    dispatch(updateType("group"));
    dispatch(fetchGroupsThunk());
  }, [dispatch]);

  useEffect(() => {
    socket.on("onMessage", (payload: MessageEventPayload) => {});

    return () => {
      socket.off("onMessage");
    };
  }, [socket, dispatch]);
  return (
    <Page>
      <Outlet />
    </Page>
  );
};

export default GroupPage;
