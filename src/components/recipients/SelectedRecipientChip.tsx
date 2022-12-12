import React, { Dispatch, SetStateAction } from "react";
import { StyledSelectedRecipientPill } from "../../utils/styles";
import { ConversationType, User } from "../../utils/types";
import { Cross, CircleX } from "akar-icons";

type Props = {
  user: User;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
  setSelectedUsers: Dispatch<SetStateAction<User[]>>;
  type: ConversationType;
};
const SelectedRecipientChip = ({
  user,
  setSelectedUser,
  setSelectedUsers,
  type,
}: Props) => {
  const handleClick = (id: number) => {
    if (type === "private") return setSelectedUser(undefined);
    setSelectedUsers((prev) => prev.filter((chip) => chip.id !== id));
  };

  return (
    <StyledSelectedRecipientPill>
      <div className="container">
        <span>{user.email}</span>
        <CircleX className="icon" onClick={() => handleClick(user.id)} />
      </div>
    </StyledSelectedRecipientPill>
  );
};

export default SelectedRecipientChip;
