import {
  Box,
  FormControl,
  FormLabel,
  useDisclosure,
  Button,
  Text,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import DetailsModal from "./DetailsModal";
import { useEffect, useState } from "react";
import { supabase } from "../client/supabaseClient";

const Step2 = ({ setFormData, formData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState(null);
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

  // Theme ability select
  const [selectedAbility, setSelectedAbility] = useState(null);
  const handleAbilityChange = (value) => {
    setSelectedAbility(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      theme: {
        ...prevFormData.theme,
        Ability: value,
      },
    }));
    console.log(value);
  };

  //Ability score adjustments based on race/theme
  const extractAbilityAdjustments = (adjustmentString) => {
    const adjustments = adjustmentString.split(',').map(s => s.trim());
    const result = {};
    adjustments.forEach(adj => {
      const match = adj.match(/([+-]\d+)\s+(\w+)/);
      if (match) {
        const value = parseInt(match[1], 10);
        const ability = match[2];
        result[ability] = (result[ability] || 0) + value;
      }
    });
    return result;
  };
  
  const calculateTotalAdjustments = (themeAdjustment, raceAdjustment) => {
    // This is just an example with two sources. Add more sources if needed.
    const allAdjustments = { ...themeAdjustment, ...raceAdjustment };
    const totalAdjustments = {};
    for (const ability in allAdjustments) {
      totalAdjustments[ability] =
        (totalAdjustments[ability] || 0) + allAdjustments[ability];
    }
    return totalAdjustments;
  };

  // Handle button click for each to show popup
  const handleButtonClick = (type, options) => {
    setSelectedOption(type);
    setModalOptions(options);
    onOpen();
  };

  // Test log
  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  // Selecting from MODAL
  // const handleModalSelect = (value) => {
  //   setFormData(selectedOption, value);
  //   onClose();
  
  //   if (selectedOption === "race") {
  //     const adjustments = extractAbilityAdjustments(value.Ability);
  //     setRaceAdjustments(adjustments);
  //   } else if (selectedOption === "theme" && !value.Ability.includes(",")) {
  //     // Only set theme adjustments if there's only one option
  //     const adjustments = extractAbilityAdjustments(value.Ability);
  //     setThemeAdjustments(adjustments);
  //   }
  // };
  const handleRaceSelect = (value) => {
    const adjustments = extractAbilityAdjustments(value.Ability);
    setFormData("race", value);
    setFormData("raceAbilityAdjustments", adjustments);
  };
  const handleThemeSelect = (value) => {
    if (!value.Ability.includes(",")) {
      const adjustments = extractAbilityAdjustments(value.Ability);
      setFormData("theme", value);
      setFormData("themeAbilityAdjustments", adjustments);
    } else {
      setFormData("theme", value);
    }
  };
  const handleModalSelect = (value) => {
    if (selectedOption === "race") {
      const adjustments = extractAbilityAdjustments(value.Ability);
      setFormData((prev) => ({
        ...prev,
        race: value,
        raceAbilityAdjustments: adjustments
      }));
    } else if (selectedOption === "theme") {
      let adjustments = {};
      if (!value.Ability.includes(",")) {
        // Only set theme adjustments if there's only one option
        adjustments = extractAbilityAdjustments(value.Ability);
      }
      const updatedData = {
        ...formData,
        race: value,
        raceAbilityAdjustments: adjustments
      };
      setFormData(updatedData);
    } else {
      setFormData((prev) => ({
        ...prev,
        [selectedOption]: value
      }));
    }
  
    onClose();
  };
  
  

  // Fetch data function
  const fetchData = async () => {
    const categories = ["classes", "races", "themes"];

    const results = await Promise.all(
      categories.map((category) => supabase.from(category).select("*")) // Change "Name" to "*" to fetch all columns
    );

    const data = {};

    results.forEach((result, index) => {
      const category = categories[index];
      if (result.error) {
        console.error(`Error fetching ${category}:`, result.error);
        data[category] = [];
      } else {
        data[category] = result.data;
      }
    });

    return data;
  };

  // Empty data arrays
  const [data, setData] = useState({
    classes: [],
    races: [],
    themes: [],
  });

  const [classDetails, setClassDetails] = useState({});
  const [raceDetails, setRaceDetails] = useState({});
  const [themeDetails, setThemeDetails] = useState({});

  // Fetch Data
  useEffect(() => {
    fetchData().then((fetchedData) => {
      setData(fetchedData);

      // Create an object with class names as keys and their details as values
      const classDetailsObj = {};
      fetchedData.classes.forEach((cls) => {
        classDetailsObj[cls.Name] = cls;
      });
      setClassDetails(classDetailsObj);

      // Do the same for races
      const raceDetailsObj = {};
      fetchedData.races.forEach((race) => {
        raceDetailsObj[race.Name] = race;
      });
      setRaceDetails(raceDetailsObj);

      // And for themes
      const themeDetailsObj = {};
      fetchedData.themes.forEach((theme) => {
        themeDetailsObj[theme.Name] = theme;
      });
      setThemeDetails(themeDetailsObj);
    });
  }, []);

  return (
    <Box color="white" background="grey">
      <Text fontSize="2rem" textAlign="center" fontWeight="bold">
        Step 2
      </Text>
      <FormControl id="race" mb={4}>
        <FormLabel>Race</FormLabel>
        <Button
          onClick={() =>
            handleButtonClick(
              "race",
              data.races.map((race) => race.Name)
            )
          }
        >
          Select Race
        </Button>
        {formData.race ? (
          <>
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
          </>
        ) : null}
      </FormControl>

      <FormControl id="theme" mb={4}>
        <FormLabel>Theme</FormLabel>
        <Button
          onClick={() =>
            handleButtonClick(
              "theme",
              data.themes.map((theme) => theme.Name)
            )
          }
        >
          Select Theme
        </Button>
        {formData.theme ? (
          <>
            <Text mt={2}>
              <strong>Name:</strong> {formData.theme?.Name}
            </Text>
            {formData.theme && formData.theme.Ability.includes(",") ? (
              <>
                <Text>Select an Ability</Text>
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

            <Text mt={2}>
              <strong>Class Skill:</strong> {formData.theme?.ClassSkill}
            </Text>
            <Text mt={2}>
              <strong>Description:</strong> {formData.theme?.Description}
            </Text>
          </>
        ) : null}
      </FormControl>

      <FormControl id="class" mb={4}>
        <FormLabel>Class</FormLabel>
        <Button
          onClick={() =>
            handleButtonClick(
              "class",
              data.classes.map((cls) => cls.Name)
            )
          }
        >
          Select Class
        </Button>
        {formData.class ? (
          <>
            <Text mt={2}>
              <strong>Name:</strong> {formData.class?.Name}
            </Text>
            <Text mt={2}>
              <strong>Stamina Points:</strong> {formData.class?.StaminaPoints}
            </Text>
            <Text mt={2}>
              <strong>HP:</strong> {formData.class?.HP}
            </Text>
            <Text mt={2}>
              <strong>Description:</strong> {formData.class?.Description}
            </Text>
            <Text mt={2}>
              <strong>Key Ability Description:</strong>{" "}
              {formData.class?.KeyAbilityDescription}
            </Text>
            <Text mt={2}>
              <strong>Key Ability:</strong> {formData.class?.KeyAbility}
            </Text>
          </>
        ) : null}
      </FormControl>

      {/* Modal for details */}
      <DetailsModal
        isOpen={isOpen}
        onClose={onClose}
        option={selectedOption}
        options={modalOptions}
        // onSelect={handleModalSelect}
        onSelect={selectedOption === "race" ? handleRaceSelect : handleThemeSelect}
        details={
          selectedOption === "class"
            ? classDetails
            : selectedOption === "race"
            ? raceDetails
            : themeDetails
        }
        setSelectedAbility={setSelectedAbility}
      />
    </Box>
  );
};

export default Step2;
