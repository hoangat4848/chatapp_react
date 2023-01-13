import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  leaveGroupThunk,
  setShowEditGroupModal,
} from "../../store/slices/groupSlice";
import { ContextMenu, ContextMenuItem } from "../../utils/styles";
import { MdPersonRemove } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { Edit } from "akar-icons";
import { useToast } from "../../hooks/useToast";

const GroupSidebarContextMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useContext(AuthContext);
  const location = useSelector(
    (state: RootState) => state.group.contextMenuLocation
  );
  const { error } = useToast();

  const selectedGroupContextMenu = useSelector(
    (state: RootState) => state.group.selectedGroupContextMenu
  );

  const leaveGroup = () => {
    if (!selectedGroupContextMenu) return;
    dispatch(leaveGroupThunk(selectedGroupContextMenu.id))
      .unwrap()
      .then((a) => console.log(a))
      .catch((err) => {
        if (err.response) {
          error(err.response.data.message);
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }
      });
  };

  const editGroup = () => {
    dispatch(setShowEditGroupModal(true));
  };

  return (
    <ContextMenu top={location.y} left={location.x}>
      <ContextMenuItem onClick={leaveGroup}>
        <MdPersonRemove size={20} color="#ff0000" />
        <span style={{ color: "#ff0000" }}>Leave Group</span>
      </ContextMenuItem>

      {user?.id === selectedGroupContextMenu?.owner.id && (
        <ContextMenuItem onClick={editGroup}>
          <Edit size={20} />
          <span>Edit Group</span>
        </ContextMenuItem>
      )}
    </ContextMenu>
  );
};

export default GroupSidebarContextMenu;
