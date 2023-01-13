import { SetStateAction, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getImageUrl } from "../../utils/helpers";
import {
  AvatarUploadContainer,
  FileInput,
  GroupAvatarUploadContainer,
} from "../../utils/styles";
import { InputChangeEvent } from "../../utils/types";
import defaultAvatar from "../../__assets__/default-avatar.png";

type Props = {
  setFile: React.Dispatch<SetStateAction<File | undefined>>;
};
const GroupAvatarUpload = ({ setFile }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { selectedGroupContextMenu } = useSelector(
    (state: RootState) => state.group
  );
  const [source, setSource] = useState("");

  const getGroupAvatar = () => {
    return selectedGroupContextMenu && selectedGroupContextMenu.avatar
      ? getImageUrl(selectedGroupContextMenu.avatar)
      : defaultAvatar;
  };

  const handleFileChange = (e: InputChangeEvent) => {
    const file = e.target.files?.item(0);
    if (file) {
      setSource(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  return (
    <GroupAvatarUploadContainer>
      <AvatarUploadContainer
        url={source || getGroupAvatar()}
        onClick={handleAvatarClick}
      />
      <FileInput
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
      />
    </GroupAvatarUploadContainer>
  );
};

export default GroupAvatarUpload;
