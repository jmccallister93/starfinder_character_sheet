import {
  Box,
  FormControl,
  FormLabel,
  useDisclosure,
  Button,
  Text,
} from "@chakra-ui/react";
import DetailsModal from "./DetailsModal";
import { useEffect, useState } from "react";
import { supabase } from "../client/supabaseClient";

const Step2 = ({ updateFormData, formData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalOptions, setModalOptions] = useState([]);

  // Format Description property
  const formatDescription = (desc) => {
    if (!desc) return null;

    return desc.split(".").map((chunk, index) => {
      const parts = chunk.split(":");
      if (parts.length > 1) {
        return (
          <Text key={index}>
            <strong>{parts[0].trim() + ":"}</strong> {parts[1]}
          </Text>
        );
      }
      return <Text key={index}>{chunk}</Text>;
    });
  };

  // Ability score adjustments based on race
  const extractAbilityAdjustments = (adjustmentString) => {
    const adjustments = adjustmentString.split(",").map((s) => s.trim());
    const result = {};
    adjustments.forEach((adj) => {
      const match = adj.match(/([+-]\d+)\s+(\w+)/);
      if (match) {
        const value = parseInt(match[1], 10);
        const ability = match[2];
        result[ability] = (result[ability] || 0) + value;
      }
    });
    return result;
  };

  // Handle button click for each to show popup
  const handleButtonClick = (options) => {
    setModalOptions(options);
    onOpen();
  };

  // Selecting from MODAL
  const handleRaceSelect = (value) => {
    const adjustments = extractAbilityAdjustments(value.Ability);
    updateFormData("race", value);
    updateFormData("raceAbilityAdjustments", adjustments);
    onClose();
  };

  // Fetch data function
  const fetchData = async () => {
    const result = await supabase.from("races").select("*");
    return result.data || [];
  };

  // Empty data arrays
  const [data, setData] = useState({
    races: [],
  });

  const [raceDetails, setRaceDetails] = useState({});

  // Fetch Data
  useEffect(() => {
    fetchData().then((fetchedData) => {
      setData({ races: fetchedData });

      const raceDetailsObj = {};
      fetchedData.forEach((race) => {
        raceDetailsObj[race.Name] = race;
      });
      setRaceDetails(raceDetailsObj);
    });
  }, []);

  return (
    <Box       color="white"
    background="rgb(50, 50, 50)"
    width="70vw"
    padding="20px"
    borderRadius="10px"
    boxShadow="0px 0px 15px rgba(0,0,0,0.2)">
      <Text fontSize="2.5rem" mb="20px" borderBottom="2px solid white" paddingBottom="10px" textAlign="center" fontWeight="bold">
        Step 2: Race
      </Text>
      <FormControl id="race" mb={4}>
        <FormLabel fontSize="1.8rem">Race</FormLabel>
        <Button
          onClick={() => handleButtonClick(data.races.map((race) => race.Name))}
        >
          Select Race
        </Button>
        {formData.race ? (
          <Box     color="white"
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          background="rgb(60, 60, 60)"
          padding="20px"
          borderRadius="10px"
          boxShadow="inset 0px 0px 10px rgba(0,0,0,0.4)">
            <Text mt={2}>
              <strong>Name:</strong> {formData.race?.Name}
            </Text>
            <Text mt={2}>
              <strong>Ability:</strong> {formData.race?.Ability}
            </Text>
            <Text mt={2}>
              <strong>HP:</strong> {formData.race?.HP}
            </Text>
            <Text mt={2}>
              <strong>Size:</strong> {formData.race?.Size}
            </Text>
            <Text mt={2}>
              <strong>Type:</strong> {formData.race?.Type}
            </Text>
            {formatDescription(formData.race?.Description).map(
              (formattedDesc, index) => (
                <Box key={index}>{formattedDesc}</Box>
              )
            )}
          </Box>
        ) : null}
      </FormControl>

      {/* Modal for details */}
      <DetailsModal
        isOpen={isOpen}
        onClose={onClose}
        option="race"
        options={modalOptions}
        onSelect={handleRaceSelect}
        details={raceDetails}
      />
    </Box>
  );
};

export default Step2;
