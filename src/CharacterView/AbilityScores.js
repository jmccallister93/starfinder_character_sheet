import { Box, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const AbilityScores = ({ character }) => {
  const [scoresObject, setScoresObject] = useState({});
//   Parse scores
  useEffect(() => {
    if (character?.scores) {
      setScoresObject(JSON.parse(character.scores));
    }
  }, [character]);
  // Score modifier
  function calculateModifier(score) {
    return Math.floor((score - 10) / 2);
  }
  return (
    <>
      {Object.keys(scoresObject).map((key) => {
        const score = scoresObject[key];
        const modifier = calculateModifier(score);
        return (
          <Stat key={key}>
            <Box border="1px solid black" textAlign="center">
              <StatLabel>{key}</StatLabel>
              <Box border="1px solid black" textAlign="center" m={4}>
                <StatNumber>+{modifier}</StatNumber>
              </Box>
              <Box border="1px solid black" textAlign="center" m={4}>
                <StatNumber>{score}</StatNumber>
              </Box>
            </Box>
          </Stat>
        );
      })}
    </>
  );
};

export default AbilityScores;
