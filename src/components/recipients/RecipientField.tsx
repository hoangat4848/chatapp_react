import { Dispatch, SetStateAction } from "react";
import { InputContainer, InputLabel, InputField } from "../../utils/styles";
import { User } from "../../utils/types";
import SelectedRecipientChip from "./SelectedRecipientChip";

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  selectedUser: User | undefined;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
};
const RecipientField = ({
  query,
  setQuery,
  selectedUser,
  setSelectedUser,
}: Props) => {
  const handleChipClose = (user: User) => {
    setSelectedUser(undefined);
  };
  return (
    <section>
      <InputContainer backgroundColor="#161616">
        <InputLabel htmlFor="username">Recipient</InputLabel>
        {selectedUser ? (
          <SelectedRecipientChip
            user={selectedUser}
            onChipClose={handleChipClose}
          />
        ) : (
          <InputField
            id="username"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        )}
      </InputContainer>
    </section>
  );
};

export default RecipientField;
