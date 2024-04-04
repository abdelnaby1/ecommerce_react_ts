import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import React from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  cancelText: string;
  okText: string;
  isLoading: boolean;
  onOkHander: () => void;
}
const CustomeAlertDialog = ({
  isOpen,
  onClose,
  title,
  description,
  cancelText,
  okText,
  isLoading,
  onOkHander,
}: IProps) => {
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay
          bg={"blackAlpha.500"}
          backdropFilter={"blur(5px) hue-rotate(90deg)"}
        >
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{description}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {cancelText}
              </Button>
              <Button
                colorScheme="red"
                onClick={onOkHander}
                ml={3}
                isLoading={isLoading}
              >
                {okText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
export default CustomeAlertDialog;
