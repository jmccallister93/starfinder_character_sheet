import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Initiative = ({ character }) => {
  const [initiative, setInitiative] = useState();
  const [scoresObject, setScoresObject] = useState({});
  //   Parse scores
  useEffect(() => {
    if (character?.scores) {
      setScoresObject(JSON.parse(character.scores));
    }
  }, [character]);
  function calculateModifier(score) {
    return Math.floor((score - 10) / 2);
  }
  useEffect(() => {
    if (scoresObject.DEX) {
      const dexModifier = calculateModifier(scoresObject.DEX);
      setInitiative(dexModifier);
    }
  }, [scoresObject]);

  return (
    <>
      <Flex
        flexDirection="column"
        mt={4}
        border="1px solid black"
        width="fit-content"
        alignItems="start"
      >
        <Heading size="md">Initiative</Heading>
        <Box
          display="flex"
          alignItems="center"
          mb={2}
          justifyContent="center"
          width="100%"
        >
          <Box border="1px solid black" p={2}>
            +
            {initiative !== undefined && initiative !== null ? initiative : "0"}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Initiative;
