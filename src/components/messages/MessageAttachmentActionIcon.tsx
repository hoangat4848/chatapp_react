import { CirclePlusFill } from "akar-icons";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  addAttachment,
  incrementAttachmentCounter,
} from "../../store/message-panel/messagePanelSlice";
import { FileInput } from "../../utils/styles";
import { DivMouseEvent, InputChangeEvent } from "../../utils/types";
import styles from "./index.module.scss";

const MessageAttachmentActionIcon = () => {
  const attachmentIconRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { attachmentCounter } = useSelector(
    (state: RootState) => state.messagePanel
  );

  const handleClick = (e: DivMouseEvent) => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: InputChangeEvent) => {
    const file = e.target.files?.item(0);
    if (file) {
      dispatch(addAttachment({ id: attachmentCounter, file }));
      dispatch(incrementAttachmentCounter());
    }
  };

  return (
    <div ref={attachmentIconRef} onClick={handleClick}>
      <CirclePlusFill size={36} className={styles.icon} cursor="pointer" />
      <FileInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default MessageAttachmentActionIcon;
