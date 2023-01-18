import styled, { createGlobalStyle, css } from "styled-components";
import { Theme } from "../theme";
import { fadeOpacity, fadeInUpwards } from "./keyframes";
import {
  CharacterLimitProps,
  ContextMenuProps,
  ConversationSidebarItemProps,
  ConversationTabItemProps,
  InputContainerProps,
  MessageInputContainerProps,
  MessageItemContentProps,
  ModalContainerProps,
  PageProps,
  SidebarItemProps,
} from "./styleTypes";

export const DARK = "131313";
export const SIDEBAR_WIDTH = 350;
export const USER_SIDEBAR_WIDTH = 90;

export const GlobalStyle = createGlobalStyle`
  body{
    color: ${({ theme }: { theme: Theme }) => theme.text.primary};
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.background.primary}
  }
`;

export const InputContainer = styled.div<InputContainerProps>`
  position: relative;

  width: 100%;
  padding: 14px 16px;

  border-radius: 10px;

  background-color: ${({ theme }: { theme: Theme }) =>
    theme.input.backgroundColor};
`;

export const InputContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

export const RecipientChipContainer = styled.div<InputContainerProps>`
  display: flex;
  flex-wrap: wrap;
  gap: 0 10px;

  margin-bottom: 10px;

  border-radius: 10px;

  background-color: ${({ theme }: { theme: Theme }) =>
    theme.background.primary};
  color: ${({ theme }: { theme: Theme }) => theme.text.primary};
`;

export const InputField = styled.input`
  display: block;

  width: 100%;
  padding: 0;

  outline: none;
  border: none;

  background-color: ${({ theme }: { theme: Theme }) =>
    theme.input.backgroundColor};
  color: ${({ theme }: { theme: Theme }) => theme.input.color};

  font-size: 18px;
  font-family: "Inter";

  &:disabled {
    color: #3b3b3b;
  }
`;

export const InputLabel = styled.label`
  display: block;

  margin: 4px 0;

  color: #afafaf;

  font-size: 14px;
`;

export const InputError = styled.span`
  color: #ff0000;

  font-size: 11px;
  text-transform: uppercase;
`;

export const Button = styled.button`
  box-sizing: border-box;
  width: 100%;
  padding: 20px;

  outline: none;
  border: solid 1px #2b09ff;
  border-radius: 10px;

  color: #fff;
  background-color: #2b09ff;

  font-size: 25px;
  font-family: "Inter";

  transition: 500ms border-color background-color ease;

  cursor: pointer;

  &:hover {
    background-color: #4226f7;
  }

  &:focus {
    border: solid 1px #fff;
    background-color: #4226f7;
  }
`;

export const Page = styled.div<PageProps>`
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};

  width: 100%;
  height: 100vh;

  background-color: ${({ theme }: { theme: Theme }) =>
    theme.background.primary};
`;

export const StyledConversationChannelPage = styled.div`
  display: flex;

  height: 100vh;
  width: 100%;

  background-color: ${({ theme }: { theme: Theme }) =>
    theme.background.primary};
`;

export const ConversationSiderbarHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;

  width: ${SIDEBAR_WIDTH}px;
  padding: 18px;
  margin-left: ${USER_SIDEBAR_WIDTH}px;

  background-color: #151515;

  & h1 {
    font-weight: 500;
    font-size: 20px;
  }
`;

export const ConversationSidebarContainer = styled.div``;

export const StyledConversationSidebarItem = styled.div<ConversationSidebarItemProps>`
  display: flex;
  align-items: center;
  gap: 14px;

  position: relative;

  padding: 8px 14px;

  background-color: ${({ selected, theme }) =>
    selected && theme.conversationSidebar.conversationItem.selected};
  border-bottom: 1px solid #3030303e;

  cursor: pointer;
  transition: 100ms background-color ease;
  &:hover {
    background-color: ${({ theme }) =>
      theme.conversationSidebar.conversationItem.hover.backgroundColor};
  }

  & .title {
    display: block;
    font-weight: 600;
    font-size: 16px;
    color: ${({ theme }: { theme: Theme }) => theme.text.primary};
  }
