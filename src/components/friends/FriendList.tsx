import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FriendListContainer } from "../../utils/styles/friends";
import FriendListItem from "./FriendListItem";

const FriendList = () => {
  const friends = useSelector((state: RootState) => state.friend.friends);

  return (
    <FriendListContainer>
      {friends.map((friend) => (
        <FriendListItem friend={friend} />
      ))}
    </FriendListContainer>
  );
};

export default FriendList;
