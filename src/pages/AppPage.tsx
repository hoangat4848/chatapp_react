import { useContext, useEffect } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
import { fetchFriendRequestThunk } from "../store/friends/friendThunk";

export const AppPage = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();
  const { info } = useToast();

  useEffect(() => {
    dispatch(fetchFriendRequestThunk());
  }, [dispatch]);

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
        const { friendRequest } = payload;
        dispatch(removeFriendRequest(friendRequest));
        pathname.includes("/friends") && socket.emit("getOnlineFriends");
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
      const receiverFullname =
        payload.receiver.firstName + " " + payload.receiver.lastName;
      info(`${receiverFullname} rejected your friend request`, {
        position: "bottom-left",
        icon: BsFillPersonCheckFill,
        onClick: () => navigate("/friends/requests"),
      });
    });

    return () => {
      socket.off("onFriendRequestCanceled");
      socket.off("onFriendRequestRejected");
      socket.off("onFriendRequestReceived");
      socket.off("onFriendRequestAccepted");
    };
  }, [dispatch, socket, navigate, info]);

  return (
    <LayoutPage>
      <UserSidebar />
      <Outlet />
    </LayoutPage>
  );
};
