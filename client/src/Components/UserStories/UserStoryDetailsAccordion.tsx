import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import CreateTaskAccordion from "../Tasks/CreateTaskAccordion";
import { useState } from "react";

type Props = {
  name: string;
  status: string;
  description: string;
  projectId: number;
  featureId: number;
  userStoryId: number;
  tasks: Task[];
};

export type Task = {
  name: string;
  status: string;
};

const UserStoryDetailsAccordion = ({
  name,
  status,
  description,
  projectId,
  featureId,
  userStoryId,
  tasks,
}: Props) => {
  const [devTasks, setDevTasks] = useState(tasks);

  return (
    <Accordion allowToggle>
      <AccordionItem border="1px">
        <h2>
          <AccordionButton display="flex" justifyContent="space-between" p={4}>
            <Text flex={1} textAlign="left">
              {name}
            </Text>
            <Text>{status}</Text>
            <AccordionIcon />
          </AccordionButton>
        </h2>

        {/*
          The code will only attempt to map over devTasks if it exists and has at least one element. If devTasks is empty or undefined, it will render a message indicating that no tasks are available, avoiding the error.
        */}
        <AccordionPanel borderTop="1px" p={0}>
          <Box p={4}>{description}</Box>
          {devTasks && devTasks.length > 0 ? (
            devTasks.map((task) => (
              <Box
                display="flex"
                justifyContent="space-between"
                borderTop="1px"
                alignItems="center"
                px={4}
                py={1}
              >
                <Text>{task.name}</Text>
                <Button>{task.status}</Button>
              </Box>
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
            setDevTasks={setDevTasks}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default UserStoryDetailsAccordion;
