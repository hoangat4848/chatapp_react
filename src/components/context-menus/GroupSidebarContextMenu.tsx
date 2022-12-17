import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { selectGroupById } from "../../store/slices/groupSlice";
import { AuthContext } from "../../utils/context/AuthContext";
import { isGroupOwner } from "../../utils/helpers";
import { ContextMenu, ContextMenuItem } from "../../utils/styles";
import { IoMdExit, IoIosArchive } from "react-icons/io";

const GroupSidebarContextMenu = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const location = useSelector(
    (state: RootState) => state.group.contextMenuLocation
  );

  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(id!))
  );

  const isOwner = isGroupOwner(user, group);

  return (
    <ContextMenu top={location.y} left={location.x}>
      <ContextMenuItem>
        <IoMdExit size={20} color="#ff0000" />
        <span style={{ color: "#ff0000" }}>Leave Group</span>
      </ContextMenuItem>
      <ContextMenuItem>
        <IoIosArchive size={20} color="#fff" />
        <span style={{ color: "#fff" }}>Archive Group</span>
      </ContextMenuItem>
    </ContextMenu>
  );
};

export default GroupSidebarContextMenu;
