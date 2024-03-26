import { Box, IconButton, Input, Text, useToast } from "@chakra-ui/react";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";
import { isInvalidEmail, isInvalidPassword } from "../../pages/SignUp";
import { Data } from "../../pages/Profile";

type Props = {
  field: string;
  value: string;
  username: string;
  setData: React.Dispatch<React.SetStateAction<Data>>;
};

const UserDetailsRow = ({ field, value, username, setData }: Props) => {
  const toast = useToast();

  const [updateField, setUpdateField] = useState(false);
  const [valueState, setValueState] = useState(value);

  const handleValueChange = (e: any) => {
    setValueState(e.target.value);
  };

  const handleEditClick = () => {
    setUpdateField(!updateField);
  };

  const handleCheckClick = () => {
    if (field === "Email" && valueState !== "") {
      const invalidEmail = isInvalidEmail(valueState);
      if (invalidEmail) {
        toast({
          title: "Error",
          description: "Please enter a valid email!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setValueState(value);
        return;
      }
    } else if (field === "Password" && valueState !== "") {
      const invalidPassword = isInvalidPassword(valueState);
      if (invalidPassword) {
        toast({
          title: "Error",
          description: (
            <Box>
              <Box>Password must meet the following criteria:</Box>
              <Box>- At least 8 characters long</Box>
              <Box>- Include at least one lowercase letter</Box>
              <Box>- Include at least one number</Box>
              <Box>- Include at least one symbol (such as !, @, #, etc.)</Box>
            </Box>
          ),
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    } else {
      if (valueState === "") {
        toast({
          title: "Error",
          description: "Field can't be blank!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        if (field !== "Password") {
          setValueState(value);
        }
        return;
      }
    }

    const token = localStorage.getItem("token");

    setUpdateField(!updateField);

    axios
      .post(
        "http://localhost:3001/auth/change-account-detail",
        {
          username,
          field: field.toLowerCase(),
          value: valueState,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((response) => {
        setData(response.data);
        toast({
          title: "Success",
          description: "Your account details have been updated!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description:
            "There was an error. Please review your values and try again!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box display="flex" gap={2}>
      <Text flex={0.5} lineHeight="32px">
        {field}:
      </Text>
      {updateField ? (
        <Input
          flex={1}
          h="32px"
          value={valueState}
          onChange={handleValueChange}
          type={field === "Password" ? "password" : "text"}
        />
      ) : (
        <Text flex={1} lineHeight="32px">
          {field === "Password" ? "********" : valueState}
        </Text>
      )}
      <IconButton
        aria-label="Edit Name"
        icon={updateField ? <CheckIcon /> : <EditIcon />}
        size="sm"
        onClick={updateField ? handleCheckClick : handleEditClick}
      />
    </Box>
  );
};

export default UserDetailsRow;
