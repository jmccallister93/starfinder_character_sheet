import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../client/supabaseClient";
import Biohacker from "../ClassFeatures/Biohacker";

const Step4 = ({ formData, updateFormData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [allClasses, setAllClasses] = useState([]);
  const [classChoices, setClassChoices] = useState([]);
  const [currentFeatureId, setCurrentFeatureId] = useState(null);
  const [currentClassId, setCurrentClassId] = useState(null)


  // Formats the feature text
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

  //Pull choices data
  const fetchClassChoices = async (classId) => {
    const result = await supabase
      .from("classChoices")
      .select("*")
      .eq("class_id", classId);
    setClassChoices(result.data);

    return result.data || [];
  };

  useEffect(() => {
    if (formData?.classes) {
      formData.classes.forEach((cls) => {
        fetchClassChoices(cls.id);
      });
    }
  }, [formData]);

  const showClassOption = (feature, cls) => {
    
    // Set the currentFeatureId in the state
    setCurrentClassId(cls)
    setCurrentFeatureId(feature);
    onOpen();
  };
  

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
        Step 4: Class Features
      </Text>
      {/* 2. Display the level for each class */}
      <VStack>
        {formData?.classes &&
          formData.classes.map((cls, idx) => (
            <Box key={idx}>
              <Text fontSize="1.5rem" fontWeight="bold">
                Class: {cls.Name} | Level: {cls.level}
              </Text>
              <Box m={0} p={0} alignItems="start">
                {classChoices
                  .filter(
                    (choice) =>
                      choice.class_id === cls.id &&
                      choice.level_id === cls.level
                  )
                  .map((choice, cIdx) => (
                    <Box key={cIdx}>
                      <Text fontSize="1.4rem" fontWeight="bold">
                        Feature: {choice.feature_name}
                      </Text>
                      <Text>Level: {choice.level_id}</Text>
                      <Text>Category: {choice.category}</Text>
                      <Text>Details: {choice.choices}</Text>
                      {choice.category === "Core" ? null : (
                        <Button onClick={() => showClassOption(choice, cls)}>Select Choice</Button>

                      )}
                    </Box>
                  ))}

                {/* Details and descriptions */}
                <Text fontWeight="bold" fontSize="1.5rem">
                  Feature Descriptions
                </Text>
                <Accordion allowToggle>
                  {cls.features &&
                    cls.features
                      .filter((feature) => feature.feature_level === cls.level) // Filtering based on level
                      .map((feature, fIdx) => (
                        <AccordionItem key={fIdx}>
                          <h2>
                            <AccordionButton>
                              <Box
                                flex="1"
                                textAlign="left"
                                fontWeight="bold"
                                fontSize="1rem"
                              >
                                {feature.feature_name} (Level{" "}
                                {feature.feature_level})
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
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Class Option</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Biohacker formData={formData} updateFormData={updateFormData} feature={currentFeatureId} classId={currentClassId}/>

          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Box>
  );
};

export default Step4;
