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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import * as validator from "validator";
import PasswordChecklist from "react-password-checklist";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../App";

// Data validation
export const isInvalidEmail = (email: string) => {
  const emailFormat = /\S+@\S+\.\S+/;
  if (email.match(emailFormat)) {
    return false;
  } else {
    return true;
  }
};

const isInvalidPassword = (password: string) => {
  if (
    validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return false;
  } else {
    return true;
  }
};

const SignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const context = useOutletContext() as Context;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);

  const [submitClickedName, setSubmitClickedName] = useState(false);
  const [submitClickedEmail, setSubmitClickedEmail] = useState(false);
  const [submitClickedUsername, setSubmitClickedUsername] = useState(false);
  const [submitClickedPassword, setSubmitClickedPassword] = useState(false);

  const isErrorName = name === "" && submitClickedName;
  const isErrorEmail = isInvalidEmail(email) && submitClickedEmail;
  const isErrorUsername = username === "" && submitClickedUsername;
  const isErrorPassword = isInvalidPassword(password) && submitClickedPassword;

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
    setShowChecklist(!!value);
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
      isInvalidPassword(password)
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
          const token = response.data;
          context.toggleLoggedIn();
          localStorage.setItem("token", token);

          setName("");
          setEmail("");
          setUsername("");
          setPassword("");
          setShowChecklist(false);
          setSubmitClickedName(false);
          setSubmitClickedEmail(false);
          setSubmitClickedUsername(false);
          setSubmitClickedPassword(false);

          navigate("/projects");
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          setName("");
          setEmail("");
          setUsername("");
          setPassword("");
          setShowChecklist(false);
          setSubmitClickedName(false);
          setSubmitClickedEmail(false);
          setSubmitClickedUsername(false);
          setSubmitClickedPassword(false);

          console.log("ERROR", error);
          toast({
            title: "Error",
            description: error.response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <Box>
      <Heading textAlign="center" mb={4}>
        Register
      </Heading>
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
          <Input
            type="text"
            size="lg"
            value={name}
            onChange={handleNameChange}
          />
          {!isErrorName ? null : (
            <FormErrorMessage>Please enter your full name.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={isErrorEmail} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            size="lg"
            value={email}
            onChange={handleEmailChange}
          />
          {!isErrorEmail ? null : (
            <FormErrorMessage>
              Please enter a valid email address.
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={isErrorUsername} isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            size="lg"
            value={username}
            onChange={handleUsernameChange}
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
            />

            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {!isErrorPassword ? null : (
            <FormErrorMessage>Please enter a valid password.</FormErrorMessage>
          )}
          {showChecklist && (
            <PasswordChecklist
              rules={[
                "lowercase",
                "capital",
                "number",
                "specialChar",
                "minLength",
              ]}
              iconSize={12}
              minLength={8}
              value={password}
              messages={{
                lowercase: "1 lower case character",
                capital: "1 upper case character",
                number: "1 number",
                specialChar: "1 symbol",
                minLength: "8 characters minimum",
              }}
            />
          )}
        </FormControl>
        <Button w="100%" size="lg" onClick={handleSubmit}>
          CREATE MY ACCOUNT
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
