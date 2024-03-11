import { Box, Heading, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { Data } from "./Profile";
import CreateProjectAccordion from "../components/Projects/CreateProjectAccordion";
import { useState } from "react";

export type Project = {
  name: string;
  description: string;
  status: string;
};

// demo data
const demoProjects: Project[] = [
  {
    name: "Project A",
    description:
      "This is the description of Project A. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "To Do",
  },
  {
    name: "Project B",
    description:
      "This is the description of Project B. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "To Do",
  },
  {
    name: "Project C",
    description:
      "This is the description of Project C. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
    status: "In Progress",
  },
  {
    name: "Project D",
    description:
      "This is the description of Project D. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
    status: "In Progress",
  },
  {
    name: "Project E",
    description:
      "This is the description of Project E. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "Done",
  },
  {
    name: "Project F",
    description:
      "This is the description of Project F. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "Done",
  },
];

const Projects = () => {
  const data = useLoaderData() as Data;
  const [projects, setProjects] = useState(demoProjects);

  return (
    <Box>
      <Heading textAlign="center" mb={4} fontSize={20}>
        {data.name}'s Projects
      </Heading>
      <Box m={10}>
        {projects.map((project) => {
          return (
            <Box display="flex" border="1px solid" p={4} mb={6}>
              <Text w="15%">{project.name}</Text>
              <Text noOfLines={1} flex={1}>
                {project.description}
              </Text>
              <Text w="15%" ml={10}>
                {project.status}
              </Text>
            </Box>
          );
        })}
        <CreateProjectAccordion projects={projects} setProjects={setProjects} />
      </Box>
    </Box>
  );
};

export default Projects;
