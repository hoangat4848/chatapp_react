import { Dispatch, SetStateAction, useContext, useRef } from "react";
import { AuthContext } from "../../../utils/context/AuthContext";
import { FileInput } from "../../../utils/styles";
import { UserAvatarContainer } from "../../../utils/styles/settings";
import { InputChangeEvent } from "../../../utils/types";

type Props = {
  avatarSource: string;
  avatarSourceCopy: string;
  setAvatarSourceCopy: Dispatch<SetStateAction<string>>;
  setAvatarFile: Dispatch<SetStateAction<File | undefined>>;
};
const UserAvatar = ({
  avatarSource,
  avatarSourceCopy,
  setAvatarSourceCopy,
  setAvatarFile,
}: Props) => {
  const { user } = useContext(AuthContext);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAvatarClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: InputChangeEvent) => {
    const file = e.target.files?.item(0);
    setAvatarSourceCopy(file ? URL.createObjectURL(file) : avatarSource);
    setAvatarFile(file || undefined);
  };

  return (
    <>
      <UserAvatarContainer url={avatarSourceCopy} onClick={handleAvatarClick} />
      <FileInput
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </>
  );
};

export default UserAvatar;
