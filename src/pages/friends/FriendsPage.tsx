import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import FriendList from "../../components/friends/FriendList";
import { AppDispatch } from "../../store";
import { fetchFriendThunk } from "../../store/slices/friendSlice";

const FriendsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchFriendThunk());
  }, [dispatch]);

  return <FriendList />;
};

export default FriendsPage;
