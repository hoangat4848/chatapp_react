import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useToast } from "../../hooks/useToast";
import {
  InputContainer,
  InputLabel,
  InputField,
  Button,
} from "../../utils/styles";
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { createFriendRequestThunk } from "../../store/friends/friendThunk";
import { User } from "../../utils/types";
import { useDebounce } from "../../hooks/useDebounce";
import { searchUsers } from "../../utils/api";
import RecipientResultContainer from "../recipients/RecipientResultContainer";
import RecipientField from "../recipients/RecipientField";
import useOnClickOutside from "../../hooks/useOnClickOutside";

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const SendFriendRequestForm = ({ setShowModal }: Props) => {
  const [username, setUsername] = useState("");
  const [userResults, setUserResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const { success, error } = useToast({ theme: "dark" });

  const dispatch = useDispatch<AppDispatch>();
  const recipientResultRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("ok");
    if (!selectedUser && !username) return error("Please enter a username");
    const requestToUsername = selectedUser?.username || username;

    dispatch(createFriendRequestThunk(requestToUsername))
      .unwrap()
      .then(() => {
        success("Sent friend request");
        setShowModal(false);
      })
      .catch((err) => {
        if (err.response) {
          return error(err.response.data.message);
        }

        error("Error sending friend request");
      });
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Alt") {
        console.log("Close");
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const debouncedQuery = useDebounce(username, 1000);
  useEffect(() => {
    if (!debouncedQuery) {
      return setUserResults([]);
    }
    searchUsers(debouncedQuery)
      .then(({ data }) => setUserResults(data))
      .catch((err) => console.log(err));
  }, [debouncedQuery]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setUsername("");
    setUserResults([]);
  };

  const handleCloseSuggestion = useCallback(() => setUserResults([]), []);
  useOnClickOutside(recipientResultRef, handleCloseSuggestion);

  return (
    <form className={styles.createConversationForm} onSubmit={handleSubmit}>
      <RecipientField
        query={username}
        setQuery={setUsername}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      {/* <InputContainer backgroundColor="#161616">
        <InputLabel>Recipient</InputLabel>
        <InputField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputContainer> */}
      {!selectedUser && userResults.length > 0 && (
        <RecipientResultContainer
          userResults={userResults}
          handleUserSelect={handleUserSelect}
          ref={recipientResultRef}
        />
      )}
      <Button
        style={{
          margin: "10px 0",
        }}
        disabled={!selectedUser && !username}
      >
        Send
      </Button>
    </form>
  );
};

export default SendFriendRequestForm;
