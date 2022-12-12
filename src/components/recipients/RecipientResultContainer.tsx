import {
  RecipientResultBottomFooter,
  RecipientResultItem,
  RecipientScrollableItemContainer,
  StyledRecipientResultContainer,
} from "../../utils/styles";
import { ConversationType, User } from "../../utils/types";

type Props = {
  userResults: User[];
  type: ConversationType;
  handleUserSelect: (user: User) => void;
  handleMultipleUserSelect: (user: User) => void;
  removeAllSelectedUsers: () => void;
  saveResults: () => void;
};
const RecipientResultContainer = ({
  userResults,
  type,
  handleUserSelect,
  handleMultipleUserSelect,
  removeAllSelectedUsers,
  saveResults,
}: Props) => {
  return (
    <StyledRecipientResultContainer>
      <RecipientScrollableItemContainer>
        {userResults.map((user) => (
          <RecipientResultItem
            key={user.id}
            onClick={() => {
              type === "private"
                ? handleUserSelect(user)
                : handleMultipleUserSelect(user);
            }}
          >
            <span>{user.email}</span>
          </RecipientResultItem>
        ))}
      </RecipientScrollableItemContainer>

      <RecipientResultBottomFooter>
        <span onClick={removeAllSelectedUsers}>Cancel</span>
        <span onClick={saveResults}>Save</span>
      </RecipientResultBottomFooter>
    </StyledRecipientResultContainer>
  );
};

export default RecipientResultContainer;
