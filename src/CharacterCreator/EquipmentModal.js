import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";

const EquipmentModal = ({
  isOpen,
  onClose,
  option,
  options,
  onSelect,
  details,
}) => {
  const renderEquipmentDetails = (detailType, details) => {
    switch (detailType) {
      case "Basic": // Assuming you will handle armor basic data here
        return (
          <>
            <Text>
              <strong>Name:</strong> {details.Name}
            </Text>
            <Text>
              <strong>Type:</strong> {details.Type}
            </Text>
            {/* ... other fields */}
          </>
        );
      // Add cases for other equipment types
      default:
        return null;
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />
      <ModalContent borderRadius="md" width="70vw" maxWidth="70vw">
        {/* ... ModalHeader */}
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
                  {/* ... AccordionButton */}
                  <AccordionPanel pb={4}>
                    {details[opt] ? (
                      <>
                        {renderEquipmentDetails(option, details[opt])}
                        <Button
                          mt={2}
                          // onClick={() => handleSelectOption(details[opt])}
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

export default EquipmentModal;