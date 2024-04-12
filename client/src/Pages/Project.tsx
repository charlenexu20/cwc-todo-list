import {
  Box,
  Button,
  Heading,
  IconButton,
  Input,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Project as ProjectType } from "./Projects";
import { useState } from "react";
import { UserStory } from "../components/Features/FeatureModal";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import DeleteModal from "../components/DeleteModal";
import StatusColumn, { Column } from "../components/Project/StatusColumn";

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

  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [project, setProject] = useState(loaderData);
  const [projectName, setProjectName] = useState(project.name);
  const [projectDescription, setProjecDescription] = useState(
    project.description,
  );
  const [updateProjectName, setUpdateProjectName] = useState(false);
  const [updateProjectDescription, setUpdateProjectDescription] =
    useState(false);

  const onChangeName = (e: any) => {
    setProjectName(e.target.value);
  };

  const onChangeDescription = (e: any) => {
    setProjecDescription(e.target.value);
  };

  const onClickEditName = () => {
    setUpdateProjectName(!updateProjectName);
  };

  const onClickEditDescription = () => {
    setUpdateProjectDescription(!updateProjectDescription);
  };

  const updateProject = (
    field: "name" | "description",
    value: string | undefined,
  ) => {
    // Data validation of story name
    if (projectName === "") {
      toast({
        title: "Error",
        description: "Field can't be blank!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setProjectName(project.name);
      return;
    }

    const token = localStorage.getItem("token");

    // If the data is valid, we're going to get the token and send a request to update story
    axios
      .post(
        "http://localhost:3001/auth/update-project",
        {
          field,
          value,
          projectId: project.id,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((response) => {
        setProject(response.data);
        setUpdateProjectName(false);
        setUpdateProjectDescription(false);

        toast({
          title: "Success",
          description: `Your project ${field} has been updated!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
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
            description: `There was an error updating your project ${field}. Please try again.`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  const deleteProject = () => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:3001/auth/delete-project",
        {
          projectId: project.id,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((response) => {
        navigate("/projects");

        toast({
          title: "Success",
          description: `Your project has been deleted!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
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
            description: `There was an error deleting your project. Please try again.`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <Box mx={10} mt={20}>
      <Box mb={20} display="flex" justifyContent="space-between">
        <Box flex={1}>
          <Box display="flex" alignItems="center" mb={4}>
            {updateProjectName ? (
              <Box flex={1} mr={4}>
                <Input
                  h="40px"
                  value={projectName}
                  onChange={onChangeName}
                  type="text"
                  layerStyle="text"
                />
              </Box>
            ) : (
              <Heading mr={4} fontSize={28}>
                {project.name}
              </Heading>
            )}
            <IconButton
              mr={4}
              aria-label="Edit Name"
              icon={updateProjectName ? <CheckIcon /> : <EditIcon />}
              size="md"
              bgColor="transparent"
              color="#001858"
              _hover={{ bgColor: "#aa96b1", color: "#fffffe" }}
              onClick={
                updateProjectName
                  ? () => {
                      updateProject("name", projectName);
                    }
                  : onClickEditName
              }
            />
          </Box>
          <Box display="flex" alignItems="center">
            {updateProjectDescription ? (
              <Box flex={1} mr={4}>
                <Textarea
                  h="40px"
                  value={projectDescription}
                  onChange={onChangeDescription}
                  layerStyle="text"
                />
              </Box>
            ) : (
              <Text mr={4}>
                {project.description || "No description provided"}
              </Text>
            )}
            <IconButton
              mr={4}
              aria-label="Edit Description"
              icon={updateProjectDescription ? <CheckIcon /> : <EditIcon />}
              size="md"
              bgColor="transparent"
              color="#001858"
              _hover={{ bgColor: "#aa96b1", color: "#fffffe" }}
              onClick={
                updateProjectDescription
                  ? () => {
                      updateProject("description", projectDescription);
                    }
                  : onClickEditDescription
              }
            />
          </Box>
        </Box>
        <Button onClick={onOpen} variant="delete-btn" size="md">
          Delete Project
        </Button>
      </Box>
      <Box display="flex" gap={10}>
        {columns.map((column: Column) => {
          return (
            <StatusColumn
              column={column}
              project={project}
              setProject={setProject}
            />
          );
        })}
      </Box>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        itemType={"project"}
        deleteItem={deleteProject}
      />
    </Box>
  );
};

export default Project;
