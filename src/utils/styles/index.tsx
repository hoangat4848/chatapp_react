import styled, { css } from "styled-components";
import {
  ContextMenuProps,
  InputContainerProps,
  MessageItemContentProps,
  PageProps,
} from "./styleTypes";

export const DARK = "131313";
export const SIDEBAR_WIDTH = "350px";

export const InputContainer = styled.div<InputContainerProps>`
  width: 100%;
  padding: 14px 16px;

  border-radius: 10px;

  background-color: ${(props) => props.backgroundColor || "#131313"};
`;

export const InputField = styled.input`
  display: block;

  width: 100%;
  padding: 0;

  outline: none;
  border: none;

  background-color: inherit;
  color: #fff;

  font-size: 18px;
  font-family: "Inter";
`;

export const InputLabel = styled.label`
  display: block;

  margin: 4px 0;

  color: #afafaf;

  font-size: 14px;
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

  height: 100vh;

  background-color: #1a1a1a;
`;

export const StyledConversationChannelPage = styled.div`
  height: 100%;
  margin-left: ${SIDEBAR_WIDTH};
`;

export const StyledConversationSidebar = styled.aside`
  position: absolute;
  top: 0;
  left: 0;

  width: ${SIDEBAR_WIDTH};
  height: 100vh;
  padding-top: 100px;

  border-right: 1px solid #c1b9b93a;
  background-color: #1f1f1f;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ConversationSiderbarHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: ${SIDEBAR_WIDTH};
  height: 100px;
  padding: 0 18px;

  background-color: #151515;

  & h1 {
    font-weight: 500;
    font-size: 20px;
  }
`;

export const ConversationSidebarContainer = styled.div`
  /* margin-top: 100px; */
`;

export const ConversationSidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  padding: 8px 14px;

  background-color: #131313;
  border-bottom: 1px solid #c1b9b93a;

  cursor: pointer;
  &:hover {
    background-color: #555555;
  }
`;

export const StyledOverlay = styled.div`
  position: fixed;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: #0404047f;
`;

export const StyledModalContainer = styled.div`
  box-sizing: border-box;
  border-radius: 10px;

  background-color: #131313;

  overflow: hidden;
`;

export const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 20px;

  background-color: #121212;
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
  color: #fff;

  font-size: 18px;
  font-family: "Inter";
`;

export const StyledMessagePanel = styled.div`
  height: 100%;
  padding-top: 100px;

  background: inherit;
`;

export const MessagePanelBody = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px 20px 6px;

  height: 100%;

  background: inherit;
`;

export const StyledMessageContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;

  height: 100%;
  padding: 10px 0;

  background: inherit;

  overflow-y: scroll;
`;

export const MessageInputContainer = styled.div`
  width: 100%;
  padding: 15px 16px;
  margin-top: 10px;

  border-radius: 10px;

  background-color: #101010;

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
  align-items: center;
  gap: 15px;
`;

export const MessageItemAvatar = styled.div`
  width: 50px;
  height: 50px;

  border-radius: 50%;

  background-color: #fff;
`;

export const MessageItemDetails = styled.div``;

export const MessageItemHeader = styled.div`
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
`;

export const StyledMessagePanelHeader = styled.header`
  position: fixed;
  top: 0;
  left: ${SIDEBAR_WIDTH};
  right: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 100px;
  padding: 0 18px;

  background-color: #151515;
  border-bottom: solid 1px #fff;
`;

export const ContextMenu = styled.div<ContextMenuProps>`
  position: fixed;
  ${(props) => css`
    top: ${props.top}px;
    left: ${props.left}px;
  `}

  box-sizing: border-box;
  width: 200px;

  border-radius: 8px;

  background-color: #252525;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 10px;
  }

  ul li {
    padding: 14px 16px;

    border-radius: 8px;
  }

  ul li:hover {
    cursor: pointer;
    background-color: #1f1f1f;
  }
`;

export const MessageTypingStatus = styled.div`
  width: 100%;
  min-height: 20px;
  padding: 2.5px 0;

  color: #6a6a6a;

  font-size: 12px;
  font-weight: bold;
`;
