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
import { CheckIcon, EditIcon } from "@chakra-ui/icons";

type Props = {
  task: Task;
  setStoryStatus: React.Dispatch<React.SetStateAction<string>>;
};

const TaskBox = ({ task, setStoryStatus }: Props) => {
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

  return (
    <Box
      key={task.name}
      display="flex"
      justifyContent="space-between"
      borderTop="1px"
      alignItems="center"
      px={4}
      py={2}
      gap={4}
    >
      <Box flex={1}>
        {updateName ? (
          <Input
            flex={1}
            h="40px"
            value={taskName}
            onChange={handleNameChange}
            type="text"
          />
        ) : (
          <Text flex={1}>{task.name}</Text>
        )}
      </Box>
      <IconButton
        aria-label="Edit Name"
        icon={updateName ? <CheckIcon /> : <EditIcon />}
        size="md"
        onClick={
          updateName
            ? () => {
                updateTask("name", taskName);
              }
            : handleEditClick
        }
      />

      <Button w="118px" onClick={toggleTaskStatus}>
        {taskStatus}
      </Button>
    </Box>
  );
};

export default TaskBox;
