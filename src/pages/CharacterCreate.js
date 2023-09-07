import React, { useState } from "react";
import { Box, Flex, FormControl, Input, Button, Center, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../client/supabaseClient";
import spaceBackground from "../assets/space4.jpg"

const CharacterCreate = () => {
  const [characterName, setCharacterName] = useState("");
  const [race, setRace] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [theme, setTheme] = useState("");

  const { userEmail } = useAuth(); // Assumes you store the user email in the AuthContext
  
  const handleSubmit = async () => {
    try {
      console.log("User Email from Context: ", userEmail);
      console.log("Values to insert: ", { email: userEmail, characterName, race, characterClass, theme });
      const { data, error, status } = await supabase
        .from("userCharacters")
        .insert(
          { 
            email: userEmail, 
            characterName, 
            race, 
            characterClass, 
            theme 
          },
        );
      console.log("Status: ", status);  // Log the status
      if (error) throw error;
      console.log("Character Created: ", data);
    } catch (error) {
      console.log("Error creating character: ", error);
    }
  };
  
  


  return (
    <Center
      h="92.25vh"
      flexDirection="column"
      style={{
        backgroundImage: `url(${spaceBackground})`,
        backgroundSize: "cover",  // Cover the entire container
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",  // Center the image
      }}
    >
      <Box>
        <Heading
          color="white"
          borderRadius="md"
          p={5}
          shadow="md"
          fontSize="4rem"
        >
          Create Character
        </Heading>
      </Box>
      <Flex
        flexDirection="column"
        alignItems="center"
        bg="rgba(0, 0, 0, 0.7)"  // semi-transparent black background
        p={5}
        borderRadius="md"
      >
        <FormControl id="characterName" mb={4}>
          <Input
            placeholder="Character Name"
            onChange={(e) => setCharacterName(e.target.value)}
          />
        </FormControl>
        <FormControl id="race" mb={4}>
          <Input placeholder="Race" onChange={(e) => setRace(e.target.value)} />
        </FormControl>
        <FormControl id="charClass" mb={4}>
          <Input
            placeholder="Class"
            onChange={(e) => setCharacterClass(e.target.value)}
          />
        </FormControl>
        <FormControl id="theme" mb={4}>
          <Input placeholder="Theme" onChange={(e) => setTheme(e.target.value)} />
        </FormControl>
        <Button
          bg="blue.500"
          color="white"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Flex>
    </Center>
  );
};

export default CharacterCreate;