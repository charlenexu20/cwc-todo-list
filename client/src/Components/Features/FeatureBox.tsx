import { Box, Text, useDisclosure } from "@chakra-ui/react";
import { Feature } from "../../pages/Project";
import FeatureModal from "./FeatureModal";
import { Project } from "../../pages/Projects";

type Props = {
  feature: Feature;
  projectId: number;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};

const FeatureBox = ({ feature, projectId, setProject }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        border="1px"
        p={4}
        mt={4}
        mx={4}
        onClick={onOpen}
        _hover={{ cursor: "pointer", bgColor: "blackAlpha.200" }}
        key={feature.id}
      >
        <Text>{feature.name}</Text>
        <Text>
          {feature.completedUserStories} / {feature.userStoryCount}
        </Text>
      </Box>
      <FeatureModal
        isOpen={isOpen}
        onClose={onClose}
        featureName={feature.name}
        featureDescription={feature.description || "There is no description..."}
        featureId={feature.id}
        projectId={projectId}
        stories={feature.userStories}
        setProject={setProject}
      />
    </>
  );
};

export default FeatureBox;
