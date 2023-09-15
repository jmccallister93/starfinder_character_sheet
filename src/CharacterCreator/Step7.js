import React, { useEffect, useState } from "react";
import { Box, Text, Button, Flex, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody } from "@chakra-ui/react";
import { supabase } from "../client/supabaseClient";
import featPrerequisites from "./featsPrerequisites";

const MAX_FEATS = 1;

const Step7 = ({ updateFormData, formData }) => {
    const [featsList, setFeatsList] = useState([]);
    const [selectedFeats, setSelectedFeats] = useState([]);

    useEffect(() => {
        const fetchFeats = async () => {
            const { data, error } = await supabase.from('feats').select('Name, Prerequisites, Description');

            if (data) {
                setFeatsList(data);
            }
            if (error) {
                console.error("Error fetching feats:", error);
            }
        };

        fetchFeats();
    }, []);

    const toggleFeatSelection = (featName) => {
        setSelectedFeats(prev => {
            if (prev.includes(featName)) {
                return prev.filter(feat => feat !== featName);
            } else if (prev.length < MAX_FEATS) {
                return [...prev, featName];
            } else {
                return prev;
            }
        });
    };

    useEffect(() => {
        updateFormData("feats", selectedFeats);
    }, [selectedFeats]);

    return (
        <Box  color="white"
        background="rgb(50, 50, 50)"
        width="70vw"
        padding="20px"
        borderRadius="10px"
        boxShadow="0px 0px 15px rgba(0,0,0,0.2)" >
            <Text fontSize="2.5rem" mb="20px" borderBottom="2px solid white" paddingBottom="10px" textAlign="center" fontWeight="bold">
                Step 7: Feats
            </Text>

            <Flex direction="column" mb={4} >
                <Text fontSize="1.2rem">Selected Feats ({selectedFeats.length}/{MAX_FEATS}):</Text>
                <Box pl={4} >
                    {selectedFeats.map(feat => (
                        <Text key={feat} fontSize="1.1rem">{feat}</Text>
                    ))}
                </Box>
            </Flex>

            <Flex 
                wrap="wrap" 
                mt={4}
                direction="column"
                height="20rem"
                overflowX="auto"
            >
                {featsList.map((feat, index) => (
                    <Flex key={index} mb={3} w="25%" alignItems="center" justifyContent="center">
                        <Box textAlign="center" flex="1" background="rgb(60, 60, 60)" padding="20px" borderRadius="10px" boxShadow="inset 0px 0px 10px rgba(0,0,0,0.4)">
                            <Text fontSize="1.2rem" p="0.25rem">
                                {feat.Name}
                                <Popover>
                                    <PopoverTrigger>
                                        <Button size="xs" ml="2">
                                            ?
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent bg="black">
                                        <PopoverArrow />
                                        <PopoverHeader>{feat.Name}</PopoverHeader>
                                        <PopoverBody>
                                            <strong>Prerequisites:</strong> 
                                            <br />
                                            {feat.Prerequisites}
                                            <br />
                                            <strong>Description:</strong>
                                            <br />
                                            {feat.Description}
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Text>
                            <Button size="sm" p="1rem" onClick={() => toggleFeatSelection(feat.Name)}>
                                {selectedFeats.includes(feat.Name) ? "Deselect" : "Select"}
                            </Button>
                        </Box>
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
};

export default Step7;
