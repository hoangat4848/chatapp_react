import React, { useState } from "react";
import {
  InputContainer,
  InputLabel,
  InputField,
  Button,
} from "../../utils/styles";
import styles from "./index.module.scss";

const AddGroupRecipientForm = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={styles.createConversationForm} onSubmit={handleSubmit}>
      <InputContainer backgroundColor="#161616">
        <InputLabel>Recipient</InputLabel>
        <InputField onChange={(e) => setQuery(e.target.value)} />
      </InputContainer>
      <Button style={{ margin: "10px 0" }} disabled={!query}>
        Add Recipient
      </Button>
    </form>
  );
};

export default AddGroupRecipientForm;
