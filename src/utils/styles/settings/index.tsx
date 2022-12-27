import styled, { css } from "styled-components";
import { slideUp } from "../keyframes";
import { SettingsSidebarItemProps, UserBannerProps } from "../styleTypes";

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

export const SettingsProfileBanner = styled.div<UserBannerProps>`
  width: 100%;
  height: 300px;

  ${({ backgroundUrl }) =>
    backgroundUrl
      ? css`
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
            url("${backgroundUrl}") no-repeat center;
          background-size: cover;
          transition: 1s background ease;
          opacity: 70%;

          &:hover {
            opacity: 100%;
          }
        `
      : css`
          background-color: #404040;
        `}

  cursor: pointer;
`;

export const SettingsProfileUserDetails = styled.div`
  display: flex;
  gap: 30px;

  position: relative;

  width: 100%;
  transform: translateY(-50%);

  & .avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 4px solid #292929;
    background-color: #2a2a2a;
  }

  & span {
    position: absolute;
    bottom: 20px;
    left: 190px;

    font-size: 24px;
    font-weight: 500;
  }
`;

export const ProfileSection = styled.div`
  padding: 0 48px;
`;

export const ProfileAboutSection = styled.div`
  background: #111111;

  width: 500px;
  padding: 32px;

  border-radius: 8px;

  & label {
    font-size: 20px;
    font-weight: 500;
  }
`;

export const ProfileAboutSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileDescriptionField = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 0;
  margin-top: 20px;

  outline: none;
  border: none;

  background-color: inherit;
  color: #ffffff;

  font-family: "Inter";
  font-size: 15px;
  font-weight: 500;

  resize: none;
  flex: 0 0 auto;

  &::-webkit-scrollbar {
    display: none;
  }

  &:disabled {
    color: #484848;
  }
`;

export const ProfileEditActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  left: 50%;
  bottom: 0;

  width: 750px;
  padding: 14px 24px;
  overflow: hidden;

  border-radius: 8px;

  color: #fff;
  background-color: #0e0e0e;

  transform: translate(-50%, 100%);
  animation: 500ms ${slideUp} ease;
  animation-fill-mode: forwards;

  & .buttons {
    display: flex;
    gap: 10px;
  }
`;
