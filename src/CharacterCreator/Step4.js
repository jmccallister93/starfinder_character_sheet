import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Button,
  Text,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import DetailsModal from "./DetailsModal";
import { supabase } from "../client/supabaseClient";

const Step4 = ({ updateFormData, formData, themeData }) => {
  const [selectedAbility, setSelectedAbility] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalOptions, setModalOptions] = useState([]);
  const [selectedClassSkill, setSelectedClassSkill] = useState(null);

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

  const handleAbilityChange = (value) => {
    setSelectedAbility(value);

    // Extract the ability name from the value (e.g., extract "STR" from "+1 STR")
    const abilityName = value.split(" ").pop();

    // Define the adjustments based on the selected ability only
    const updatedAdjustments = {
      [abilityName]: parseInt(value),
    };

    // Update the formData with the new adjustments and selected ability
    updateFormData("theme", {
      ...formData.theme,
      Ability: value,
    });
    updateFormData("themeAbilityAdjustments", updatedAdjustments);
  };

  const handleClassSkillChange = (value) => {
    setSelectedClassSkill(value);

    const updatedThemeData = {
      ...formData.theme,
      ClassSkill: value,
    };

    updateFormData("theme", updatedThemeData);
  };

  // Handle button click for each to show popup
  const handleButtonClick = (options) => {
    setModalOptions(options);
    onOpen();
  };

  const handleThemeSelect = (value) => {
    if (value.Ability && typeof value.Ability === "string") {
      const adjustments = extractAbilityAdjustments(value.Ability);
      updateFormData("theme", value);
      updateFormData("themeAbilityAdjustments", adjustments);
    } else {
      updateFormData("theme", value);
    }
    onClose();
  };

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
  // Fetch data function
  const fetchData = async () => {
    const result = await supabase.from("themes").select("*");
    return result.data || [];
  };

  // Empty data arrays
  const [data, setData] = useState({
    themes: [],
  });

  const [themeDetails, setThemeDetails] = useState({});

  // Fetch Data
  useEffect(() => {
    fetchData().then((fetchedData) => {
      setData({ themes: fetchedData });

      const themeDetailsObj = {};
      fetchedData.forEach((theme) => {
        themeDetailsObj[theme.Name] = theme;
      });
      setThemeDetails(themeDetailsObj);
    });
  }, []);

  return (
    <Box
      color="white"
      background="rgb(50, 50, 50)"
      width="70vw"
      padding="20px"
      borderRadius="10px"
      boxShadow="0px 0px 15px rgba(0,0,0,0.2)"
    >
      <Text
        fontSize="2.5rem"
        mb="20px"
        borderBottom="2px solid white"
        paddingBottom="10px"
        textAlign="center"
        fontWeight="bold"
      >
        Step 4: Theme
      </Text>
      <FormControl id="theme" mb={4}>
        <FormLabel fontSize="1.8rem">Theme</FormLabel>
        <Button
          onClick={() =>
            handleButtonClick(data.themes.map((theme) => theme.Name))
          }
        >
          Select Theme
        </Button>
        {formData.theme ? (
          <Box
            background="rgb(60, 60, 60)"
            padding="20px"
            borderRadius="10px"
            boxShadow="inset 0px 0px 10px rgba(0,0,0,0.4)"
          >
            <Text mt={2}>
              <strong>Name:</strong> {formData.theme?.Name}
            </Text>
            {formData.theme.Ability.includes(",") ? (
              <>
                <Text fontWeight="bold">Select an Ability</Text>
                <RadioGroup
                  onChange={handleAbilityChange}
                  value={selectedAbility}
                >
                  <Stack spacing={3} direction="column">
                    {formData.theme.Ability.split(", ").map(
                      (abilityOption, idx) => (
                        <Radio
                          key={idx}
                          value={abilityOption.trim()}
                          border="1px solid white"
                          borderRadius="50px"
                          borderWidth="0.5rem"
                        >
                          {abilityOption.trim()}
                        </Radio>
                      )
                    )}
                  </Stack>
                </RadioGroup>
              </>
            ) : (
              <Text mt={2}>
                <strong>Ability:</strong> {formData.theme?.Ability}
              </Text>
            )}

            {formData.theme?.ClassSkill?.includes("or") ? (
              <>
                <Text fontWeight="bold">Select a Class Skill</Text>
                <RadioGroup
                  onChange={handleClassSkillChange}
                  value={selectedClassSkill}
                >
                  <Stack spacing={3} direction="column">
                    {formData.theme.ClassSkill.split("or").map(
                      (abilityOption, idx) => (
                        <Radio
                          key={idx}
                          value={abilityOption.trim()}
                          border="1px solid white"
                          borderRadius="50px"
                          borderWidth="0.5rem"
                        >
                          {abilityOption.trim()}
                        </Radio>
                      )
                    )}
                  </Stack>
                </RadioGroup>
              </>
            ) : (
              <Text mt={2}>
                <strong>Class Skill:</strong> {formData.theme?.ClassSkill}
              </Text>
            )}

            <Text mt={2}>
              <strong>Description:</strong> {formData.theme?.Description}
            </Text>
          </Box>
        ) : null}
      </FormControl>

      {/* Modal for theme details */}
      <DetailsModal
        isOpen={isOpen}
        onClose={onClose}
        option="theme"
        options={modalOptions}
        onSelect={handleThemeSelect}
        details={themeDetails}
      />
    </Box>
  );
};

export default Step4;
