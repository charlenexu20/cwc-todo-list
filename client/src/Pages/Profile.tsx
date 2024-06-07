import { Avatar, Box, Button, Heading, Text, useToast } from "@chakra-ui/react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import UserDetailsRow from "../components/Profile/UserDetailsRow";
import { useState } from "react";
import axios from "axios";

export type Data = {
  name: string;
  email: string;
  username: string;
};

const Profile = () => {
  const loaderData = useLoaderData() as Data;
  const [data, setData] = useState(loaderData);
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

  const deleteAccount = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:3001/auth/delete-user",
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((response) => {
        localStorage.removeItem("token");
        navigate("/sign-up");
        console.log("RESPONSE: ", response.data);
        toast({
          title: "Success",
          description:
            "Your account has been deleted. We're sorry to see you go!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        toast({
          title: "Error",
          description: "Failed to delete account. Please try again later!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box mt={20}>
      <Heading textAlign="center" mb={4} fontSize={28}>
        Account Details
      </Heading>
      <Text textAlign="center">
        Hello, {data.name}! You can manage your account details here.
      </Text>
      <Box display="flex" gap={10} w="60%" py={20} m="0 auto">
        {/* User photo */}
        <Box display="flex" alignItems="center">
          <Avatar bg="#f0f1ca" size="2xl" name={data.name} />
        </Box>
        {/* User account details */}
        <Box display="flex" flexDirection="column" w="100%" gap={4}>
          <UserDetailsRow
            field="Name"
            value={data.name}
            username={data.username}
            setData={setData}
          />
          <UserDetailsRow
            field="Email"
            value={data.email}
            username={data.username}
            setData={setData}
          />
          <UserDetailsRow
            field="Username"
            value={data.username}
            username={data.username}
            setData={setData}
          />
          <UserDetailsRow
            field="Password"
            value="********"
            username={data.username}
            setData={setData}
          />
        </Box>
      </Box>
      <Box display="flex" gap={4} justifyContent="center">
        <Button onClick={logOut} size="lg" variant="action-button">
          Logout
        </Button>
        <Button onClick={deleteAccount} size="lg" variant="action-button">
          Delete Account
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
