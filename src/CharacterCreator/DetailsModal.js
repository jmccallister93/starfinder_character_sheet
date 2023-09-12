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
  details,
}) => {
  const handleSelectOption = (optionName) => {
    onSelect(optionName);
    onClose();
  };

  const renderDetails = (detailType, details) => {
    switch (detailType) {
      case "class":
        return (
          <>
            <Text>
              <strong>Name:</strong> {details.Name}
            </Text>
            <Text>
              <strong>Stamina Points:</strong> {details.StaminaPoints}
            </Text>
            <Text>
              <strong>HP:</strong> {details.HP}
            </Text>
            <Text>
              <strong>Description:</strong> {details.Description}
            </Text>
            <Text>
              <strong>Key Ability Description:</strong>{" "}
              {details.KeyAbilityDescription}
            </Text>
            <Text>
              <strong>Key Ability:</strong> {details.KeyAbility}
            </Text>
          </>
        );
      case "race":
        return (
          <>
            <Text>
              <strong>Name:</strong> {details.Name}
            </Text>
            <Text>
              <strong>Ability:</strong> {details.Ability}
            </Text>
            <Text>
              <strong>HP:</strong> {details.HP}
            </Text>
            <Text>
              <strong>Size:</strong> {details.Size}
            </Text>
            <Text>
              <strong>Type:</strong> {details.Type}
            </Text>
            <Text>
              <strong>Description:</strong> {details.Description}
            </Text>
          </>
        );
      case "theme":
        return (
          <>
            <Text>
              <strong>Name:</strong> {details.Name}
            </Text>
            <Text>
              <strong>Ability:</strong> {details.Ability}
            </Text>
            <Text>
              <strong>Class Skill:</strong> {details.ClassSkill}
            </Text>
            <Text>
              <strong>Description:</strong> {details.Description}
            </Text>
          </>
        );
      default:
        return null;
    }
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
                    {details[opt] ? (
                      <>
                        {renderDetails(option, details[opt])}
                        <Button
                          mt={2}
                          onClick={() => handleSelectOption(details[opt])}
                        >
                          Select {details[opt].Name}
                        </Button>
                      </>
                    ) : (
                      <Text>No details available for {opt}</Text>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DetailsModal;
