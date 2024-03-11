import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { Project } from "../../pages/Projects";

type Props = {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
};

const CreateProjectAccordion = ({ projects, setProjects }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitClickedName, setSubmitClickedName] = useState(false);

  const isErrorName = name === "" && submitClickedName;

  const handleNameChange = (e: any) => {
    setSubmitClickedName(false);
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: any) => setDescription(e.target.value);

  const handleSubmit = () => {
    setSubmitClickedName(true);
    console.log("name: ", name);
    console.log("description: ", description);

    setProjects([
      ...projects,
      {
        name,
        description,
        status: "To Do",
      },
    ]);

    setName("");
    setDescription("");

    setSubmitClickedName(false);
  };

  return (
    <Accordion allowMultiple>
      <AccordionItem border="1px solid">
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton h="56px">
                {isExpanded ? (
                  <MinusIcon fontSize="12px" />
                ) : (
                  <AddIcon fontSize="12px" />
                )}
                <Box as="span" flex="1" textAlign="left" ml={3}>
                  Add a project
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} borderTop="1px solid">
              <FormControl isInvalid={isErrorName} isRequired mb={4}>
                <FormLabel>Project Name: </FormLabel>
                <Input
                  type="text"
                  size="lg"
                  value={name}
                  onChange={handleNameChange}
                />
                {!isErrorName ? null : (
                  <FormErrorMessage>
                    Please enter a project name.
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Project Description: </FormLabel>
                <Textarea
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </FormControl>
              <Button w="100%" size="lg" onClick={handleSubmit}>
                Create Project
              </Button>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default CreateProjectAccordion;
