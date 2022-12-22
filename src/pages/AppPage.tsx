import { useContext, useEffect } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import UserSidebar from "../components/sidebars/UserSidebar";
import { useToast } from "../hooks/useToast";
import { AppDispatch } from "../store";
import {
  addFriendRequest,
  removeFriendRequest,
} from "../store/friends/friendSlice";
import { SocketContext } from "../utils/context/SocketContext";
import { LayoutPage } from "../utils/styles";
import { AcceptFriendRequestResponse, FriendRequest } from "../utils/types";

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

    socket.on(
      "onFriendRequestAccepted",
      (payload: AcceptFriendRequestResponse) => {
        console.log("onFriendRequestAccepted");
        console.log(payload);

        const { friendRequest } = payload;
        dispatch(removeFriendRequest(friendRequest));
        info(
          `${payload.friendRequest.receiver.firstName} accepted your friend request`,
          {
            position: "bottom-left",
            icon: BsFillPersonCheckFill,
            onClick: () => navigate("/friends"),
          }
        );
      }
    );

    socket.on("onFriendRequestRejected", (payload: FriendRequest) => {
      console.log("onFriendRequestRejected");
      dispatch(removeFriendRequest(payload));
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [dispatch, socket, navigate, info]);

  return (
    <LayoutPage>
      <UserSidebar />
      <Outlet />
    </LayoutPage>
  );
};