`;

export const ConversationSidebarItemDetails = styled.div`
  word-break: break-all;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  & .conversationName {
    display: block;
    font-weight: 600;
    font-size: 16px;
    color: ${({ theme }) =>
      theme.conversationSidebar.conversationItem.title.color};
  }
  & .conversationLastMessage {
    font-size: 15px;
    font-weight: 500;
    color: #868686;
    color: ${({ theme }) =>
      theme.conversationSidebar.conversationItem.title.lastMessageColor};
  }
`;

export const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: #000000e3;
`;

export const StyledModalContainer = styled.div<ModalContainerProps>`
  border-radius: 10px;

  background-color: ${({ theme }: { theme: Theme }) =>
    theme.background.secondary};

  animation: ${fadeInUpwards} 500ms ease;
  overflow: hidden;
`;

export const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 20px;

  background-color: ${({ theme }: { theme: Theme }) =>
    theme.background.secondary};
  & h2 {
    font-weight: 500;
    font-size: 28px;
    margin: 0;
  }
`;

export const StyledModalContentBody = styled.div`
  padding: 18px;
`;

export const TextField = styled.textarea`
  display: block;

  width: 100%;
  padding: 0;
  resize: vertical;

  outline: none;
  border: none;

  background-color: inherit;
  color: ${({ theme }: { theme: Theme }) => theme.input.color};

  font-size: 18px;
  font-family: "Inter";
`;

export const StyledMessagePanel = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  height: 100vh;

  border-left: 1px solid #5454543d;

  background: ${({ theme }) => theme.messagePanel.backgroundColor};
`;

export const StyledMessagePanelHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  height: 100px;
  padding: 0 24px;

  border-bottom: 1px solid #49494925;

  color: ${({ theme }) => theme.messagePanel.header.title};
`;

export const MessagePanelBody = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px 20px 6px;

  height: calc(100% - 100px);

  background: inherit;
`;

export const StyledMessageContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;

  flex: 1;
  padding: 10px 0;

  background: inherit;

  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.background.primary};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.background.secondary};
    width: 5px;
    border-radius: 20px;
  }
`;

export const MessageInputContainer = styled.div<MessageInputContainerProps>`
  display: flex;
  align-items: ${({ isMultiLine }) => (isMultiLine ? "top" : "center")};

  width: 100%;
  padding: 15px 16px;
  margin-top: 10px;

  border-radius: 10px;

  background-color: ${({ theme }) =>
    theme.messagePanel.inputContainer.backgroundColor};

  overflow: hidden;
`;

export const MessageInput = styled.input`
  box-sizing: border-box;
  width: 100%;

  outline: none;
  border: none;

  background: inherit;
  color: #454545;

  font-family: "Inter";
  font-size: 18px;

  resize: none;
`;

export const MessageItemContainer = styled.div`
  display: flex;
  align-items: top;
  gap: 15px;

  width: 100%;

  word-break: break-word;
  white-space: pre-wrap;
`;

export const StyledMessageItemAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const MessageItemDetails = styled.div`
  width: 100%;
`;

export const MessageItemHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .time {
    color: #6d6d6d;
    font-size: 14px;
  }

  .authorName {
    font-weight: 600;
    font-size: 16px;
  }
`;

export const MessageItemContent = styled.div<MessageItemContentProps>`
  padding: ${({ padding }) => padding || "0"};
  width: 100%;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.messagePanel.body.content.color};
`;

export const ContextMenu = styled.ul<ContextMenuProps>`
  position: fixed;
  ${(props) => css`
    top: ${props.top}px;
    left: ${props.left}px;
  `}
  z-index: 999;

  width: 220px;
  margin: 0;
  padding: 10px;

  border-radius: 8px;

  background-color: ${({ theme }: { theme: Theme }) =>
    theme.contextMenu.backgroundColor};

  list-style-type: none;
`;

export const ContextMenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;

  border-radius: 8px;

  padding: 14px 16px;
  margin: 6px 0;

  font-size: 15px;
  font-weight: 500;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.contextMenu.item.hover};
  }
`;

export const MessageTypingStatus = styled.div`
  width: 100%;
  min-height: 20px;
  padding: 2.5px 0;

  color: ${({ theme }: { theme: Theme }) => theme.text.secondary};

  font-size: 12px;
  font-weight: bold;
