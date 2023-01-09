import { forwardRef } from "react";
import {
  RecipientResultItem,
  RecipientScrollableItemContainer,
  StyledRecipientResultContainer,
} from "../../utils/styles";
import { User } from "../../utils/types";

type Props = {
  userResults: User[];
  handleUserSelect: (user: User) => void;
};
type Ref = HTMLDivElement;

const RecipientResultContainer = forwardRef<Ref, Props>(
  ({ userResults, handleUserSelect }: Props, ref) => {
    return (
      <StyledRecipientResultContainer ref={ref}>
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
  }
);

export default RecipientResultContainer;
