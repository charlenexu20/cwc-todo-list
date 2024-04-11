import {
  Box,
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  itemType: "project" | "feature" | "user story";
  deleteItem: () => void;
};

const DeleteModal = ({ isOpen, onClose, itemType, deleteItem }: Props) => {
  const getAssociatedItems = () => {
    if (itemType === "project") {
      return "features, user stories, and developer tasks";
    } else if (itemType === "feature") {
      return "user stories, and developer tasks";
    } else {
      return "developer tasks";
    }
  };

  const capitalizeItemType = () => {
    const capitalizeMap = {
      project: "Project",
      feature: "Feature",
      "user story": "User Story",
    };

    return capitalizeMap[itemType];
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pt={20} pb={10} px={10} minW="50%">
          <ModalCloseButton />
          <Box mb={10}>
            <Text
              mb={10}
              fontSize={20}
              textAlign="center"
            >{`Are you sure you want to delete this ${itemType}?`}</Text>
            <Text textAlign="center" fontSize={20}>
              You will be{" "}
              <Text as="span" fontWeight="bold">
                permanently
              </Text>{" "}
              deleting all associated {getAssociatedItems()}.
            </Text>
          </Box>
          <Button onClick={deleteItem} variant="action-button">
            Delete {capitalizeItemType()}
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
