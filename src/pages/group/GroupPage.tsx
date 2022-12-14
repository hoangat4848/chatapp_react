import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import ConversationSidebar from "../../components/sidebars/ConversationSidebar";
import { AppDispatch } from "../../store";
import { addGroupMessage } from "../../store/slices/groupMessageSlice";
import {
  addGroup,
  fetchGroupsThunk,
  updateGroup,
} from "../../store/slices/groupSlice";
import { updateType } from "../../store/slices/selectedSlice";
import { SocketContext } from "../../utils/context/SocketContext";
import { Group, GroupMessageEventPayload } from "../../utils/types";

const GroupPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);

  useEffect(() => {
    dispatch(updateType("group"));
    dispatch(fetchGroupsThunk());
  }, [dispatch]);

  useEffect(() => {
    socket.on("onGroupMessage", (payload: GroupMessageEventPayload) => {
      const { group, message } = payload;
      console.log(group, message);
      dispatch(addGroupMessage(payload));
      dispatch(updateGroup(group));
    });

    socket.on("onGroupCreate", (payload: Group) => {
      console.log("Group created!!!");
      dispatch(addGroup(payload));
    });

    return () => {
      socket.off("onGroupMessage");
      socket.off("onGroupCreate");
    };
  }, [dispatch, socket]);
  return (
    <>
      <ConversationSidebar />
      <Outlet />
    </>
  );
};

export default GroupPage;
