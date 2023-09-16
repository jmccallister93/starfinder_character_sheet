import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Skills = ({ character }) => {
  const [skills, setSkills] = useState({});

  useEffect(() => {
    if (character?.combinedSkills) {
      setSkills(JSON.parse(character.combinedSkills));
    }
  }, [character]);
  console.log(skills);
  return (
    <>
      <Box
        mt={4}
        border="1px solid black"
        width="fit-content"
        alignItems="start"
      >
        <Heading size="md">Skills</Heading>
        <Flex flexDirection="column" alignItems="start">
          {Object.entries(skills).map(([skillName, skillValue]) => (
            <Flex
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              key={skillName}
              width="100%"
            >
              <Text width="100%">{skillName}</Text>
              <Box border="1px solid black" p={2} >
                +{skillValue}
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default Skills;
