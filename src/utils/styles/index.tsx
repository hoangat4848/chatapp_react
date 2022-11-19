import styled from "styled-components";
import { PageProps } from "./styleTypes";

export const DARK = "131313";
export const SIDEBAR_WIDTH = "350px";

export const InputContainer = styled.div`
  width: 100%;
  padding: 14px 16px;

  border-radius: 10px;

  background-color: #131313;
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
  height: 100vh;
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
