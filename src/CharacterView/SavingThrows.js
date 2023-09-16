import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const SavingThrows = ({ character }) => {
  const [fortSave, setFortSave] = useState();
  const [refSave, setRefSave] = useState();
  const [willSave, setWillSave] = useState();
  useEffect(() => {
    if (character?.fortSave) {
      setFortSave(character.fortSave);
    }
    if (character?.refSave) {
      setRefSave(character.refSave);
    }
    if (character?.willSave) {
      setWillSave(character.willSave);
    }
  }, [character]);
  return (
    <>
      <Flex
        flexDirection="column"
        mt={4}
        border="1px solid black"
        width="fit-content"
        alignItems="start"
        
      >
        <Heading size="md">Savings Throws</Heading>
        <Box display="flex" alignItems="center" mb={2} justifyContent="space-between" width="100%">
          <Text mr={2}>Fortitude Save</Text>
          <Box border="1px solid black" p={2} display="inline-block">
            +{fortSave !== undefined && fortSave !== null ? fortSave : "0"}
          </Box>
        </Box>

        <Box display="flex" alignItems="center" mb={2} justifyContent="space-between" width="100%">
          <Text mr={2}>Reflex Save</Text>
          <Box border="1px solid black" p={2} display="inline-block">
            +{refSave !== undefined && refSave !== null ? refSave : "0"}
          </Box>
        </Box>

        <Box display="flex" alignItems="center" mb={2} justifyContent="space-between" width="100%">
          <Text mr={2}>Will Save</Text>
          <Box border="1px solid black" p={2} display="inline-block">
            +{willSave !== undefined && willSave !== null ? willSave : "0"}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default SavingThrows;
