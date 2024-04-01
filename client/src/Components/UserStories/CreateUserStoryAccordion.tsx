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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Project } from "../../pages/Projects";

type Props = {
  featureId: number;
  projectId: number;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};

const CreateUserStoryAccordion = ({
  projectId,
  featureId,
  setProject,
}: Props) => {
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
          "http://localhost:3001/auth/create-user-story",
          {
            name,
            description,
            projectId,
            featureId,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        .then((response) => {
          setProject(response.data);
          setName("");
          setDescription("");
          setSubmitClickedName(false);

          toast({
            title: "Success",
            description: "Your user story has been created!",
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
                "There was an error creating your user story. Please try again.",
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
      <AccordionItem border="1px solid">
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton onClick={() => setIsOpen(!isOpen)} h="56px">
                {isExpanded ? (
                  <MinusIcon fontSize="12px" />
                ) : (
                  <AddIcon fontSize="12px" />
                )}
                <Box as="span" flex="1" textAlign="left" ml={3}>
                  Add a user story
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} borderTop="1px solid">
              <FormControl isInvalid={isErrorName} isRequired mb={4}>
                <FormLabel>User Story Name: </FormLabel>
                <Input
                  type="text"
                  size="lg"
                  value={name}
                  onChange={handleNameChange}
                />
                {!isErrorName ? null : (
                  <FormErrorMessage>
                    User story name is required.
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>User Story Description: </FormLabel>
                <Textarea
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </FormControl>
              <Button w="100%" size="lg" onClick={handleSubmit}>
                Create User Story
              </Button>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default CreateUserStoryAccordion;
