import styled, { css } from "styled-components";
import { FriendsNavbarItemProps } from "../styleTypes";

export const StyledFriendsPage = styled.div`
  background-color: #101010;
  height: 100vh;
  width: 100%;
`;

export const FriendsNavbar = styled.nav`
  display: flex;
  align-items: center;
  gap: 80px;

  padding: 48px 60px;

  border-bottom: 1px solid #30303035;

  font-size: 20px;
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