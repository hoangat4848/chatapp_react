import { Dispatch, SetStateAction, useState } from "react";
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

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const SendFriendRequestForm = ({ setShowModal }: Props) => {
  const [username, setUsername] = useState("");
  const { success, error } = useToast({ theme: "dark" });

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createFriendRequestThunk(username))
      .unwrap()
      .then(() => {
        success("Sent friend request");
        setShowModal(false);
      })
      .catch((err) => error("Error sending friend request"));
  };

  return (
    <form className={styles.createConversationForm} onSubmit={handleSubmit}>
      <InputContainer backgroundColor="#161616">
        <InputLabel>Recipient</InputLabel>
        <InputField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputContainer>
      <Button
        style={{
          margin: "10px 0",
        }}
        disabled={!username}
      >
        Send
      </Button>
    </form>
  );
};

export default SendFriendRequestForm;
