import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Hp = ({ character }) => {
  const [totalHp, setTotalHp] = useState("");
  const [currentHp, setCurrentHp] = useState();
  useEffect(() => {
    if (character?.raceHp && character?.classHp) {
      const raceHpValue = parseInt(character.raceHp, 10);
      const classHpValue = parseInt(character.classHp, 10);
      setTotalHp(raceHpValue + classHpValue);
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
          <Text m={1}>{totalHp}</Text>/<Text m={1}>{totalHp}</Text>
          <Text m={1}>--</Text>
        </Box>
        <Box display="flex" justifyContent="center">
          <Text>Hit Points</Text>
        </Box>
      </Box>
    </>
  );
};

export default Hp;
