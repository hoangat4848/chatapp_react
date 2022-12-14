import { Dispatch, SetStateAction } from "react";
import {
  InputContainer,
  InputField,
  InputLabel,
  RecipientChipContainer,
} from "../../utils/styles";
import { User } from "../../utils/types";

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  selectedUsers: User[];
  setSelectedUsers: Dispatch<SetStateAction<User[]>>;
};
const GroupRecipientField = ({ query, setQuery }: Props) => {
  return (
    <section>
      <InputContainer backgroundColor="#161616">
        <InputLabel htmlFor="email">Recipients</InputLabel>
        <RecipientChipContainer>
          <InputField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </RecipientChipContainer>
      </InputContainer>
    </section>
  );
};

export default GroupRecipientField;
