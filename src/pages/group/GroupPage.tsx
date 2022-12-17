import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
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
import {
  Group,
  GroupMessageEventPayload,
  RemoveGroupUserMessagePayload,
  User,
} from "../../utils/types";

const GroupPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

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

    socket.on("onGroupUserRemove", (payload: RemoveGroupUserMessagePayload) => {
      console.log("onGroupRemovedUser");
      console.log(payload);
      const { group, user } = payload;
      dispatch(updateGroup(group));
      if (user.id === user?.id) {
        console.log("user is logged in was removed from the group");
        console.log("navigating...");
        navigate("/groups");
      }
    });

    return () => {
      socket.off("onGroupMessage");
      socket.off("onGroupCreate");
      socket.off("onGroupUserAdd");
      socket.off("onGroupReceivedNewUser");
      socket.off("onGroupUserRemove");
    };
  }, [dispatch, socket, navigate]);
  return (
    <>
      <ConversationSidebar />
      <Outlet />
    </>
  );
};

export default GroupPage;
