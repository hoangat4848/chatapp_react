import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import FriendList from "../../components/friends/FriendList";
import { AppDispatch } from "../../store";
import {
  removeFriend,
  setOfflineFriends,
  setOnlineFriends,
} from "../../store/friends/friendSlice";
import { fetchFriendThunk } from "../../store/friends/friendThunk";
import { SocketContext } from "../../utils/context/SocketContext";
import { Friend } from "../../utils/types";

const FriendsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);

  useEffect(() => {
    dispatch(fetchFriendThunk());
  }, [dispatch]);

  useEffect(() => {
    socket.emit("getOnlineFriends");
    const interval = setInterval(() => {
      socket.emit("getOnlineFriends");
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [socket]);

  useEffect(() => {
    socket.on("getOnlineFriends", (friends: Friend[]) => {
      dispatch(setOnlineFriends(friends));
      dispatch(setOfflineFriends());
    });

    socket.on("onFriendRemoved", (friend: Friend) => {
      dispatch(removeFriend(friend));
    });

    return () => {
      socket.off("getOnlineFriends");
      socket.off("onFriendRemoved");
    };
  }, [dispatch, socket]);

  return <FriendList />;
};

export default FriendsPage;
