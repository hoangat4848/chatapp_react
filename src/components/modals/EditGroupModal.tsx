import { useRef, useCallback } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { ModalContainer, ModalHeader, ModalContentBody } from ".";
import useKeydown from "../../hooks/useKeydown";
import { AppDispatch } from "../../store";
import { setShowEditGroupModal } from "../../store/slices/groupSlice";
import { StyledOverlay } from "../../utils/styles";
import EditGroupForm from "../forms/EditGroupForm";

const EditGroupModal = () => {
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.key === "Escape" && dispatch(setShowEditGroupModal(false));
    },
    [dispatch]
  );
  useKeydown(handleKeyDown);

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { current } = ref;
    if (current === e.target) {
      dispatch(setShowEditGroupModal(false));
    }
  };

  return (
    <StyledOverlay ref={ref} onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <h2>Edit group</h2>
          <MdClose
            size={32}
            onClick={() => dispatch(setShowEditGroupModal(false))}
          />
        </ModalHeader>
        <ModalContentBody>
          <EditGroupForm />
        </ModalContentBody>
      </ModalContainer>
    </StyledOverlay>
  );
};

export default EditGroupModal;
