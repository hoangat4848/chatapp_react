import React, { useEffect, useRef } from "react";
import { ModalContainer, ModalContentBody, ModalHeader } from ".";
import { StyledOverlay } from "../../utils/styles";
import CreateConversationForm from "../forms/CreateConversationForm";
import { MdClose } from "react-icons/md";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateConversationModal = ({ setShowModal }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) =>
      e.key === "Escape" && setShowModal(false);
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setShowModal]);

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
          <h2>Create a conversation</h2>
          <MdClose size={32} onClick={() => setShowModal(false)} />
        </ModalHeader>
        <ModalContentBody>
          <CreateConversationForm setShowModal={setShowModal} />
        </ModalContentBody>
      </ModalContainer>
    </StyledOverlay>
  );
};

export default CreateConversationModal;
