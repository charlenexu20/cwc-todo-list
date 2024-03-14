import { Box, Heading, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { Project as ProjectType } from "./Projects";

// DEMO DATA
const columns = [{ name: "To Do" }, { name: "In Progress" }, { name: "Done" }];

const features = [
  {
    name: "Feature A",
    status: "To Do",
    userStoryCount: 10,
    completedUserStories: 0,
  },
  {
    name: "Feature B",
    status: "In Progress",
    userStoryCount: 6,
    completedUserStories: 2,
  },
  {
    name: "Feature C",
    status: "Done",
    userStoryCount: 10,
    completedUserStories: 10,
  },
  {
    name: "Feature D",
    status: "To Do",
    userStoryCount: 10,
    completedUserStories: 0,
  },
  {
    name: "Feature E",
    status: "In Progress",
    userStoryCount: 10,
    completedUserStories: 2,
  },
  {
    name: "Feature F",
    status: "Done",
    userStoryCount: 5,
    completedUserStories: 5,
  },
  {
    name: "Feature G",
    status: "To Do",
    userStoryCount: 10,
    completedUserStories: 0,
  },
  {
    name: "Feature H",
    status: "In Progress",
    userStoryCount: 8,
    completedUserStories: 4,
  },
  {
    name: "Feature I",
    status: "Done",
    userStoryCount: 6,
    completedUserStories: 6,
  },
];

const Project = () => {
  const data = useLoaderData() as ProjectType[];
  const project = data[0];

  return (
    <Box m={10}>
      <Box mb={20}>
        <Heading mb={4}>{project.name}</Heading>
        <Text>{project.description || "No description provided"}</Text>
      </Box>
      <Box display="flex" gap={10}>
        {columns.map((column) => {
          return (
            <Box border="1px" flex={1} pt={4}>
              <Text textAlign="center" fontSize={20}>
                {column.name}
              </Text>
              {features.map((feature) => {
                if (column.name === feature.status) {
                  return (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      border="1px"
                      p={4}
                      m={4}
                    >
                      <Text>{feature.name}</Text>
                      <Text>
                        {feature.completedUserStories} /{" "}
                        {feature.userStoryCount}
                      </Text>
                    </Box>
                  );
                }
              })}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Project;
