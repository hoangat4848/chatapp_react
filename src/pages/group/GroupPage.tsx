import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import ConversationSidebar from "../../components/sidebars/ConversationSidebar";
import { AppDispatch } from "../../store";
import { addGroupMessage } from "../../store/slices/groupMessageSlice";
import {
  addGroup,
  fetchGroupsThunk,
  removeGroup,
  updateGroup,
} from "../../store/slices/groupSlice";
import { updateType } from "../../store/slices/selectedSlice";
import { SocketContext } from "../../utils/context/SocketContext";
import { Group, GroupMessageEventPayload } from "../../utils/types";

const GroupPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);

  console.log("GroupPage render");

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

    // Adds the group to the new user being added to the group
    socket.on("onGroupUserAdd", (payload: Group) => {
      console.log("onGroupUserAdd");
      console.log(payload);
      dispatch(addGroup(payload));
    });

    // Update to all other clients in the room so that they can also see the participants
    socket.on("onGroupReceivedNewUser", (payload: Group) => {
      console.log("received onGroupReceivedNewUser");
      dispatch(updateGroup(payload));
    });

    socket.on("onGroupRecipientRemoved", (payload: Group) => {
      console.log("onGroupRecipientRemoved");
      console.log(payload);
      dispatch(updateGroup(payload));
    });

    socket.on("onGroupRemoved", (payload: Group) => {
      console.log("user is logged in was removed from the group");
      console.log("navigating...");
      dispatch(removeGroup(payload));
      if (parseInt(id!) === payload.id) navigate("/groups");
    });

    return () => {
      console.log("clear groupPage sockets");

      socket.off("onGroupMessage");
      socket.off("onGroupCreate");
      socket.off("onGroupUserAdd");
      // socket.off("onGroupReceivedNewUser");
      // socket.off("onGroupRecipientRemoved");
    };
  }, [dispatch, socket, id, navigate]);
  return (
    <>
      <ConversationSidebar />
      <Outlet />
    </>
  );
};

export default GroupPage;
