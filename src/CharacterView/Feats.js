import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Feats = ({character}) => {
    const [feats, setFeats] = useState([]);
    useEffect(() => {
        if(character?.feats){
            setFeats(JSON.parse(character.feats));
        }
    }, [character]);
    
    return (
      <>
        <Box mt={4} border="1px solid black" width="fit-content">
          <Heading size="md">Feats</Heading>
          {feats && feats.map((feat, index) => (
            <Box key={index} m={2} p={1} border="1px solid black">
              <Text fontWeight="bold">{feat.Name}</Text>
              <Text><strong>Prerequisites:</strong> {feat.Prerequisites}</Text>
              <Text><strong>Description:</strong> {feat.Description}</Text>
            </Box>
          ))}
        </Box>
      </>
    );
}

export default Feats;
