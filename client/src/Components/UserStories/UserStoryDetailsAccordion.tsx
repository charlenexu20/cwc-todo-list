import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
  Box,
  Input,
  IconButton,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import CreateTaskAccordion from "../Tasks/CreateTaskAccordion";
import { Project } from "../../pages/Projects";
import TaskBox from "../Tasks/TaskBox";
import { useState } from "react";
import { CheckIcon, ChevronDownIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
  name: string;
  status: string;
  description: string;
  projectId: number;
  featureId: number;
  userStoryId: number;
  tasks: Task[];
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};

export type Task = {
  name: string;
  status: string;
  id: number;
};

const UserStoryDetailsAccordion = ({
  name,
  status,
  description,
  projectId,
  featureId,
  userStoryId,
  tasks,
  setProject,
}: Props) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [storyStatus, setStoryStatus] = useState(status);
  const [updateStoryName, setUpdateStoryName] = useState(false);
  const [storyName, setStoryName] = useState(name);
  const [updateStoryDescription, setUpdateStoryDescription] = useState(false);
  const [storyDescription, setStoryDescription] = useState(description);

  const onChangeName = (e: any) => {
    setStoryName(e.target.value);
  };

  const onChangeDescription = (e: any) => {
    setStoryDescription(e.target.value);
  };

  const onClickEditName = () => {
    setUpdateStoryName(!updateStoryName);
  };

  const onClickEditDescription = () => {
    setUpdateStoryDescription(!updateStoryDescription);
  };

  const updateStory = (field: "name" | "description", value: string) => {
    // Data validation of story name
    if (storyName === "") {
      toast({
        title: "Error",
        description: "Field can't be blank!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setStoryName(name);
      return;
    }

    const token = localStorage.getItem("token");

    // If the data is valid, we're going to get the token and send a request to update story
    axios
      .post(
        "http://localhost:3001/auth/update-user-story",
        {
          field,
          value,
          userStoryId,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((response) => {
        setProject(response.data);
        setUpdateStoryName(false);
        setUpdateStoryDescription(false);

        toast({
          title: "Success",
          description: `Your user story ${field} has been updated!`,
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
            description: `There was an error updating your user story ${field}. Please try again.`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <>
      {updateStoryName ? (
        <Box border="1px" display="flex" p={4} alignItems="center">
          <Box flex={1} mr={4}>
            <Input
              h="40px"
              value={storyName}
              onChange={onChangeName}
              type="text"
            />
          </Box>

          <IconButton
            mr={4}
            aria-label="Edit Name"
            icon={<CheckIcon />}
            size="md"
            onClick={() => {
              updateStory("name", storyName);
            }}
          />
          <Text>{storyStatus}</Text>
          <ChevronDownIcon boxSize={5} />
        </Box>
      ) : (
        <Accordion allowToggle>
          <AccordionItem border="1px">
            <h2>
              <AccordionButton
                display="flex"
                justifyContent="space-between"
                p={4}
              >
                <Text flex={1} textAlign="left">
                  {name}
                </Text>
                <IconButton
                  mr={4}
                  aria-label="Edit Name"
                  icon={<EditIcon />}
                  size="md"
                  onClick={onClickEditName}
                />
                <Text>{storyStatus}</Text>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            {/*
          The code will only attempt to map over devTasks if it exists and has at least one element. If devTasks is empty or undefined, it will render a message indicating that no tasks are available, avoiding the error.
          */}

            <AccordionPanel borderTop="1px" p={0}>
              <Box display="flex" px={4} py={10} alignItems="center">
                {updateStoryDescription ? (
                  <Box flex={1} mr={4}>
                    <Textarea
                      h="40px"
                      value={storyDescription}
                      onChange={onChangeDescription}
                    />
                  </Box>
                ) : (
                  <Box flex={1}>{description}</Box>
                )}
                <IconButton
                  mr={4}
                  aria-label="Edit Description"
                  icon={updateStoryDescription ? <CheckIcon /> : <EditIcon />}
                  size="md"
                  onClick={
                    updateStoryDescription
                      ? () => {
                          updateStory("description", storyDescription);
                        }
                      : onClickEditDescription
                  }
                />
              </Box>

              {tasks && tasks.length > 0 ? (
                tasks.map((task) => (
                  <TaskBox task={task} setStoryStatus={setStoryStatus} />
                ))
              ) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  borderTop="1px"
                  alignItems="center"
                  px={4}
                  py={1}
                >
                  <Text>No tasks available</Text>
                </Box>
              )}
              <CreateTaskAccordion
                featureId={featureId}
                projectId={projectId}
                userStoryId={userStoryId}
                setProject={setProject}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
};

export default UserStoryDetailsAccordion;
