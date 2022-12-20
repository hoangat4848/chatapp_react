import { AiOutlineUserAdd } from "react-icons/ai";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { friendsNavbarItems } from "../../utils/constants";
import { Button } from "../../utils/styles/button";
import {
  FriendsNavbar,
  FriendsNavbarItem,
  StyledFriendsPage,
} from "../../utils/styles/friends";

const FriendsLayoutPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <StyledFriendsPage>
      <FriendsNavbar>
        <div className="navLinks">
          {friendsNavbarItems.map((item) => (
            <FriendsNavbarItem
              key={item.id}
              active={pathname === item.pathname}
              onClick={() => navigate(item.pathname)}
            >
              {item.label}
            </FriendsNavbarItem>
          ))}
        </div>
        <Button size="sm" flex variant="primary">
          <AiOutlineUserAdd size={24} />
          <span>Add Friend</span>
        </Button>
      </FriendsNavbar>
      <Outlet />
    </StyledFriendsPage>
  );
};

export default FriendsLayoutPage;
