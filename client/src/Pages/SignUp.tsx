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
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

// Data validation
const isInvalidEmail = (email: string) => {
  const emailFormat = /\S+@\S+\.\S+/;
  if (email.match(emailFormat)) {
    return false;
  } else {
    return true;
  }
};

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);

  const [submitClickedName, setSubmitClickedName] = useState(false);
  const [submitClickedEmail, setSubmitClickedEmail] = useState(false);
  const [submitClickedUsername, setSubmitClickedUsername] = useState(false);
  const [submitClickedPassword, setSubmitClickedPassword] = useState(false);

  const isErrorName = name === "" && submitClickedName;
  const isErrorEmail = isInvalidEmail(email) && submitClickedEmail;
  const isErrorUsername = username === "" && submitClickedUsername;
  const isErrorPassword = password === "" && submitClickedPassword;

  const handleNameChange = (e: any) => {
    setSubmitClickedName(false);
    const value = e.target.value;
    setName(value);
  };

  const handleEmailChange = (e: any) => {
    setSubmitClickedEmail(false);
    const value = e.target.value;
    setEmail(value);
  };

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
    setSubmitClickedName(true);
    setSubmitClickedEmail(true);
    setSubmitClickedUsername(true);
    setSubmitClickedPassword(true);

    if (
      name === "" ||
      isInvalidEmail(email) ||
      username === "" ||
      password === ""
    ) {
      return;
    } else {
      axios
        .post("http://localhost:3001/auth/sign-up", {
          name,
          email,
          username,
          password,
        })
        .then((response) => {
          console.log("RESPONSE", response);
          setName("");
          setEmail("");
          setUsername("");
          setPassword("");
          setSubmitClickedName(false);
          setSubmitClickedEmail(false);
          setSubmitClickedUsername(false);
          setSubmitClickedPassword(false);
        });
    }
  };

  return (
    <Box>
      <Heading textAlign="center">Create an account</Heading>
      <Box
        maxW="75%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 auto"
        gap={4}
      >
        <FormControl isInvalid={isErrorName} isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" value={name} onChange={handleNameChange} />
          {!isErrorName ? null : (
            <FormErrorMessage>Please enter your full name.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={isErrorEmail} isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={handleEmailChange} />
          {!isErrorEmail ? null : (
            <FormErrorMessage>
              Please enter a valid email address.
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={isErrorUsername} isRequired>
          <FormLabel>Username</FormLabel>
          <Input type="text" value={username} onChange={handleUsernameChange} />
          {!isErrorUsername ? null : (
            <FormErrorMessage>Please enter a username.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={isErrorPassword} isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {!isErrorPassword ? null : (
            <FormErrorMessage>Please enter a password.</FormErrorMessage>
          )}
        </FormControl>

        <Button w="100%" onClick={handleSubmit}>
          SIGN UP
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
