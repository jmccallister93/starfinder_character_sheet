import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Proficiencies = ({ character }) => {
  const [proficiencies, setProficiencies] = useState();
  useEffect(() => {
    if (character?.proficiencies) {
      setProficiencies(JSON.parse(character.proficiencies));
    }
  }, [character]);

  return (
    <>
      <Box mt={4} border="1px solid black" width="fit-content">
        <Heading size="md">Proficiencies</Heading>
        {proficiencies && proficiencies.map((proficiency, index) => (
          <Box key={index} m={2} p={1} border="1px solid black">
            <Text fontWeight="bold">{proficiency.proficiency_type}:</Text>
            <Text>{proficiency.description}</Text>
          </Box>
        ))}
      </Box>
    </>
);

};

export default Proficiencies;
