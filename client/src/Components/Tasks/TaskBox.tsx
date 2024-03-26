import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { Task } from "../UserStories/UserStoryDetailsAccordion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Project } from "../../pages/Projects";

type Props = {
  task: Task;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};

const TaskBox = ({ task, setProject }: Props) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [taskStatus, setTaskStatus] = useState(task.status);

  const updateTask = (field: "status" | "name", value: string) => {
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
        console.log("RESPONSE: ", response.data);
        setProject(response.data);

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
      py={1}
    >
      <Text>{task.name}</Text>
      <Button onClick={toggleTaskStatus}>{taskStatus}</Button>
    </Box>
  );
};

export default TaskBox;
