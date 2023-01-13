import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { updateGroupDetailsThunk } from "../../store/slices/groupSlice";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from "../../utils/styles";
import GroupAvatarUpload from "../avatars/GroupAvatarUpload";

const EditGroupForm = () => {
  const [file, setFile] = useState<File>();
  const group = useSelector(
    (state: RootState) => state.group.selectedGroupContextMenu
  );
  const dispatch = useDispatch<AppDispatch>();
  const [newGroupTitle, setNewGroupTitle] = useState(group?.title ?? "");
  const isStateChanged = () => file || group?.title !== newGroupTitle;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!group) throw new Error("Group undefined!");
    if (!isStateChanged()) return;

    const formData = new FormData();
    if (file) formData.append("avatar", file);
    if (newGroupTitle !== group.title) formData.append("title", newGroupTitle);
    dispatch(updateGroupDetailsThunk({ groupId: group.id, data: formData }));
  };

  return (
    <form
      style={{
        width: "100%",
      }}
      onSubmit={handleSubmit}
    >
      <GroupAvatarUpload setFile={setFile} />
      <InputContainer backgroundColor="#161616">
        <InputLabel htmlFor="groupName">Group Name</InputLabel>
        <InputField
          id="groupName"
          value={newGroupTitle}
          onChange={(e) => setNewGroupTitle(e.target.value)}
        />
      </InputContainer>
      <Button style={{ margin: "10px 0" }} disabled={!isStateChanged()}>
        Save
      </Button>
    </form>
  );
};

export default EditGroupForm;
