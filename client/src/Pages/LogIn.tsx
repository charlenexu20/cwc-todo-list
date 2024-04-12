import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import PasswordRecoveryModal from "../components/Login/PasswordRecoveryModal";

const LogIn = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const context = useOutletContext() as Context;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);

  const [submitClickedUsername, setSubmitClickedUsername] = useState(false);
  const [submitClickedPassword, setSubmitClickedPassword] = useState(false);

  const isErrorUsername = username === "" && submitClickedUsername;
  const isErrorPassword = password === "" && submitClickedPassword;

  const handleUsernameChange = (e: any) => {
    setSubmitClickedUsername(false);
    const value = e.target.value;
    setUsername(value);
  };

  const handlePasswordChange = (e: any) => {
    setSubmitClickedPassword(false);
    const value = e.target.value;
    setPassword(value);
  };

  const handleShowClick = (e: any) => {
    setShow(!show);
  };

  const handleSubmit = () => {
    setSubmitClickedUsername(true);
    setSubmitClickedPassword(true);

    if (username === "" || password === "") {
      return;
    } else {
      axios
        .post("http://localhost:3001/auth/log-in", {
          username,
          password,
        })
        .then((response) => {
          const token = response.data;
          context.toggleLoggedIn();
          localStorage.setItem("token", token);

          setUsername("");
          setPassword("");
          setSubmitClickedUsername(false);
          setSubmitClickedPassword(false);

          navigate("/projects");
          toast({
            title: "Logged in successfully.",
            description: `Hello, ${username}!`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          setUsername("");
          setPassword("");
          setSubmitClickedUsername(false);
          setSubmitClickedPassword(false);

          console.log("ERROR", error);
          toast({
            title: "Error",
            description:
              "Invalid login or password. Remember that password is case-sensitive. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <Box mt={20}>
      <Heading textAlign="center" mb={4} fontSize={28}>
        Login
      </Heading>
      <Box
        maxW="75%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 auto"
        gap={4}
      >
        <FormControl isInvalid={isErrorUsername} isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            size="lg"
            value={username}
            onChange={handleUsernameChange}
            layerStyle="text"
          />
          {!isErrorUsername ? null : (
            <FormErrorMessage>Please enter a username.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={isErrorPassword} isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="lg">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              size="lg"
              value={password}
              onChange={handlePasswordChange}
              layerStyle="text"
            />

            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleShowClick}
                variant="action-button"
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {!isErrorPassword ? null : (
            <FormErrorMessage>Please enter a valid password.</FormErrorMessage>
          )}
        </FormControl>
        <Button
          w="100%"
          size="lg"
          onClick={handleSubmit}
          variant="action-button"
        >
          LOGIN
        </Button>
        <Box w="100%" display="flex" lineHeight="40px">
          <Link
            href="#"
            onClick={onOpen}
            textDecorationLine="underline"
            layerStyle="text"
          >
            Forgot your password?
          </Link>
          <Text paddingInline={4}>/</Text>
          <Link href="/sign-up" textDecorationLine="underline">
            Create account
          </Link>
        </Box>
        <PasswordRecoveryModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </Box>
  );
};

export default LogIn;
