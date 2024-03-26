import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
  Box,
} from "@chakra-ui/react";
import CreateTaskAccordion from "../Tasks/CreateTaskAccordion";
import { Project } from "../../pages/Projects";
import TaskBox from "../Tasks/TaskBox";

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
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => <TaskBox task={task} />)
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
  );
};

export default UserStoryDetailsAccordion;
