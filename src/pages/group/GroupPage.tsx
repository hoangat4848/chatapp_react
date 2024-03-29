import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import EditGroupModal from "../../components/modals/EditGroupModal";
import ConversationSidebar from "../../components/sidebars/ConversationSidebar";
import { AppDispatch, RootState } from "../../store";
import { addGroupMessage } from "../../store/slices/groupMessageSlice";
import {
  addGroup,
  fetchGroupsThunk,
  removeGroup,
  updateGroup,
  updateGroupLastMessageSent,
} from "../../store/slices/groupSlice";
import { updateType } from "../../store/slices/selectedSlice";
import { AuthContext } from "../../utils/context/AuthContext";
import { SocketContext } from "../../utils/context/SocketContext";
import { Group, GroupMessageEventPayload } from "../../utils/types";

const GroupPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 800);
  const showEditGroupModal = useSelector(
    (state: RootState) => state.group.showEditGroupModal
  );

  useEffect(() => {
    const handleResize = () => setShowSidebar(window.innerWidth > 800);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(updateType("group"));
    dispatch(fetchGroupsThunk());
  }, [dispatch]);

  useEffect(() => {
    socket.on("onGroupMessage", (payload: GroupMessageEventPayload) => {
      const { group } = payload;
      dispatch(addGroupMessage(payload));
      dispatch(updateGroupLastMessageSent(group));
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

    socket.on("onGroupOwnerUpdate", (payload: Group) => {
      console.log("received onGroupOwnerUpdate");
      dispatch(updateGroup(payload));
    });

    socket.on("onGroupParticipantLeft", (payload: any) => {
      console.log("onGroupParticipantLeft received");
      console.log(payload.group);
      dispatch(updateGroup(payload.group));

      if (payload.userId === user?.id) dispatch(removeGroup(payload.group));
      if (id && parseInt(id!) === payload.group.id) {
        navigate("/groups");
      }
    });

    socket.on("onGroupDetailsUpdate", (payload: Group) => {
      dispatch(updateGroup(payload));
    });

    return () => {
      socket.off("onGroupMessage");
      socket.off("onGroupCreate");
      socket.off("onGroupUserAdd");
      socket.off("onGroupRecipientRemoved");
      socket.off("onGroupRemoved");
      socket.off("onGroupOwnerUpdate");
      socket.off("onGroupParticipantLeft");
    };
  }, [dispatch, socket, id, navigate, user]);
  return (
    <>
      {showSidebar && <ConversationSidebar />}
      {showEditGroupModal && <EditGroupModal />}
      <Outlet />
    </>
  );
};

export default GroupPage;
