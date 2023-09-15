import { Box, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Step8 = ({ updateFormData, formData }) => {
  const [remainingCredits, setRemainingCredits] = useState(1000);
  const [currentInventory, setCurrentInventory] = useState("test");
  // useEffect(() => {
  //     setRemainingCredits(formData.remainingCredits?.value)
  // }, [])

  return (
    <Box
      color="white"
      background="rgb(50, 50, 50)"
      width="70vw"
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
        Step 8: Equipment
      </Text>
      <Box
        color="white"
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        background="rgb(60, 60, 60)"
        padding="20px"
        borderRadius="10px"
        boxShadow="inset 0px 0px 10px rgba(0,0,0,0.4)"
      >
        <Text>
          <b>Inventory: </b>
          {currentInventory}
        </Text>
        <Text>
          <b>Credits: </b> {remainingCredits}
        </Text>
      </Box>

      <Box>
        <Text></Text>
      </Box>
      <Button>Search Equipment</Button>
    </Box>
  );
};

export default Step8;
