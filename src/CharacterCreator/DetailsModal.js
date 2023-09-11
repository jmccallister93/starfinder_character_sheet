import {
  Text,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  List,
  ListItem,
  Button,
  VStack,
} from "@chakra-ui/react";

const DetailsModal = ({ isOpen, onClose, option, options, onSelect }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />

      <ModalContent
        borderRadius="md"
        height="80vh"
        width="80vw"
        paddingLeft="12rem"
        paddingTop="4rem"
      >
        <ModalHeader
          color="black"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bg="white"
        //   width="80.4vw"
        >
          <Text fontSize="2rem">
          Select {option ? option.charAt(0).toUpperCase() + option.slice(1) : ''}
          </Text>
          <ModalCloseButton
            width="5vw"
            fontSize="2rem"
            padding="0.2rem"
            margin="1rem"
            border="none"
            bg="none"
          />
        </ModalHeader>

        <ModalBody>
          <VStack
            spacing={4}
            align="stretch"
            bg="white"
            borderRadius="md"
            boxShadow="lg"
            p={4}
            height="70vh" 
            overflowY="auto" 
          >
            {options.map((opt, index) => (
              <Button
                key={index}
                onClick={() => onSelect(opt)}
                size="lg"
                variant="outline"
                borderColor="gray.400"
                _hover={{ backgroundColor: "gray.200" }}
                width="fit-content"
              >
                {opt}
              </Button>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DetailsModal;
