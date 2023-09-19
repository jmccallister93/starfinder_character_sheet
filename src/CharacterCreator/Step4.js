import { Box, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../client/supabaseClient";

const Step4 = ({formData, updateFormData}) => {
    const [allClasses, setAllClasses] = useState([])

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
  
//   Set all classes

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
       <VStack spacing={3}>
    {formData?.classes && formData.classes.map((cls, idx) => (
        <Box key={idx}>
            <Text fontSize="1.2rem">Class: {cls.Name} | Level: {cls.level}</Text>
            <VStack spacing={2} alignItems="start">
                {cls.features && cls.features
                    .filter(feature => feature.feature_level === cls.level) // Filtering based on level
                    .map((feature, fIdx) => (
                    <Text key={fIdx} fontSize="1rem">
                        <b>{feature.feature_name}</b> (Level {feature.feature_level}): {formatFeatureText(feature.feature_description)}
                    </Text>
                ))}
            </VStack>
        </Box>
    ))}
</VStack>

      </Box> );
}
 
export default Step4;