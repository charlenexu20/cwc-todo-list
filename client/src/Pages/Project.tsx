import { Box, Heading, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { Project as ProjectType } from "./Projects";
import CreateFeatureAccordion from "../components/Features/CreateFeatureAccordion";
import { useState } from "react";
import { UserStory } from "../components/Features/FeatureModal";
import FeatureBox from "../components/Features/FeatureBox";

export type Feature = {
  name: string;
  status: "To Do" | "In Progress" | "Done";
  userStoryCount: number;
  completedUserStories: number;
  description?: string;
  id: number;
  userStories: UserStory[];
};

const columns = [{ name: "To Do" }, { name: "In Progress" }, { name: "Done" }];

const Project = () => {
  const loaderData = useLoaderData() as ProjectType;

  const [project, setProject] = useState(loaderData);

  console.log("PROJECT: ", project);

  return (
    <Box m={10}>
      <Box mb={20}>
        <Heading mb={4}>{project.name}</Heading>
        <Text>{project.description || "No description provided"}</Text>
      </Box>
      <Box display="flex" gap={10}>
        {columns.map((column) => {
          return (
            <Box key={column.name} border="1px" flex={1} pt={4}>
              <Text textAlign="center" fontSize={20}>
                {column.name}
              </Text>
              {project.features.map((feature) => {
                if (column.name === feature.status) {
                  return (
                    <FeatureBox
                      key={feature.id}
                      feature={feature}
                      projectId={project.id}
                      setProject={setProject}
                    />
                  );
                } else {
                  return null;
                }
              })}
              <Box p={4}>
                {column.name === "To Do" && (
                  <CreateFeatureAccordion
                    features={project.features}
                    setProject={setProject}
                    projectId={project.id}
                  />
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Project;
