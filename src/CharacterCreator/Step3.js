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
import DetailsModal from "./DetailsModal"; // Ensure you have this imported
import { supabase } from "../client/supabaseClient";
import skillPointsPerLevel from "./skillPointsPerLevel";
import classSkills from "./classSkills";
import classFeatures from "./classFeatures";

//   Envoy: [
//     "Bluff",
//     "Computers",
//     "Culture",
//     "Diplomacy",
//     "Disguise",
//     "Intimidate",
//     "Perception",
//     "Profession",
//     "Sense Motive",
//   ],
//   Mechanic: [
//     "Athletics",
//     "Computers",
//     "Engineering",
//     "Medicine",
//     "Perception",
//     "Physical Science",
//     "Piloting",
//     "Profession",
//   ],
//   Mystic: [
//     "Culture",
//     "Diplomacy",
//     "Life Science",
//     "Medicine",
//     "Mysticism",
//     "Perception",
//     "Profession",
//     "Sense Motive",
//     "Survival",
//   ],
//   Operative: [
//     "Acrobatics",
//     "Athletics",
//     "Bluff",
//     "Computers",
//     "Culture",
//     "Disguise",
//     "Engineering",
//     "Intimidate",
//     "Medicine",
//     "Perception",
//     "Piloting",
//     "Profession",
//     "Sense Motive",
//     "Sleight of Hand",
//     "Stealth",
//     "Survival",
//   ],
//   Solarian: [
//     "Acrobatics",
//     "Athletics",
//     "Diplomacy",
//     "Intimidate",
//     "Mysticism",
//     "Perception",
//     "Physical Science",
//     "Profession",
//     "Sense Motive",
//     "Stealth",
//   ],
//   Soldier: [
//     "Acrobatics",
//     "Athletics",
//     "Engineering",
//     "Intimidate",
//     "Medicine",
//     "Piloting",
//     "Profession",
//     "Survival",
//   ],
//   Technomancer: [
//     "Computers",
//     "Engineering",
//     "Life Science",
//     "Mysticism",
//     "Physical Science",
//     "Piloting",
//     "Profession",
//   ],
//   Biohacker: [
//     "Bluff",
//     "Computers",
//     "Culture",
//     "Diplomacy",
//     "Engineering",
//     "Life Science",
//     "Medicine",
//     "Perception",
//     "Physical Science",
//     "Profession",
//     "Sense Motive",
//     "Sleight of Hand",
//   ],
//   Vanguard: [
//     "Acrobatics",
//     "Athletics",
//     "Culture",
//     "Diplomacy",
//     "Intimidate",
//     "Life Science",
//     "Medicine",
//     "Mysticism",
//     "Perception",
//     "Profession",
//     "Stealth",
//     "Survival",
//   ],
//   Witchwarper: [
//     "Acrobatics",
//     "Bluff",
//     "Culture",
//     "Diplomacy",
//     "Intimidate",
//     "Mysticism",
//     "Physical Science",
//     "Profession",
//   ],
// };
// const skillPointsPerLevel = {
//   Biohacker: 4,
//   Envoy: 8,
//   Evolutionist: 4,
//   Mechanic: 4,
//   Mystic: 6,
//   Nanocyte: 6,
//   Operative: 8,
//   Precog: 6,
//   Solarian: 4,
//   Soldier: 4,
//   Technomancer: 4,
//   Vanguard: 6,
//   Witchwarper: 4,
// };

const Step3 = ({ updateFormData, formData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedKeyAbility, setSelectedKeyAbility] = useState(null);
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

  const handleKeyAbilityChange = (value) => {
    setSelectedKeyAbility(value);

    const updatedClassData = {
      ...formData.class,
      KeyAbility: value,
    };

    updateFormData("class", updatedClassData);
  };

  const handleButtonClick = (options) => {
    setModalOptions(options);
    onOpen();
  };

  const handleClassSelect = (value) => {
    if (value.KeyAbility.includes("or") && selectedKeyAbility) {
      value.KeyAbility = selectedKeyAbility;
    }
    
    // Fetch the class features
    value.features = classFeatures[value.Name];
    updateFormData("class", value);
    onClose();
  };
  

  // Fetch data function
  const fetchData = async () => {
    const result = await supabase.from("classes").select("*");
    return result.data || [];
  };

  // Empty data arrays
  const [data, setData] = useState({
    classes: [],
  });

  const [classDetails, setClassDetails] = useState({});

  // Fetch Data
  useEffect(() => {
    fetchData().then((fetchedData) => {
      setData({ classes: fetchedData });

      const classDetailsObj = {};
      fetchedData.forEach((cls) => {
        classDetailsObj[cls.Name] = cls;
      });
      setClassDetails(classDetailsObj);
    });
  }, []);

  return (
    <Box color="white" background="grey" width="70vw">
      <Text fontSize="2rem" textAlign="center" fontWeight="bold">
        Step 3: Class
      </Text>
      <FormControl id="class" mb={4} >
        <FormLabel fontSize="1.8rem">Class</FormLabel>
        <Button
          onClick={() => handleButtonClick(data.classes.map((cls) => cls.Name))}
        >
          Select Class
        </Button>
        {formData.class ? (
          <Box>
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

            {formData.class && formData.class.KeyAbility.includes("or") ? (
              <>
                <Text fontWeight="bold">Select a Key Ability</Text>
                <RadioGroup
                  onChange={handleKeyAbilityChange}
                  value={selectedKeyAbility}
                >
                  <Stack spacing={3} direction="column">
                    {formData.class.KeyAbility.split("or").map(
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
                <strong>Key Ability:</strong> {formData.class?.KeyAbility}
              </Text>
            )}
            <Text mt={2}>
              <strong>Key Ability Description:</strong>{" "}
              {formData.class?.KeyAbilityDescription}
            </Text>
            {/* Class Skills Section */}
            <Text mt={2}>
              <strong>Class Skills:</strong>{" "}
              {classSkills[formData.class?.Name]?.join(", ")}
            </Text>

            {/* Skill Points Per Level Section */}
            <Text mt={2}>
              <strong>Skill Points Per Level:</strong>{" "}
              {skillPointsPerLevel[formData.class?.Name]}
            </Text>
            {/* Class Features Section */}
            {formData.class?.features && (
              <Box mt={4}>
                <Text fontWeight="bold" fontSize="1.5rem">
                  Class Features:
                </Text>
                {formData.class.features.map((feature, idx) => (
                  <Box key={idx} mt={2}>
                    <Text fontWeight="bold">
                      {feature.name} (Level {feature.level}):
                    </Text>
                    <Text>{feature.description}</Text>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        ) : null}
      </FormControl>

      {/* Modal for class details */}
      <DetailsModal
        isOpen={isOpen}
        onClose={onClose}
        option="class"
        options={modalOptions}
        onSelect={handleClassSelect}
        details={classDetails}
      />
    </Box>
  );
};

export default Step3;
