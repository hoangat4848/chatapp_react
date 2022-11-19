import React from "react";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
  TextField,
} from "../../utils/styles";
import styles from "./index.module.scss";

const CreateConversationForm = () => {
  return (
    <form className={styles.createConversationForm}>
      <InputContainer backgroundColor="#161616">
        <InputLabel>Recipient</InputLabel>
        <InputField />
      </InputContainer>
      <section className={styles.message}>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Message (optional)</InputLabel>
          <TextField />
        </InputContainer>
      </section>

      <Button>Create Conversation</Button>
    </form>
  );
};

export default CreateConversationForm;
