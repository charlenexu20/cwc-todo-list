import { Box, IconButton, Text } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

type Props = {
  field: string;
  value: string;
};

const UserDetailsRow = ({ field, value }: Props) => {
  return (
    <Box display="flex" lineHeight="32px">
      <Text flex={0.5}>{field}:</Text>
      <Text flex={1}>{value}</Text>
      <IconButton aria-label="Edit Name" icon={<EditIcon />} size="sm" />
    </Box>
  );
};

export default UserDetailsRow;
