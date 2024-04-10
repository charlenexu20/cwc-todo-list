import { Box, Text } from "@chakra-ui/react";
import FeatureBox from "../Features/FeatureBox";
import CreateFeatureAccordion from "../Features/CreateFeatureAccordion";
import { Project } from "../../pages/Projects";

export type Column = {
  name: string;
};

type Props = {
  column: Column;
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};

const StatusColumn = ({ column, project, setProject }: Props) => {
  return (
    <Box
      key={column.name}
      border="1px solid #172c66"
      borderRadius="md"
      bgColor="#fffffe"
      flex={1}
      pt={4}
    >
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
};

export default StatusColumn;
