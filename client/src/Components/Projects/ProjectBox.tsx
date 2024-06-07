import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../pages/Projects";

type Props = {
  project: Project;
};

const ProjectBox = ({ project }: Props) => {
  const navigate = useNavigate();

  const goToProject = (id: number) => {
    navigate(`/project/${id}`);
  };

  return (
    <Box
      key={project.id}
      display="flex"
      p={4}
      mb={6}
      layerStyle="boxButton"
      onClick={() => {
        goToProject(project.id);
      }}
    >
      <Text w="15%">{project.name}</Text>
      <Text noOfLines={1} flex={1}>
        {project.description}
      </Text>
      <Text w="15%" ml={10}>
        {project.status}
      </Text>
    </Box>
  );
};

export default ProjectBox;
