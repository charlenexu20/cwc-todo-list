import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const PasswordRecoveryModal = ({ isOpen, onClose }: Props) => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleButtonClick = () => {
    console.log("EMAIL: ", email);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent px={20} py={12} alignItems="center">
        <ModalHeader fontSize={26} mb={2}>
          Password Recovery
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p="0">
          <Box w="100%">
            <Text mb={6} px={6} textAlign="center" fontSize={18}>
              Provide your account email to receive an email to reset your
              password.
            </Text>
            <Input
              type="text"
              placeholder="Email*"
              w="100%"
              onChange={handleEmailChange}
              isRequired
            />
          </Box>
        </ModalBody>
        <Button w="100%" m={4} onClick={handleButtonClick}>
          SUBMIT
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default PasswordRecoveryModal;
