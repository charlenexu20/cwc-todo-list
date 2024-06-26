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
import CreateFeatureAccordion from "../components/Features/CreateFeatureAccordion";
import { useState } from "react";
import { UserStory } from "../components/Features/FeatureModal";
import FeatureBox from "../components/Features/FeatureBox";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import DeleteModal from "../components/DeleteModal";

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
    <Box m={10}>
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
                />
              </Box>
            ) : (
              <Heading mr={4}>{project.name}</Heading>
            )}
            <IconButton
              mr={4}
              aria-label="Edit Name"
              icon={updateProjectName ? <CheckIcon /> : <EditIcon />}
              size="md"
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
        <Button onClick={onOpen}>Delete Project</Button>
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
