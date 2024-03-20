import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import UserStoryDetailsAccordion from "../UserStories/UserStoryDetailsAccordion";
import CreateUserStoryAccordion from "../UserStories/CreateUserStoryAccordion";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  featureDescription: string;
  featureId: number;
};

export type UserStory = {
  name: string;
  description: string;
  status: string;
};

const sampleUserStories = [
  {
    name: "User Story",
    description: " This is my user story description.",
    status: "0/10",
  },
  {
    name: "User Story",
    description: " This is my user story description.",
    status: "2/10",
  },
  {
    name: "User Story",
    description: " This is my user story description.",
    status: "4/10",
  },
  {
    name: "User Story",
    description: " This is my user story description.",
    status: "6/10",
  },
  {
    name: "User Story",
    description: " This is my user story description.",
    status: "8/10",
  },
];

const FeatureModal = ({
  isOpen,
  onClose,
  featureName,
  featureDescription,
  featureId,
}: Props) => {
  const [userStories, setUserStories] = useState(sampleUserStories);

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent minW="75%" minH="75%">
        <Box m={10}>
          <Box mb={20}>
            <Text mb={4} fontSize={20}>
              {featureName}
            </Text>
            <Text>{featureDescription}</Text>
          </Box>
          <ModalCloseButton />
          <Box display="flex" flexDirection="column" gap={4}>
            {sampleUserStories.map((story, index) => {
              return (
                <UserStoryDetailsAccordion
                  name={`${story.name} ${index + 1}`}
                  status={story.status}
                  description={`${story.description} ${index + 1}`}
                />
              );
            })}
            <CreateUserStoryAccordion
              userStories={userStories}
              setUserStories={setUserStories}
              featureId={featureId}
            />
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default FeatureModal;
