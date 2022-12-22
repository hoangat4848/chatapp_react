import { useEffect } from "react";
import { useDispatch } from "react-redux";
import FriendRequestList from "../../components/friends/FriendRequestList";
import { AppDispatch } from "../../store";
import { fetchFriendRequestThunk } from "../../store/friends/friendThunk";

const FriendRequestPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchFriendRequestThunk());
  }, [dispatch]);

  return <FriendRequestList />;
};

export default FriendRequestPage;
