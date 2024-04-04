import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ReactNode } from "react";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  closeText?: string;
  actionsText?: string;
  isLoading: boolean;
  children: ReactNode;
  initialRef: React.RefObject<HTMLInputElement>;
  okHandler: () => void;
}
const CustomeModal = ({
  isOpen,
  onClose,
  title,
  closeText = "Close",
  actionsText = "Submit",
  isLoading,
  initialRef,
  children,
  okHandler,
}: IProps) => {
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        initialFocusRef={initialRef}
      >
        <ModalOverlay
          bg={"blackAlpha.500"}
          backdropFilter={"blur(5px) hue-rotate(90deg)"}
        />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button variant="solid" mr={3} onClick={onClose}>
              {closeText}
            </Button>
            <Button
              colorScheme="blue"
              isLoading={isLoading}
              onClick={okHandler}
            >
              {actionsText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomeModal;
