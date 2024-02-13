import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";

const Profile = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const toast = useToast();
  console.log("LOADER DATA: ", data);

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/log-in");
    toast({
      title: "Success",
      description: "You have been successfully logged out.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <Box>
      <Heading textAlign="center">Account Details</Heading>
      <Button onClick={logOut}>Log out</Button>
    </Box>
  );
};

export default Profile;
