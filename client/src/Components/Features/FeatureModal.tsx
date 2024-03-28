import {
  Box,
  IconButton,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import UserStoryDetailsAccordion, {
  Task,
} from "../UserStories/UserStoryDetailsAccordion";
import CreateUserStoryAccordion from "../UserStories/CreateUserStoryAccordion";
import { Project } from "../../pages/Projects";
import { useState } from "react";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState(featureName);
  const [updateFeatureName, setUpdateFeatureName] = useState(false);
  const [description, setDescription] = useState(featureDescription);
  const [updateFeatureDescription, setUpdateFeatureDescription] =
    useState(false);

  const onChangeName = (e: any) => {
    setName(e.target.value);
  };

  const onChangeDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const onClickEditName = () => {
    setUpdateFeatureName(!updateFeatureName);
  };

  const onClickEditDescription = () => {
    setUpdateFeatureDescription(!updateFeatureDescription);
  };

  const updateFeature = (field: "name" | "description", value: string) => {
    // Data validation of story name
    if (name === "") {
      toast({
        title: "Error",
        description: "Field can't be blank!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setName(featureName);
      return;
    }

    const token = localStorage.getItem("token");

    // If the data is valid, we're going to get the token and send a request to update story
    axios
      .post(
        "http://localhost:3001/auth/update-feature",
        {
          field,
          value,
          featureId,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((response) => {
        setProject(response.data);
        setUpdateFeatureName(false);
        setUpdateFeatureDescription(false);

        toast({
          title: "Success",
          description: `Your feature ${field} has been updated!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        // Add error handling if error is token expired
        if (error.response.data.message === "Unauthorized") {
          toast({
            title: "Error",
            description: "Your session has expired, please log in again!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          navigate("/log-in");
        } else {
          toast({
            title: "Error",
            description: `There was an error updating your feature ${field}. Please try again.`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent minW="75%" minH="75%">
        <Box m={10}>
          <Box mb={20}>
            <Box display="flex" alignItems="center" mb={4}>
              {updateFeatureName ? (
                <Box flex={1} mr={4}>
                  <Input
                    h="40px"
                    value={name}
                    onChange={onChangeName}
                    type="text"
                  />
                </Box>
              ) : (
                <Text fontSize={20} mr={4}>
                  {featureName}
                </Text>
              )}
              <IconButton
                mr={4}
                aria-label="Edit Name"
                icon={updateFeatureName ? <CheckIcon /> : <EditIcon />}
                size="md"
                onClick={
                  updateFeatureName
                    ? () => {
                        updateFeature("name", name);
                      }
                    : onClickEditName
                }
              />
            </Box>

            <Box display="flex" alignItems="center">
              {updateFeatureDescription ? (
                <Box flex={1} mr={4}>
                  <Textarea
                    h="40px"
                    value={description}
                    onChange={onChangeDescription}
                  />
                </Box>
              ) : (
                <Text mr={4}>{featureDescription}</Text>
              )}
              <IconButton
                mr={4}
                aria-label="Edit Description"
                icon={updateFeatureDescription ? <CheckIcon /> : <EditIcon />}
                size="md"
                onClick={
                  updateFeatureDescription
                    ? () => {
                        updateFeature("description", description);
                      }
                    : onClickEditDescription
                }
              />
            </Box>
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
