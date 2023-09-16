import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Features = ({ character }) => {
    const [classFeatures, setClassFeatures] = useState([]);

    useEffect(() => {
        if (character?.features) {
            setClassFeatures(JSON.parse(character.features));
        }
    }, [character]);

    const classLevel = character?.classLevel || 0;

    return (
        <>
            <Box mt={4} border="1px solid black" width="fit-content">
                <Heading size="md">Class Features</Heading>
                {classFeatures.filter(feature => feature.ability_level <= classLevel).map((feature, index) => (
                    <Box key={index} m={2} p={1} border="1px solid black">
                        <Text fontWeight="bold">{feature.ability_name}</Text>
                        <Text><strong>Level:</strong> {feature.ability_level}</Text>
                        <Text><strong>Description:</strong> {feature.ability_description}</Text>
                    </Box>
                ))}
            </Box>
        </>
    );
}

export default Features;
