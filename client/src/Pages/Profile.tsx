import { Avatar, Box, Button, Heading, Text, useToast } from "@chakra-ui/react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import UserDetailsRow from "../components/Profile/UserDetailsRow";

type Data = {
  name: string;
  email: string;
  username: string;
};

const Profile = () => {
  const data = useLoaderData() as Data;
  const navigate = useNavigate();
  const toast = useToast();
  const context = useOutletContext() as Context;

  console.log("PROFILE DATA: ", data);

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
      <Heading textAlign="center" mb={4}>
        Account Details
      </Heading>
      <Text textAlign="center">
        Hello, {data.name}! You can manage your account details.
      </Text>
      <Box display="flex" gap={20} w="60%" py={20} m="0 auto">
        {/* User photo */}
        <Box display="flex" alignItems="center">
          <Avatar bg="blue.200" size="2xl" name={data.name} />
        </Box>
        {/* User account details */}
        <Box display="flex" flexDirection="column" w="100%" gap={4}>
          <UserDetailsRow field="Name" value={data.name} />
          <UserDetailsRow field="Email" value={data.email} />
          <UserDetailsRow field="Username" value={data.username} />
          <UserDetailsRow field="Password" value="********" />
        </Box>
      </Box>
      <Box display="flex" gap={4} justifyContent="center">
        <Button onClick={logOut} size="lg">
          Logout
        </Button>
        <Button onClick={() => {}} size="lg">
          Delete Account
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
