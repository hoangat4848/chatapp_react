import { Dispatch, SetStateAction } from "react";
import {
  InputContainer,
  InputField,
  InputLabel,
  RecipientChipContainer,
} from "../../utils/styles";

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
};
const GroupRecipientField = ({ query, setQuery }: Props) => {
  return (
    <section>
      <InputContainer>
        <InputLabel htmlFor="username">Recipients</InputLabel>
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
