import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../App";

const Profile = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const toast = useToast();
  const context = useOutletContext() as Context;

  const logOut = () => {
    localStorage.removeItem("token");
    context.toggleLoggedIn();
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
