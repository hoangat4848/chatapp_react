import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { friendsNavbarItems } from "../../utils/constants";
import {
  FriendsNavbar,
  FriendsNavbarItem,
  StyledFriendsPage,
} from "../../utils/styles/friends";

const FriendsPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <StyledFriendsPage>
      <FriendsNavbar>
        {friendsNavbarItems.map((item) => (
          <FriendsNavbarItem
            key={item.id}
            active={pathname === item.pathname}
            onClick={() => navigate(item.pathname)}
          >
            {item.label}
          </FriendsNavbarItem>
        ))}
      </FriendsNavbar>
      {pathname === "/friends" && <div>Friends Component</div>}
      <Outlet />
    </StyledFriendsPage>
  );
};

export default FriendsPage;
