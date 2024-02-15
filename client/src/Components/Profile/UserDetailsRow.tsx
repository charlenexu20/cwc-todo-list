import { Box, IconButton, Input, Text } from "@chakra-ui/react";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";

type Props = {
  field: string;
  value: string;
  username: string;
};

const UserDetailsRow = ({ field, value, username }: Props) => {
  const [updateField, setUpdateField] = useState(false);
  const [valueState, setValueState] = useState(value);

  const handleValueChange = (e: any) => {
    setValueState(e.target.value);
  };

  const handleEditClick = () => {
    setUpdateField(!updateField);
  };

  const handleCheckClick = () => {
    const token = localStorage.getItem("token");
    console.log("TOKEN", token);
    console.log("USERNAME", username);

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
        console.log("RESPONSE: ", response.data);
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
