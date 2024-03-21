import { Box, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { Project as ProjectType } from "./Projects";
import CreateFeatureAccordion from "../components/Features/CreateFeatureAccordion";
import { useState } from "react";
import FeatureModal, { UserStory } from "../components/Features/FeatureModal";

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
  const data = useLoaderData() as ProjectType[];
  const project = data[0];

  const [features, setFeatures] = useState<Feature[]>(project.features);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedFeature, setSelectedFeature] = useState(
    features.length > 0 ? features[0] : null,
  );

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
                      mt={4}
                      mx={4}
                      onClick={() => {
                        onOpen();
                        setSelectedFeature(feature);
                      }}
                      _hover={{ cursor: "pointer", bgColor: "blackAlpha.200" }}
                    >
                      <Text>{feature.name}</Text>
                      <Text>
                        {feature.completedUserStories} /{" "}
                        {feature.userStoryCount}
                      </Text>
                    </Box>
                  );
                } else {
                  return null;
                }
              })}
              <Box p={4}>
                {column.name === "To Do" && (
                  <CreateFeatureAccordion
                    features={features}
                    setFeatures={setFeatures}
                    projectId={project.id}
                  />
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
      {selectedFeature && (
        <FeatureModal
          isOpen={isOpen}
          onClose={onClose}
          featureName={selectedFeature.name}
          featureDescription={
            selectedFeature.description || "There is no description..."
          }
          featureId={selectedFeature.id}
          projectId={project.id}
          stories={selectedFeature.userStories}
        />
      )}
    </Box>
  );
};

export default Project;
