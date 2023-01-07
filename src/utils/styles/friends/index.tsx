import styled, { css } from "styled-components";
import {
  FriendRequestItemIconProps,
  FriendsNavbarItemProps,
} from "../styleTypes";

export const StyledFriendsPage = styled.div`
  background-color: #101010;
  height: 100vh;
  width: 100%;
`;

export const FriendsNavbar = styled.nav`
  display: flex;
  justify-content: space-between;

  padding: 48px 60px;
  height: 150px;

  border-bottom: 1px solid #30303035;

  font-size: 20px;

  & .navLinks {
    display: flex;
    align-items: center;
    gap: 80px;
  }
`;

export const FriendsNavbarItem = styled.span<FriendsNavbarItemProps>`
  cursor: pointer;

  ${({ active }) =>
    active &&
    css`
      text-decoration: underline;
      text-underline-offset: 14px;
    `}
`;

export const FriendListContainer = styled.div`
  padding: 20px 40px;
  height: calc(100% - 150px);

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FriendListItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  padding: 14px 0;

  border-bottom: 1px solid #181818;

  & .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #227eff;
  }

  &:last-child {
    border-bottom: unset;
  }
`;

export const FriendRequestItemContainer = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 10px 0;
  border-bottom: 1px solid #1f1f1fbf;

  & .details {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  & .name {
    display: flex;
    flex-direction: column;
    font-size: 20px;
  }
  & .status {
    font-size: 14px;
    font-style: italic;
    font-weight: 600;
    color: #626262;
  }
  & .icons {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  :last-child {
    border-bottom: unset;
  }
`;

export const FriendRequestItemIcon = styled.div<FriendRequestItemIconProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px;

  border-radius: 50%;

  background-color: #171717;
  color: #fff;

  cursor: pointer;

  &:hover {
    background-color: #161616;
    color: ${({ isAccept }) => (isAccept ? "#00ff04" : "#ff3a3a")};
  }
`;
