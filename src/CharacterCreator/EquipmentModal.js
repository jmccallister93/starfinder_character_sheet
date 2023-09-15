import {
  Accordion,
  AccordionButton,
  AccordionIcon,
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const EquipmentModal = ({
  isOpen,
  onClose,
  fetchedData,
  option,
  handlePurchase,
  remainingCredits,
}) => {
  // const handleSelectOption = (optionDetail) => {
  //   onSelect(optionDetail);
  //   onClose();
  // };
  // useEffect(() => {
  //   const test = fetchedData?.map((opt) => opt.Name);
  //   console.log(details?.Price);
  // });

  const renderEquipmentDetails = (category, details) => {
    switch (category) {
      case "Basic":
        return (
          <>
            <Td>
              <b>{details?.Name}</b>
              <Button p={2} onClick={() => handlePurchase(details)}>
                Purchase
              </Button>
            </Td>
            <Td>{details?.Level}</Td>
            <Td>{details?.Price}</Td>
            <Td>{details?.EAC_Bonus}</Td>
            <Td>{details?.KAC_Bonus}</Td>
            <Td>{details?.Maximum_Dex_Bonus}</Td>
            <Td>{details?.Armor_Check_Penalty}</Td>
            <Td>{details?.Speed_Adjustment}</Td>
            <Td>{details?.Upgrade_Slots}</Td>
            <Td>{details?.Bulk}</Td>
            <Td>{details?.Type}</Td>
            <Td>{details?.Group}</Td>
          </>
        );
      // Add cases for other equipment types
      default:
        return null;
    }
  };

  const renderEquipmentTableHeaders = (category) => {
    switch (category) {
      case "Basic":
        return (
          <>
            <Th>Name</Th>
            <Th>Level</Th>
            <Th>Price</Th>
            <Th>Energy AC Bonus</Th>
            <Th>Kinetic AC Bonus</Th>
            <Th>Maximum Dex Bonus</Th>
            <Th>Armor Check Penalty</Th>
            <Th>Speed Adjustment</Th>
            <Th>Upgrade Slots</Th>
            <Th>Bulk</Th>
            <Th>Type</Th>
            <Th>Group</Th>
          </>
        );

      default:
        return null;
    }
  };

  const [filterValue, setfilterValue] = useState("");
  const handleFilter = (event) => {
    const value = event.target.value;
    setfilterValue(value);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />
      <ModalContent borderRadius="md" width="90vw" maxWidth="90vw">
        <ModalBody>
          <ModalHeader
            color="black"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="white"
          >
            <Box display="flex" flexDirection="column">
              <Text fontSize="2rem">Select Equipment to Purchase</Text>
              <Text>Remaining Credits: {remainingCredits}</Text>
              <Input onChange={handleFilter} placeholder="Filter"></Input>
            </Box>
            <ModalCloseButton
              width="5vw"
              fontSize="2rem"
              padding="0.2rem"
              margin="1rem"
              border="none"
              bg="none"
            />
          </ModalHeader>
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
            <Table variant="simple">
              <Thead>
                <Tr>{renderEquipmentTableHeaders(option)}</Tr>
              </Thead>
              <Tbody>
                {fetchedData
                  ?.filter((equipment) => {
                    if (!filterValue) return true;
                    return Object.values(equipment).some((value) =>
                      String(value)
                        .toLowerCase()
                        .includes(filterValue.toLowerCase())
                    );
                  })
                  .map((opt, index) => (
                    <Tr key={index}>{renderEquipmentDetails(option, opt)}</Tr>
                  ))}
              </Tbody>
            </Table>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EquipmentModal;
