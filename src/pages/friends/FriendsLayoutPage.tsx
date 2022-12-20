import { Outlet } from "react-router-dom";
import FriendPageNavbar from "../../components/navbar/FriendsPageNavbar";
import { StyledFriendsPage } from "../../utils/styles/friends";

const FriendsLayoutPage = () => {
  return (
    <StyledFriendsPage>
      <FriendPageNavbar />
      <Outlet />
    </StyledFriendsPage>
  );
};

export default FriendsLayoutPage;
