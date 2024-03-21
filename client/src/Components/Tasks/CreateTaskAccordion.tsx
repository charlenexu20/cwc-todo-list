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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
  featureId: number;
  projectId: number;
  userStoryId: number;
};

const CreateTaskAccordion = ({ projectId, featureId, userStoryId }: Props) => {
  console.log("PROJECT ID: ", projectId);
  console.log("FEATURE ID: ", featureId);
  console.log("USERSTORY ID: ", userStoryId);

  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [submitClickedName, setSubmitClickedName] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isErrorName = name === "" && submitClickedName;

  const handleNameChange = (e: any) => {
    setSubmitClickedName(false);
    setName(e.target.value);
  };

  const handleSubmit = () => {
    setSubmitClickedName(true);

    if (name !== "") {
      setIsOpen(false);
      const token = localStorage.getItem("token");

      axios
        .post(
          "http://localhost:3001/auth/create-task",
          {
            name,
            projectId,
            featureId,
            userStoryId,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        .then((response) => {
          setName("");
          setSubmitClickedName(false);

          toast({
            title: "Success",
            description: "Your developer task has been created!",
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
                "There was an error creating your developer task. Please try again.",
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
      <AccordionItem borderTop="1px">
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
                  Add a task
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} borderTop="1px solid">
              <FormControl isInvalid={isErrorName} isRequired mb={4}>
                <FormLabel>Task Name: </FormLabel>
                <Input
                  type="text"
                  size="lg"
                  value={name}
                  onChange={handleNameChange}
                />
                {!isErrorName ? null : (
                  <FormErrorMessage>
                    Developer task name is required.
                  </FormErrorMessage>
                )}
              </FormControl>
              <Button w="100%" size="lg" onClick={handleSubmit}>
                Create Task
              </Button>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default CreateTaskAccordion;
