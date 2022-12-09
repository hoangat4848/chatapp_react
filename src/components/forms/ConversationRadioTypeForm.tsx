import React from "react";
import styles from "./index.module.scss";

const ConversationRadioTypeForm = () => {
  return (
    <form className={styles.conversationTypeForm}>
      <div>
        <input
          className={styles.radio}
          type="radio"
          name="conversationType"
          id="private"
        />
        <label htmlFor="private" className={styles.radioLabel}>
          Private
        </label>
      </div>
      <div>
        <input
          className={styles.radio}
          type="radio"
          name="conversationType"
          id="group"
        />
        <label htmlFor="group" className={styles.radioLabel}>
          Group
        </label>
      </div>
    </form>
  );
};

export default ConversationRadioTypeForm;
