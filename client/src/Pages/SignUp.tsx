import { Box, Button, Heading, Input } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e: any) => {
    const value = e.target.value;
    console.log(value);
    setName(value);
  };

  const handleEmailChange = (e: any) => {
    const value = e.target.value;
    console.log(value);
    setEmail(value);
  };

  const handleUsernameChange = (e: any) => {
    const value = e.target.value;
    console.log(value);
    setUsername(value);
  };

  const handlePasswordChange = (e: any) => {
    const value = e.target.value;
    console.log(value);
    setPassword(value);
  };

  const handleSubmit = () => {
    axios.post("http://localhost:3001/auth/sign-up", {
      name,
      email,
      username,
      password,
    })
    .then((response) => {
      console.log("RESPONSE", response);
    });
  };

  return (
  <Box>
    <Heading textAlign="center">Create an account</Heading>
    <Box maxW="75%" m="0 auto" mt={4}>
      <Box display="flex" flexDirection="column" gap={3}>
        <Input placeholder="NAME" type="text" onChange={handleNameChange}/>
        <Input placeholder="EMAIL" type="email" onChange={handleEmailChange} />
        <Input placeholder="USERNAME" type="text" onChange={handleUsernameChange} />
        <Input placeholder="PASSWORD" type="password" onChange={handlePasswordChange} />
      </Box>
      <Button w="100%" onClick={handleSubmit}>SIGN UP</Button>
    </Box>
  </Box>
  );
}

export default SignUp;
