import React, { Dispatch, SetStateAction } from "react";
import { chatTypes } from "../../utils/constants";
import { ConversationType } from "../../utils/types";
import styles from "./index.module.scss";

type Props = {
  type: ConversationType;
  setType: Dispatch<SetStateAction<ConversationType>>;
};
const ConversationRadioTypeForm = ({ type, setType }: Props) => {
  return (
    <form className={styles.conversationTypeForm}>
      {chatTypes.map(({ label, type: chatType }) => (
        <div key={chatType}>
          <input
            className={styles.radio}
            type="radio"
            name="conversationType"
            id={chatType}
            onChange={() => setType(chatType)}
            checked={chatType === type}
          />
          <label htmlFor={chatType} className={styles.radioLabel}>
            {label}
          </label>
        </div>
      ))}
    </form>
  );
};

export default ConversationRadioTypeForm;
