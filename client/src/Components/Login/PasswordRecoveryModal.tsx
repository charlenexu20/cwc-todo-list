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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { isInvalidEmail } from "../../pages/SignUp";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const PasswordRecoveryModal = ({ isOpen, onClose }: Props) => {
  const toast = useToast();
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = () => {
    console.log("EMAIL: ", email);
    const invalidEmail = isInvalidEmail(email);
    if (invalidEmail) {
      toast({
        title: "Error",
        description: "Please enter a valid email!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      axios
        .post("http://localhost:3001/auth/reset-password", {
          email,
        })
        .then((response) => {
          setEmail("");
          onClose();
          console.log("RESPONSE: ", response.data);
          toast({
            title: "Success",
            description:
              "Reset password email sent! Please check your inbox and follow the instructions to reset your password.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: "Error",
            description: error.response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
    // onClose();
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
        <Button w="100%" m={4} onClick={handleEmailSubmit}>
          SUBMIT
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default PasswordRecoveryModal;
