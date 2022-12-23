import {
  RecipientResultBottomFooter,
  RecipientResultItem,
  RecipientScrollableItemContainer,
  StyledRecipientResultContainer,
} from "../../utils/styles";
import { ConversationType, User } from "../../utils/types";

type Props = {
  userResults: User[];
  handleUserSelect: (user: User) => void;
};
const RecipientResultContainer = ({ userResults, handleUserSelect }: Props) => {
  return (
    <StyledRecipientResultContainer>
      <RecipientScrollableItemContainer>
        {userResults.map((user) => (
          <RecipientResultItem
            key={user.id}
            onClick={() => handleUserSelect(user)}
          >
            <span>{user.username}</span>
          </RecipientResultItem>
        ))}
      </RecipientScrollableItemContainer>
    </StyledRecipientResultContainer>
  );
};

export default RecipientResultContainer;
