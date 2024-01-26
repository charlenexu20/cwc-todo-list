import React from 'react';
import { Box, Link, Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <Flex bg="teal.500" p={4} color="white" justify="space-around">
      {/* Include navigation links */}
      <Box>
        <Link
          as={RouterLink}
          to="/"
          fontSize="xl"
          _hover={{ textDecoration: 'none', color: 'teal.300' }}
        >
          Home
        </Link>
      </Box>
      <Box>
        <Link
          as={RouterLink}
          to="/users/new"
          fontSize="xl"
          _hover={{ textDecoration: 'none', color: 'teal.300' }}
        >
          User Form
        </Link>
      </Box>
      <Box>
        <Link
          as={RouterLink}
          to="/users"
          fontSize="xl"
          _hover={{ textDecoration: 'none', color: 'teal.300' }}
        >
          User List
        </Link>
      </Box>
    </Flex>
  );
};

export default Navigation;
