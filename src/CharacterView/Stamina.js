import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Stamina = ({ character }) => {
  const [totalStamina, setTotalStamina] = useState();
  const [currentStamina, setCurrentStamina] = useState();

  useEffect(() => {
    if (character?.stamina) {
      setTotalStamina(character.stamina);
    }
  }, [character]);
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        border="1px solid black"
        textAlign="center"
        justifyContent="space-evenly"
      >
        <Box display="flex" justifyContent="space-evenly">
          <Text m={1}>Current</Text>
          <Text m={1}>Total</Text>
          <Text m={1}>Temp</Text>
        </Box>
        <Box display="flex" justifyContent="space-evenly">
          <Text m={1}>{totalStamina}</Text>/<Text m={1}>{totalStamina}</Text>
          <Text m={1}>--</Text>
        </Box>
        <Box display="flex" justifyContent="center">
          <Text>Stamina Points</Text>
        </Box>
      </Box>
    </>
  );
};

export default Stamina;
