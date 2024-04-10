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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Project } from "../../pages/Projects";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
};

const CreateProjectAccordion = ({ projects, setProjects }: Props) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitClickedName, setSubmitClickedName] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isErrorName = name === "" && submitClickedName;

  const handleNameChange = (e: any) => {
    setSubmitClickedName(false);
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: any) => setDescription(e.target.value);

  const handleSubmit = () => {
    setSubmitClickedName(true);

    if (name !== "") {
      setIsOpen(false);

      const token = localStorage.getItem("token");

      axios
        .post(
          "http://localhost:3001/auth/create-project",
          {
            name,
            description,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        .then((response) => {
          setProjects(response.data);
          setName("");
          setDescription("");
          setSubmitClickedName(false);

          toast({
            title: "Success",
            description: "Your project has been created!",
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
              description:
                "There was an error creating your project. Please try again.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        });
    }
  };

  return (
    <Accordion allowToggle index={isOpen ? 0 : 1}>
      <AccordionItem border="none">
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton
                onClick={() => setIsOpen(!isOpen)}
                h="56px"
                _hover={
                  isExpanded
                    ? {
                        transform: "scale(1)",
                      }
                    : {
                        transform: "scale(1.005)",
                      }
                }
                borderBottomRadius={isExpanded ? "none" : "md"}
                layerStyle="accordionButton"
              >
                {isExpanded ? (
                  <MinusIcon fontSize="12px" color="#fffffe" />
                ) : (
                  <AddIcon fontSize="12px" color="#fffffe" />
                )}
                <Box as="span" flex="1" textAlign="left" ml={3} color="#fffffe">
                  Add a project
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} layerStyle="accordionPanel">
              <FormControl isInvalid={isErrorName} isRequired mb={4}>
                <FormLabel>Project Name: </FormLabel>
                <Input
                  type="text"
                  size="lg"
                  value={name}
                  onChange={handleNameChange}
                  layerStyle="text"
                  // border="1px solid #172c66"
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
                  layerStyle="text"
                  // border="1px solid #172c66"
                />
              </FormControl>
              <Button
                size="lg"
                w="100%"
                variant="action-button"
                onClick={handleSubmit}
              >
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
