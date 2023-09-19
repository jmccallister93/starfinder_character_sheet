import { Box, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../client/supabaseClient";

const Step4 = ({formData, updateFormData}) => {
    const [allClasses, setAllClasses] = useState([])

   // Fetches Abilities(features)
   const fetchClassAbilities = async (classId) => {
    const result = await supabase
        .from("classChoices")
        .select("*")
        .eq("class_id", classId);
    console.log("Class Choicess ", result.data);

    return result.data || [];
};

  useEffect(() => {
    // When formData changes, fetch abilities for each class and update allClasses
    (async () => {
        const classesWithAbilities = await Promise.all(
            formData.classes.map(async (cls) => {
                const abilities = await fetchClassAbilities(cls.id);
                return {
                    ...cls,
                    abilities: abilities
                };
            })
        );

        setAllClasses(classesWithAbilities);
    })();
}, [formData]);
  
  
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
                { formData?.classes && formData?.classes.map((cls, idx) => (
                    <Box key={idx}>
                        <Text fontSize="1.2rem">Class: {cls.Name} | Level: {cls.level}</Text>
                        {/* 3. Render out abilities for each class */}
                        <VStack spacing={2} alignItems="start">
                            {cls.abilities.map((ability, aIdx) => (
                                <Text key={aIdx} fontSize="1rem">
                                    {ability.ability_name} (Level {ability.level_id}): {ability.ability_description}
                                </Text>
                            ))}
                        </VStack>
                    </Box>
                ))}
            </VStack>
      </Box> );
}
 
export default Step4;