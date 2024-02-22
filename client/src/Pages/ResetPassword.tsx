import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const [submitClickedPassword, setSubmitClickedPassword] = useState(false);
  const [submitClickedSecondPassword, setSubmitClickedSecondPassword] =
    useState(false);

  const isErrorPassword = password === "" && submitClickedPassword;
  const isErrorSecondPassword =
    password !== secondPassword && submitClickedSecondPassword;

  const handlePasswordChange = (e: any) => {
    setSubmitClickedPassword(false);
    setSubmitClickedSecondPassword(false);
    const value = e.target.value;
    setPassword(value);
  };

  const handlePSecondasswordChange = (e: any) => {
    setSubmitClickedSecondPassword(false);
    const value = e.target.value;
    setSecondPassword(value);
  };

  const handleSubmit = () => {
    console.log("PASSWORD: ", password);
    console.log("SECOND PASSWORD: ", secondPassword);

    setSubmitClickedPassword(true);
    setSubmitClickedSecondPassword(true);

    axios
      .post("http://localhost:3001/auth/save-new-password", {
        newPassword: password,
        id,
        token,
      })
      .then((response) => {
        setPassword("");
        setSecondPassword("");
        navigate("/log-in");
        toast({
          title: "Success",
          description: "Your password has been reset!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description:
            "Unable to reset password. Please start the reset password process again!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box>
      <Heading textAlign="center" mb={4}>
        Reset Your Password
      </Heading>
      <Box
        maxW="75%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 auto"
        gap={4}
      >
        <FormControl isInvalid={isErrorPassword} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            size="lg"
            value={password}
            onChange={handlePasswordChange}
          />
          {!isErrorPassword ? null : (
            <FormErrorMessage>This field is required</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={isErrorSecondPassword} isRequired>
          <FormLabel>Re-enter password</FormLabel>
          <Input
            type="password"
            size="lg"
            value={secondPassword}
            onChange={handlePSecondasswordChange}
          />
          {!isErrorSecondPassword ? null : (
            <FormErrorMessage>Passwords must match</FormErrorMessage>
          )}
        </FormControl>

        <Button w="100%" size="lg" onClick={handleSubmit}>
          SUBMIT
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
