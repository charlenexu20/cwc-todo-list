import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Divider } from '@chakra-ui/react';
import axios from 'axios';

// Define a type for a user
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
  }

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the list of users from your backend (NestJS API) using Axios
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box maxW="400px" m="auto" p="4" paddingTop="20">
      {users.length === 0 ? (
        <Text>No users found.</Text>
      ) : (
        <VStack align="stretch" spacing={2}>
          {users.map((user, index) => (
            <Box key={user.id} borderWidth="1px" borderRadius="lg" p="4" boxShadow="md" borderColor={"teal.500"}>
              <Text fontSize="lg" fontWeight="bold">
                {index + 1}. {user.name}
              </Text>
              <Divider my="2" />
              <Text>
                <strong>Username:</strong> {user.username}
              </Text>
              <Text>
                <strong>Email:</strong> {user.email}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default UserList;
