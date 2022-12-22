import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { leaveGroupThunk } from "../../store/slices/groupSlice";
import { ContextMenu, ContextMenuItem } from "../../utils/styles";
import { MdOutlineTextsms, MdPersonRemove } from "react-icons/md";

const GroupSidebarContextMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useSelector(
    (state: RootState) => state.group.contextMenuLocation
  );

  const selectedGroupContextMenu = useSelector(
    (state: RootState) => state.group.selectedGroupContextMenu
  );

  const leaveGroup = () => {
    if (!selectedGroupContextMenu) return;
    dispatch(leaveGroupThunk(selectedGroupContextMenu.id));
  };

  return (
    <ContextMenu top={location.y} left={location.x}>
      <ContextMenuItem onClick={leaveGroup}>
        <MdPersonRemove size={20} color="#ff0000" />
        <span style={{ color: "#ff0000" }}>Leave Group</span>
      </ContextMenuItem>
      <ContextMenuItem>
        <MdOutlineTextsms size={20} color="#fff" />
        <span style={{ color: "#fff" }}>Archive Group</span>
      </ContextMenuItem>
    </ContextMenu>
  );
};

export default GroupSidebarContextMenu;
