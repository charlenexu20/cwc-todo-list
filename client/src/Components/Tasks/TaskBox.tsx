import {
  Box,
  Button,
  IconButton,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Task } from "../UserStories/UserStoryDetailsAccordion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

type Props = {
  task: Task;
  setStoryStatus: React.Dispatch<React.SetStateAction<string>>;
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskBox = ({ task, setStoryStatus, setTaskList }: Props) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [taskStatus, setTaskStatus] = useState(task.status);
  const [taskName, setTaskName] = useState(task.name);
  const [updateName, setUpdateName] = useState(false);

  const handleNameChange = (e: any) => {
    setTaskName(e.target.value);
  };

  const handleEditClick = () => {
    setUpdateName(!updateName);
  };

  const updateTask = (field: "status" | "name", value: string) => {
    if (taskName === "") {
      toast({
        title: "Error",
        description: "Field can't be blank!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setTaskName(task.name);
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:3001/auth/update-task",
        {
          field,
          value,
          taskId: task.id,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((response) => {
        setStoryStatus(response.data);
        setUpdateName(false);

        toast({
          title: "Success",
          description: `Your task ${field} has been updated!`,
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
            description: `There was an error updating your task ${field}. Please try again.`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  const toggleTaskStatus = () => {
    if (taskStatus === "To Do") {
      setTaskStatus("In Progress");
      updateTask("status", "In Progress");
    } else if (taskStatus === "In Progress") {
      setTaskStatus("Done");
      updateTask("status", "Done");
    } else {
      setTaskStatus("To Do");
      updateTask("status", "To Do");
    }
  };

  const deleteTask = () => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:3001/auth/delete-task",
        {
          taskId: task.id,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((response) => {
        setStoryStatus(response.data.storyStatus);
        setTaskList(response.data.taskList);

        toast({
          title: "Success",
          description: `Your task has been deleted!`,
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
            description: `There was an error deleting your task. Please try again.`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <Box
      key={task.name}
      display="flex"
      justifyContent="space-between"
      border="1px solid #172c66"
      borderRadius="md"
      backgroundColor="#fffffe"
      boxShadow="md"
      alignItems="center"
      p={4}
      gap={4}
      h="58px"
    >
      <Box flex={1}>
        {updateName ? (
          <Input
            flex={1}
            h="40px"
            value={taskName}
            onChange={handleNameChange}
            type="text"
            layerStyle="text"
          />
        ) : (
          <Text flex={1}>{task.name}</Text>
        )}
      </Box>
      <IconButton
        aria-label="Edit Name"
        icon={updateName ? <CheckIcon /> : <EditIcon />}
        size="md"
        colorScheme="brand"
        color="#001858"
        onClick={
          updateName
            ? () => {
                updateTask("name", taskName);
              }
            : handleEditClick
        }
      />

      <Button
        w="118px"
        onClick={toggleTaskStatus}
        colorScheme="brand"
        color="#001858"
        size="md"
      >
        {taskStatus}
      </Button>

      <IconButton
        aria-label="Delete Task"
        icon={<DeleteIcon />}
        size="md"
        colorScheme="brand"
        color="#001858"
        onClick={deleteTask}
      />
    </Box>
  );
};

export default TaskBox;
