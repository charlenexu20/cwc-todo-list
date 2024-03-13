import { Box } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

const Project = () => {
  const data = useLoaderData();

  console.log("data: ", data);
  return <Box>Project Page</Box>;
};

export default Project;
