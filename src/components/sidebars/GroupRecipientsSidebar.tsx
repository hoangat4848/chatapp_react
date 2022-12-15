import { PeopleGroup } from "akar-icons";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { selectGroupById } from "../../store/slices/groupSlice";
import {
  GroupRecipientsSidebarHeader,
  GroupRecipientsSidebarItem,
  GroupRecipientsSidebarItemContainer,
  MessageItemAvatar,
  StyledGroupRecipientsSidebar,
} from "../../utils/styles";

const GroupRecipientsSidebar = () => {
  const { id } = useParams();
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(id!))
  );

  return (
    <StyledGroupRecipientsSidebar>
      <GroupRecipientsSidebarHeader>
        <span>Participants</span>
        <PeopleGroup size={24} strokeWidth={2} />
      </GroupRecipientsSidebarHeader>
      <GroupRecipientsSidebarItemContainer>
        {group?.users.map((user) => (
          <GroupRecipientsSidebarItem>
            <MessageItemAvatar />
            {user.email}
          </GroupRecipientsSidebarItem>
        ))}
      </GroupRecipientsSidebarItemContainer>
    </StyledGroupRecipientsSidebar>
  );
};

export default GroupRecipientsSidebar;
