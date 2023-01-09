import React, { useCallback, useEffect, useRef } from "react";
import { ModalContainer, ModalContentBody, ModalHeader } from ".";
import { StyledOverlay } from "../../utils/styles";
import { MdClose } from "react-icons/md";
import CreateGroupForm from "../forms/CreateGroupForm";
import useKeydown from "../../hooks/useKeydown";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateGroupModal = ({ setShowModal }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.key === "Escape" && setShowModal(false);
    },
    [setShowModal]
  );
  useKeydown(handleKeyDown);

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { current } = ref;
    if (current === e.target) {
      setShowModal(false);
    }
  };

  return (
    <StyledOverlay ref={ref} onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <h2>Create a group</h2>
          <MdClose size={32} onClick={() => setShowModal(false)} />
        </ModalHeader>
        <ModalContentBody>
          <CreateGroupForm setShowModal={setShowModal} />
        </ModalContentBody>
      </ModalContainer>
    </StyledOverlay>
  );
};

export default CreateGroupModal;
