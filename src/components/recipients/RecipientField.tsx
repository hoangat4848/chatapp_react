import { Dispatch, SetStateAction } from "react";
import {
  InputContainer,
  InputLabel,
  InputField,
  RecipientChipContainer,
} from "../../utils/styles";
import { ConversationType, User } from "../../utils/types";
import SelectedRecipientChip from "./SelectedRecipientChip";

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  selectedUser: User | undefined;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
  selectedUsers: User[];
  setSelectedUsers: Dispatch<SetStateAction<User[]>>;
  type: ConversationType;
};
const RecipientField = ({
  query,
  setQuery,
  selectedUser,
  setSelectedUser,
  selectedUsers,
  setSelectedUsers,
  type,
}: Props) => {
  const renderRecipients = () => {
    if (!selectedUser && selectedUsers.length === 0)
      return (
        <InputField
          id="email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      );

    if (type === "private" && selectedUser)
      return (
        <SelectedRecipientChip
          user={selectedUser}
          setSelectedUser={setSelectedUser}
          setSelectedUsers={setSelectedUsers}
          type={type}
        />
      );

    return selectedUsers.map((user) => (
      <SelectedRecipientChip
        key={user.id}
        user={user}
        setSelectedUser={setSelectedUser}
        setSelectedUsers={setSelectedUsers}
        type={type}
      />
    ));
  };

  return (
    <section>
      <InputContainer backgroundColor="#161616">
        <InputLabel htmlFor="email">Recipient</InputLabel>
        <RecipientChipContainer>{renderRecipients()}</RecipientChipContainer>
      </InputContainer>
    </section>
  );
};

export default RecipientField;
