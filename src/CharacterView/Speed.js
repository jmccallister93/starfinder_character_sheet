import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Speed = ({ character }) => {
  const [speed, setSpeed] = useState();
  const [adjustedSpeed, setAdjustedSpeed] = useState();
  // Get speed form character
  useEffect(() => {
    setSpeed(character.speed);
  }, [character]);

  // Some Logic with adjsuting speed based on weight

  return (
    <>
      {" "}
      <Box
        display="flex"
        flexDirection="column"
        border="1px solid black"
        textAlign="center"
        height="9rem"
        justifyContent="space-evenly"
      >
        <Text>Walking</Text>
        <Text fontSize="1.5rem">
          <b>30</b>ft.
        </Text>
        <Text>Speed</Text>
      </Box>
    </>
  );
};

export default Speed;
