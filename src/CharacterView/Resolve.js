import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Resolve = ({ character }) => {
  const [totalResolve, setTotalResolve] = useState();
  const [currentResolve, setCurrentResolve] = useState();
  useEffect(() => {
    if (character?.resolve) {
      setTotalResolve(character.resolve);
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
          <Text m={1}>{totalResolve}</Text>/<Text m={1}>{totalResolve}</Text>
          <Text m={1}>--</Text>
        </Box>
        <Box display="flex" justifyContent="center">
          <Text>Resolve Points</Text>
        </Box>
      </Box>
    </>
  );
};

export default Resolve;
