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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Select,
} from "@chakra-ui/react";
import DetailsModal from "./DetailsModal"; // Ensure you have this imported
import { supabase } from "../client/supabaseClient";
import skillPointsPerLevel from "./skillPointsPerLevel";
import classSkills from "./classSkills";
import classFeatures from "./classFeatures";
import ClassProgressionTable from "./ClassProgressionTable";
import Biohacker from "../ClassFeatures/Biohacker";

const Step3 = ({ updateFormData, formData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedKeyAbility, setSelectedKeyAbility] = useState(null);
  const [modalOptions, setModalOptions] = useState([]);
  const [proficiencies, setProficiencies] = useState([]);
  const [classAbilities, setClassAbilities] = useState([]);
  const [classProgressionData, setClassProgressionData] = useState({});
  const [classLevel, setClassLevel] = useState(1);
  const [allClasses, setAllClasses] = useState([]);
  const [selectedAbility, setSelectedAbility] = useState();
  const [features, setFeatures] = useState();

  // Key ability selector logic
  const handleKeyAbilityChange = (selectedClassName, selectedValue) => {
    setAllClasses((prevClasses) => {
      const updatedClasses = prevClasses.map((cls) => {
        if (cls.Name === selectedClassName) {
          cls.KeyAbility = selectedValue; // Use the value directly
        }
        return cls;
      });
      updateFormData("classes", updatedClasses);
      return updatedClasses;
    });
  };

  // Fires modal
  const handleButtonClick = (options) => {
    setModalOptions(options);
    onOpen();
  };

  // Selects class
  const handleClassSelect = (value) => {
    value.level = 1;

    // Add the class to the allClasses array
    setAllClasses((prevClasses) => {
      const updatedClasses = [...prevClasses, value];
      updateFormData("classes", updatedClasses);
      return updatedClasses;
    });

    // Fetch proficiencies and class abilities for the selected class
    fetchProficiencies(value.id);
    fetchClassFeatures(value.id);
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
  // Fetch proficiencies
  const fetchProficiencies = async (classId) => {
    const result = await supabase
      .from("classProficiency")
      .select("*")
      .eq("class_id", classId);

    setAllClasses((prevClasses) => {
      const updatedClasses = prevClasses.map((cls) => {
        if (cls.id === classId) {
          return {
            ...cls,
            proficiencies: result.data || [],
          };
        }
        return cls;
      });

      // Updating formData inside the setAllClasses to ensure synchronous behavior
      updateFormData("classes", updatedClasses);

      return updatedClasses;
    });
  };

  // Fetches Abilities(features)
  const fetchClassFeatures= async (classId) => {
    const result = await supabase
      .from("classFeatures")
      .select("*")
      .eq("class_id", classId);
      
    setAllClasses((prevClasses) => {
      const updatedClasses = prevClasses.map((cls) => {
        if (cls.id === classId) {
          return {
            ...cls,
            features: result.data || [],
          };
        }

        return cls;
      });

      // Updating formData inside the setAllClasses to ensure synchronous behavior
      updateFormData("classes", updatedClasses);

      return updatedClasses;
    });
  };

  // Formats abilities into text
  const formatFeatureText = (featureText) => {
    // Remove starting and ending quotes
    const cleanText = featureText?.slice(1, -1);

    // Split the text on periods
    const sections = cleanText?.split(".");

    return (
      <Box background="rgb(70,70,70)" p={4} borderRadius={10}>
        {sections.map((section, idx) => {
          // If the section is not empty, render it
          if (section.trim()) {
            return (
              <Text mt={2} key={idx}>
                {section.trim() + "."}
              </Text>
            );
          }
          return null; // If the section is empty, don't render anything
        })}
      </Box>
    );
  };

  // Clear selections
  const clearSelection = () => {
    // Resetting formData
    updateFormData("classes", []);
    updateFormData("classLevel", null);
    updateFormData("proficiencies", []);
    updateFormData("abilities", []);

    // Resetting local state
    setAllClasses([]);
    setProficiencies([]);
    setClassAbilities([]);
    setClassLevel(1);
    setSelectedKeyAbility(null);
  };

  // Remove single class
  const removeClass = (idx) => {
    updateFormData(formData?.classes.splice(idx, 1));
  };
  //
  // useEffect(() => {
  //   if (formData?.classes && formData.classes[0]?.Name === "Biohacker") {
  //     setFeatures(
  //       <Biohacker formData={formData} updateFormData={updateFormData} />
  //     );
  //   }
  // }, [formData]);

  return (
    <Box
      color="white"
      background="rgb(50, 50, 50)"
      width="fit-content"
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
        Step 3: Class
      </Text>

      <FormControl id="class" mb={4}>
        {/* Button to add another class */}
        <Button
          onClick={() => handleButtonClick(data.classes.map((cls) => cls.Name))}
          mb="20px"
          ml={2}
        >
          Add Class
        </Button>
        <Button mb="20px" ml={2} onClick={clearSelection}>
          Remove All Classes
        </Button>

        {formData.classes &&
          formData.classes.map((selectedClass, idx) => (
            <Box
              key={idx}
              background="rgb(60, 60, 60)"
              padding="20px"
              borderRadius="10px"
              boxShadow="inset 0px 0px 10px rgba(0,0,0,0.4)"
            >
              <Button onClick={() => removeClass(idx)}>Remove Class</Button>
              <Text mt={2} fontSize="1.2rem">
                <strong>Class:</strong> {selectedClass?.Name}
              </Text>

              {/* Adding the classLevel dropdown here after class is selected */}
              {selectedClass ? (
                <FormControl id="classLevel" display="flex" alignItems="center">
                  <FormLabel fontSize="1.2rem" fontWeight="bold">
                    Class Level:
                  </FormLabel>
                  <Select
                    background="rgb(120, 120, 120)"
                    width="fit-content"
                    value={selectedClass.level}
                    onChange={(e) => {
                      const newLevel = Number(e.target.value);
                      setAllClasses((prevClasses) => {
                        const updatedClasses = prevClasses.map((cls) => {
                          if (cls.Name === selectedClass.Name) {
                            cls.level = newLevel;
                          }
                          return cls;
                        });
                        updateFormData("classes", updatedClasses);
                        return updatedClasses;
                      });
                    }}
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <option
                        style={{ background: "rgb(120, 120, 120)" }}
                        key={i}
                        value={i + 1}
                      >
                        {i + 1}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              ) : null}
              <Text mt={2}>
                <strong>Stamina Points:</strong> {selectedClass?.StaminaPoints}
              </Text>
              <Text mt={2}>
                <strong>HP:</strong> {selectedClass?.HP}
              </Text>
              <Text mt={2}>
                <strong>Description:</strong> {selectedClass?.Description}
              </Text>

              {selectedClass && selectedClass.KeyAbility.includes("or") ? (
                <>
                  <Text fontWeight="bold">Select a Key Ability</Text>
                  <RadioGroup
                    onChange={(value) =>
                      handleKeyAbilityChange(selectedClass.Name, value)
                    }
                    value={selectedClass.KeyAbility}
                  >
                    <Stack spacing={3} direction="column">
                      {selectedClass.KeyAbility.split("or").map(
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
                  <strong>Key Ability:</strong> {selectedClass?.KeyAbility}
                </Text>
              )}
              <Text mt={2}>
                <strong>Key Ability Description:</strong>{" "}
                {selectedClass?.KeyAbilityDescription}
              </Text>
              {/* Class Skills Section */}
              <Text mt={2}>
                <strong>Class Skills:</strong>{" "}
                {classSkills[selectedClass?.Name]?.join(", ")}
              </Text>

              {/* Skill Points Per Level Section */}
              <Text mt={2}>
                <strong>Skill Points Per Level:</strong>{" "}
                {skillPointsPerLevel[selectedClass?.Name]}
              </Text>
              {/* Proficiencies */}
              <Box mt={4}>
                <Text fontWeight="bold" fontSize="1.5rem">
                  Proficiencies:
                </Text>
                {selectedClass.proficiencies &&
                  selectedClass.proficiencies.map((proficiency, idx) => (
                    <Box key={idx} mt={2}>
                      <Text fontWeight="bold">
                        {proficiency.proficiency_type}:
                      </Text>
                      <Text>{proficiency.description}</Text>
                    </Box>
                  ))}
              </Box>
              <Text fontWeight="bold" fontSize="1.5rem">
                Class Progression:
              </Text>

              {/* Class progression table */}
              <ClassProgressionTable
                className={selectedClass.Name}
                updateFormData={updateFormData}
              />

              {/* Class Features Section */}
              <Box mt={4}>
                <Text fontWeight="bold" fontSize="1.5rem">
                  Class Feature Details:
                </Text>

                <Accordion allowMultiple>
                  {selectedClass?.features &&
                    selectedClass?.features.map((feature, idx) => (
                      <AccordionItem key={idx}>
                        <h2>
                          <AccordionButton>
                            <Box flex="1" textAlign="left" fontWeight="bold">
                              {feature.feature_name} (Level{" "}
                              {feature.feature_level}
                              ):
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          {formatFeatureText(feature.feature_description)}
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                </Accordion>
              </Box>
            </Box>
          ))}
      </FormControl>
      
      {/* Modal for class details */}
      <DetailsModal
        isOpen={isOpen}
        onClose={onClose}
        option="class"
        options={modalOptions}
        onSelect={handleClassSelect}
        details={classDetails}
        selectedClasses={allClasses}
      />
    </Box>
  );
};

export default Step3;
