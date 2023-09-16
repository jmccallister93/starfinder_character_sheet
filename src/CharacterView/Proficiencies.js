import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Proficiencies = ({character}) => {
    const [proficiencies, setProficiencies] = useState()
    useEffect(() =>{
        if(character?.proficiencies){
            setProficiencies(JSON.parse(character.proficiencies))
        }
    },[character])

    console.log(proficiencies)

    return ( <><Box mt={4} border="1px solid black" width="fit-content"> 
        <Heading size="md">Proficiencies</Heading>
        {proficiencies.map((proficiency, index) => (
            <Box key={index} mb={2}>
                <Text fontWeight="bold">{proficiency.proficiency_type}:</Text>
                <Text>{proficiency.description}</Text>
            </Box>
        ))}
    </Box></> );
}
 
export default Proficiencies;