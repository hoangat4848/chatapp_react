import styled from "styled-components";
import { SettingsSidebarItemProps } from "../styleTypes";

export const StyledSettingsSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;

  height: 100%;
  width: 300px;

  background-color: #111111;
`;

export const SettingsSidebarHeader = styled.header`
  width: 100%;
  padding: 36px;

  font-weight: 500;

  & span {
    font-size: 20px;
  }
`;

export const SettingsSidebarItemContainer = styled.div``;

export const StyledSettingsSidebarItem = styled.div<SettingsSidebarItemProps>`
  padding: 10px 24px;
  cursor: pointer;
  & .settingItem {
    display: flex;
    align-items: center;
    gap: 10px;
    user-select: none;
    padding: 14px;
    border-radius: 8px;
    background-color: ${({ isActive }) => isActive && "#070707"};
    & span {
      font-weight: 500;
    }
  }
`;
