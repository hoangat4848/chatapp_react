export type PageProps = Partial<{
  display: string;
  justifyContent: string;
  alignItems: string;
}>;

export type InputContainerProps = Partial<{
  backgroundColor: string;
}>;

export type MessageItemContentProps = Partial<{
  padding: string;
}>;

export type ContextMenuProps = Partial<{
  top: number;
  left: number;
}>;

export type ConversationTabItemProps = {
  selected: boolean;
};

export type SidebarItemProps = {
  active?: boolean;
};

export type ModalContainerProps = Partial<{
  showModal: boolean;
}>;

export type CharacterLimitProps = {
  atMaxLength: boolean;
};

export type MessageInputContainerProps = {
  isMultiLine: boolean;
};

export type ConversationSidebarItemProps = {
  selected: boolean;
};

export type FriendsNavbarItemProps = {
  active: boolean;
};
