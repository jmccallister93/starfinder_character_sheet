import {
  Text,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Button,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

const DetailsModal = ({
  isOpen,
  onClose,
  option,
  options,
  onSelect,
  classDetails,
}) => {
  const handleSelectClass = (className) => {
    onSelect(className);
    onClose();
  };
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
        >
          <Text fontSize="2rem">
            Select{" "}
            {option ? option.charAt(0).toUpperCase() + option.slice(1) : ""}
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
            {option === "class" ? (
              <Accordion allowToggle>
                {options.map((opt, index) => (
                  <AccordionItem key={index}>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {opt}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      {classDetails[opt].Name ? (
                        <>
                          <Text>
                            <strong>Name:</strong> {classDetails[opt].Name}
                          </Text>
                          <Text>
                            <strong>Stamina Points:</strong>{" "}
                            {classDetails[opt].StaminaPoints}
                          </Text>
                          <Text>
                            <strong>HP:</strong> {classDetails[opt].HP}
                          </Text>
                          <Text>
                            <strong>Description:</strong>{" "}
                            {classDetails[opt].Description}
                          </Text>
                          <Text>
                            <strong>Key Ability Description:</strong>{" "}
                            {classDetails[opt].KeyAbilityDescription}
                          </Text>
                          <Text>
                            <strong>Key Ability:</strong>{" "}
                            {classDetails[opt].KeyAbility}
                          </Text>
                          <Button
                            mt={2}
                            onClick={() =>
                              handleSelectClass(classDetails[opt].Name)
                            }
                          >
                            Select {classDetails[opt].Name}
                          </Button>
                        </>
                      ) : (
                        <Text>No details available for {opt}</Text>
                      )}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              options.map((opt, index) => (
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
              ))
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DetailsModal;
