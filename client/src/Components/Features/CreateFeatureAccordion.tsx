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
import { Feature } from "../../pages/Project";
import { useNavigate } from "react-router-dom";
import { Project } from "../../pages/Projects";

type Props = {
  features: Feature[];
  setProject: React.Dispatch<React.SetStateAction<Project>>;
  projectId: number;
};

const CreateFeatureAccordion = ({ features, setProject, projectId }: Props) => {
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

      console.log("name: ", name);
      console.log("description: ", description);

      axios
        .post(
          "http://localhost:3001/auth/create-feature",
          {
            name,
            description,
            projectId,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        .then((response) => {
          console.log("PROJECT: ", response.data);
          setProject(response.data);
          setName("");
          setDescription("");
          setSubmitClickedName(false);

          toast({
            title: "Success",
            description: "Your feature has been created!",
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
                "There was an error creating your feature. Please try again.",
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
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  ml={3}
                  layerStyle="text"
                  color="#fffffe"
                >
                  Add a feature
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} layerStyle="accordionPanel">
              <FormControl isInvalid={isErrorName} isRequired mb={4}>
                <FormLabel>Feature Name: </FormLabel>
                <Input
                  type="text"
                  size="lg"
                  value={name}
                  onChange={handleNameChange}
                  layerStyle="text"
                />
                {!isErrorName ? null : (
                  <FormErrorMessage>Feature name is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Feature Description: </FormLabel>
                <Textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  layerStyle="text"
                />
              </FormControl>
              <Button
                w="100%"
                size="lg"
                onClick={handleSubmit}
                variant="action-button"
              >
                Create Feature
              </Button>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default CreateFeatureAccordion;
