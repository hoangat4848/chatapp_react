import { useContext, useEffect } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import UserSidebar from "../components/sidebars/UserSidebar";
import { useToast } from "../hooks/useToast";
import { AppDispatch } from "../store";
import {
  addFriendRequest,
  removeFriendRequest,
} from "../store/slices/friendSlice";
import { SocketContext } from "../utils/context/SocketContext";
import { LayoutPage } from "../utils/styles";
import { FriendRequest } from "../utils/types";

export const AppPage = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { info } = useToast();
  useEffect(() => {
    socket.on("onFriendRequestReceived", (payload: FriendRequest) => {
      console.log("onFriendRequestReceived");
      console.log(payload);
      dispatch(addFriendRequest(payload));
      info(`Incoming Friend Request From ${payload.sender.firstName}`, {
        position: "bottom-left",
        icon: IoMdPersonAdd,
        onClick: () => navigate("/friends/requests"),
      });
    });

    socket.on("onFriendRequestCanceled", (payload: FriendRequest) => {
      console.log("onFriendRequestReceived");
      console.log(payload);
      dispatch(removeFriendRequest(payload));
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [dispatch, socket, navigate]);

  return (
    <LayoutPage>
      <UserSidebar />
      <Outlet />
    </LayoutPage>
  );
};
