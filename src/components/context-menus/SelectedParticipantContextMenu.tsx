import { Crown, Person, PersonCross } from "akar-icons";
import { forwardRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import {
  removeGroupRecipientThunk,
  selectGroupById,
  updateGroupOwnerThunk,
} from "../../store/slices/groupSlice";
import { AuthContext } from "../../utils/context/AuthContext";
import { getUserContextMenuIcon, isGroupOwner } from "../../utils/helpers";
import { ContextMenu, ContextMenuItem } from "../../utils/styles";
import { UserContextMenuActionType } from "../../utils/types";

type CustomIconProps = {
  type: UserContextMenuActionType;
};

export const CustomIcon = ({ type }: CustomIconProps) => {
  const { icon: MyIcon, color } = getUserContextMenuIcon(type);
  return <MyIcon size={20} color={color} />;
};

type Props = {
  location: { x: number; y: number };
};

const SelectedParticipantContextMenu = ({ location }: Props) => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(id!))
  );
  const selectedUser = useSelector(
    (state: RootState) => state.groupSidebar.selectedUser
  );

  const isOwner = isGroupOwner(user, group);

  const kickUser = () => {
    console.log(`Kicking user: ${selectedUser}`);
    if (!selectedUser) return;
    dispatch(
      removeGroupRecipientThunk({
        groupId: parseInt(id!),
        userId: selectedUser.id,
      })
    );
  };

  const transferGroupOwner = () => {
    if (!selectedUser) return;
    console.log(`Transfering group owner to ${selectedUser.id}`);
    dispatch(
      updateGroupOwnerThunk({
        groupId: parseInt(id!),
        newOwnerId: selectedUser.id,
      })
    );
  };

  return (
    <ContextMenu top={location.y} left={location.x}>
      <ContextMenuItem>
        <Person size={20} color="#7c7c7c" />
        <span style={{ color: "#7c7c7c" }}>Profile</span>
      </ContextMenuItem>
      {isOwner && user?.id !== selectedUser?.id && (
        <>
          <ContextMenuItem onClick={kickUser}>
            <PersonCross size={20} color="#ff0000" />
            <span style={{ color: "#ff0000" }}>Kick User</span>
          </ContextMenuItem>
          <ContextMenuItem onClick={transferGroupOwner}>
            <Crown size={20} color="#FFB800" />
            <span style={{ color: "#FFB800" }}>Transfer Owner</span>
          </ContextMenuItem>
        </>
      )}
    </ContextMenu>
  );
};

export default forwardRef<null, Props>(SelectedParticipantContextMenu);
