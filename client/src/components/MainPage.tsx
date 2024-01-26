import React from 'react';
import { Box, Heading, Container, Text } from '@chakra-ui/react';

const MainPage: React.FC = () => {
  return (
    <Box>
      {/* Navigation Bar */}
      <Box bg="teal.500" p={4} color="white">
        <Container maxW="container.xl">
          <Heading as="h1" size="xl">
            Charlene's Todo List App
          </Heading>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" mt={8}>
        <Heading as="h2" size="lg" mb={4}>
          Welcome to my Todo List!
        </Heading>
        <Text fontSize="xl">
          This is the main page content.
        </Text>
      </Container>
    </Box>
  );
};

export default MainPage;
