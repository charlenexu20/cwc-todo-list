import React, { useState } from 'react';
import axios from 'axios';
import {  Box, Button, FormControl, FormLabel, Input} from '@chakra-ui/react';

const UserForm: React.FC = () => {
    const [formData, setFormData] = useState({
      name: '',
      username: '',
      email: '',
      password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          // Send the form data to your backend (NestJS API) using Axios
          const response = await axios.post('http://localhost:3001/users', formData);

          if (response.status === 201) {
            console.log('User created successfully!');
            // Optionally, reset the form or perform other actions
            setFormData({
              name: '',
              username: '',
              email: '',
              password: '',
            });
          } else {
            console.error('Failed to create user.');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };

  return (
    <Box maxW="400px" m="auto" p="4" paddingTop="20">
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Username</FormLabel>
          <Input type="text" name="username" value={formData.username} onChange={handleChange} />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" value={formData.password} onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Submit
        </Button>
      </form>
    </Box>
  );
};


export default UserForm;
