import { Dispatch, SetStateAction } from "react";
import { StyledSelectedRecipientPill } from "../../utils/styles";
import { User } from "../../utils/types";
import { CircleX } from "akar-icons";

type Props = {
  user: User;
  onChipClose: (user: User) => void;
};
const SelectedRecipientChip = ({ user, onChipClose }: Props) => {
  return (
    <StyledSelectedRecipientPill>
      <div className="container">
        <span>{user.email}</span>
        <CircleX className="icon" onClick={() => onChipClose(user)} />
      </div>
    </StyledSelectedRecipientPill>
  );
};

export default SelectedRecipientChip;