`;

export const EditMessageInputField = styled.input`
  display: block;

  width: 100%;
  padding: 15px 22px;
  margin: 4px 0;

  outline: none;
  border: none;
  border-radius: 5px;

  background-color: #222222;
  color: #fff;

  font-size: 16px;
  font-family: "Inter";
`;

export const EditMessageActionsContainer = styled.div`
  font-size: 12px;

  & span {
    color: #1d77ff;
  }
`;

export const StyledConversationTab = styled.div`
  display: flex;
  justify-content: space-evenly;

  width: 100%;
  margin: 10px 0;

  background-color: ${({ theme }: { theme: Theme }) =>
    theme.conversationSidebar.backgroundColor};
`;

export const ConversationTabItem = styled.div<ConversationTabItemProps>`
  padding: 12px 32px;

  border-radius: 5px;

  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;

  background-color: ${({ theme }: { theme: Theme }) =>
    theme.conversationSidebar.tabItem.backgroundColor};

  ${(props) =>
    props.selected &&
    css`
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.conversationSidebar.tabItem.selected};
    `};

  cursor: pointer;
  transition: background-color linear 100ms;
`;

export const UserAvatarContainer = styled.img`
  width: 55px;
  height: 55px;

  border-radius: 50%;

  background-color: #fff;
`;

export const UserSidebarHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  width: 100%;
  height: 90px;

  border-bottom: 1px solid #494949a9;
`;

export const UserSidebarFooter = styled.footer`
  padding: 18px 0;
`;

