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
import { createFriendRequestThunk } from "../../store/slices/friendSlice";

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const SendFriendRequestForm = ({ setShowModal }: Props) => {
  const [email, setEmail] = useState("");
  const { success, error } = useToast({ theme: "dark" });

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createFriendRequestThunk(email))
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
        <InputField value={email} onChange={(e) => setEmail(e.target.value)} />
      </InputContainer>
      <Button
        style={{
          margin: "10px 0",
        }}
        disabled={!email}
      >
        Send
      </Button>
    </form>
  );
};

export default SendFriendRequestForm;
