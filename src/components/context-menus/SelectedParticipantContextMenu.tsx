import { useContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { selectGroupById } from "../../store/slices/groupSlice";
import { userContextMenuItems } from "../../utils/constants";
import { AuthContext } from "../../utils/context/AuthContext";
import {
  getUserContextMenuActions,
  getUserContextMenuIcon,
} from "../../utils/helpers";
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
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(id!))
  );

  return (
    <ContextMenu top={location.y} left={location.x}>
      {getUserContextMenuActions(user, group).map((item) => (
        <ContextMenuItem>
          <CustomIcon type={item.action} />
          <span style={{ color: item.color }}>{item.label}</span>
        </ContextMenuItem>
      ))}
    </ContextMenu>
  );
};

export default SelectedParticipantContextMenu;