export const ScrollableContainer = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const UserSidebarScrollableContainer = styled(ScrollableContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

export const ConversationSearchbar = styled.input`
  padding: 12px 18px;
  width: 100%;
  height: 29px;

  outline: none;
  border: none;
  border-radius: 5px;

  background-color: ${({ theme }: { theme: Theme }) =>
    theme.input.backgroundColor};
  color: ${({ theme }: { theme: Theme }) => theme.input.color};

  font-family: "Inter";
  font-size: 14px;
  font-weight: 500;
`;

export const StyledRecipientResultContainer = styled.div`
  position: absolute;

  width: 100%;
  margin-top: 4px;

  background-color: ${({ theme }: { theme: Theme }) =>
    theme.background.primary};
  color: ${({ theme }: { theme: Theme }) => theme.text.primary};

  z-index: 2;
`;

export const RecipientScrollableItemContainer = styled.div`
  max-height: 200px;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const RecipientResultBottomFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  padding: 10px 0;

  border-top: 1px solid #fff;
`;

export const RecipientResultItem = styled.div`
  padding: 14px 16px;

  transition: background-color ease 100ms;
  &:hover {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.background.tertiary};
    cursor: pointer;
  }
`;

export const StyledSelectedRecipientPill = styled.div`
  width: fit-content;
  padding: 6px 10px;
  margin-top: 10px;

  border-radius: 50px;
  border: 1px solid #323232b0;

  & .container {
    display: flex;
    align-items: center;
    user-select: none;
  }

  & .icon {
    margin-left: 10px;

    color: #656565;

    transition: 100ms color ease;
    cursor: pointer;

    :hover {
      color: #c62d2d;
    }
  }
`;

export const LayoutPage = styled.div`
  display: flex;

  height: 100vh;
`;

export const StyledUserSidebar = styled.div`
  display: flex;
  flex: 0 0 80px;
  align-items: center;
  flex-direction: column;

  height: 100vh;
  padding: 10px 0;

  background-color: ${({ theme }: { theme: Theme }) =>
    theme.userSidebar.backgroundColor};

  z-index: 1;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledUserSidebarItem = styled.div<SidebarItemProps>`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 18px;

  background-color: ${({ active, theme }) =>
    active && theme.userSidebar.selected};

  cursor: pointer;
`;

export const IconBadge = styled.div`
  position: absolute;
  top: 2px;
  right: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 20px;
  height: 20px;

  border-radius: 5px;

  background-color: #ff3535;

  font-size: 10px;
`;

export const StyledConversationSidebar = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;

  height: 100vh;
  width: 400px;

  background-color: ${({ theme }: { theme: Theme }) =>
    theme.conversationSidebar.backgroundColor};

  @media (max-width: 800px) {
    width: calc(100% - 80px);
  }
`;

export const ConversationSidebarHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  height: 100px;
  padding: 10px 30px;

  flex-shrink: 0;

  border-bottom: 1px solid #48484857;
`;

export const ConversationScrollableContainer = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ConversationSidebarSearchbar = styled.input`
  width: 100%;
  padding: 10px 20px;

  border: none;
  border-radius: 5px;
  outline: none;

  font-family: "Inter";

  background-color: ${({ theme }: { theme: Theme }) =>
    theme.input.backgroundColor};
  color: ${({ theme }: { theme: Theme }) => theme.input.color};
`;

export const ConversationCreateButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  padding: 10px;

  background-color: #1a1a1a;

  cursor: pointer;
`;

export const StyledGroupRecipientsSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;

  width: 350px;
  height: 100%;

  background-color: ${({ theme }: { theme: Theme }) =>
    theme.background.secondary};

  animation: ${fadeOpacity} 500ms ease;
`;

export const GroupRecipientsSidebarHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;

  width: 100%;
  height: 100px;
  padding: 10px 32px;

  border-bottom: 1px solid #49494925;

  color: ${({ theme }: { theme: Theme }) => theme.text.primary};

  & span {
    font-size: 18px;
    font-weight: 500;
  }
`;

export const GroupRecipientsSidebarItemContainer = styled.div`
  flex: 1 1 auto;

  padding: 30px 0 0 30px;

  color: ${({ theme }: { theme: Theme }) => theme.text.primary};

  overflow-y: auto;
  &::webkit-scrollbar {
    display: none;
  }
`;

export const GroupRecipientsSidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px 0;

  font-size: 18px;
  font-weight: 500;

  & .left {
    display: flex;
    align-items: center;
    gap: 14px;
  }
`;

export const GroupHeaderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const MessageTextArea = styled.textarea`
  flex: 0 0 auto;

  width: 100%;
  height: 20px;
  max-height: 200px;
  padding: 0;
  margin: 4px 0;

  border: none;
  outline: none;

  font-family: "Inter";
  font-size: 18px;

  background-color: inherit;
  color: ${({ theme }: { theme: Theme }) =>
    theme.messagePanel.inputContainer.color};

  resize: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CharacterLimit = styled.span<CharacterLimitProps>`
  position: absolute;
  bottom: 8px;
  right: 32px;

  font-size: 14px;
  font-weight: 500;
  color: ${({ atMaxLength }) => (atMaxLength ? "#ff0000" : "rgb(129,129,129)")};
`;

export const FileInput = styled.input`
  ${({ type }) =>
    type === "file" &&
    css`
      display: none;
    `}
`;

export const StyledMessageAttachmentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  margin: 10px 0;

  overflow-y: auto;
  max-height: 200px;

  /* &::-webkit-scrollbar {
    background-color: #ff0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: red;
    border-radius: 1px;
  } */
`;

export const StyledMessageAttachment = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 20px;

  margin: 10px 0;
  padding: 40px 0 0 0;
  min-width: 0;
  max-height: 300px;
  height: 200px;

  border-radius: 10px;

  text-align: center;

  background-color: ${({ theme }: { theme: Theme }) =>
    theme.background.primary};
`;

export const AvatarUploadContainer = styled.div<{ url?: string }>`
  height: 150px;
  width: 150px;
  border-radius: 100%;
  border: 4px solid #afafaf;
  cursor: pointer;
  ${({ url }) =>
    url
      ? css`
          transition: 1s background ease;
          background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
            url("${url}") no-repeat center;
          opacity: 100%;
          transition: 300ms opacity ease;
          background-size: cover;
          &:hover {
            opacity: 100%;
          }
        `
      : css`
          background-color: #404040;
        `};
  &::before {
    background-color: none;
    content: "Change Avatar";
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f1f1f1;
    font-size: 15px;
    font-weight: 500;
    opacity: 0;
    transition: 300ms opacity ease;
  }
  &:hover:before {
    opacity: 1;
  }
`;

export const GroupAvatarUploadContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
