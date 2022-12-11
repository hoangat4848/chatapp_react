import React, { Dispatch, SetStateAction } from "react";
import { StyledSelectedRecipientPill } from "../../utils/styles";
import { User } from "../../utils/types";
import { Cross, CircleX } from "akar-icons";

type Props = {
  user: User;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
};
const SelectedRecipientChip = ({ user, setSelectedUser }: Props) => {
  return (
    <StyledSelectedRecipientPill>
      <div className="container">
        <span>{user.email}</span>
        <CircleX className="icon" onClick={() => setSelectedUser(undefined)} />
      </div>
    </StyledSelectedRecipientPill>
  );
};

export default SelectedRecipientChip;
