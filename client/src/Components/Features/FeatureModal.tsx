import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import UserStoryDetailsAccordion, {
  Task,
} from "../UserStories/UserStoryDetailsAccordion";
import CreateUserStoryAccordion from "../UserStories/CreateUserStoryAccordion";
import { Project } from "../../pages/Projects";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  featureDescription: string;
  featureId: number;
  projectId: number;
  stories: UserStory[];
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};

export type UserStory = {
  name: string;
  description: string;
  id: number;
  tasks: Task[];
  completedTasks: number;
  taskCount: number;
};

const FeatureModal = ({
  isOpen,
  onClose,
  featureName,
  featureDescription,
  featureId,
  projectId,
  stories,
  setProject,
}: Props) => {
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
            {stories.map((story) => {
              return (
                <UserStoryDetailsAccordion
                  key={story.id}
                  name={story.name}
                  status={`${story.completedTasks}/${story.taskCount}`}
                  description={story.description}
                  projectId={projectId}
                  featureId={featureId}
                  userStoryId={story.id}
                  tasks={story.tasks}
                  setProject={setProject}
                />
              );
            })}
            <CreateUserStoryAccordion
              featureId={featureId}
              projectId={projectId}
              setProject={setProject}
            />
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default FeatureModal;
