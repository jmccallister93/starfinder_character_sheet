import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  Input,
  Button,
  Center,
  Heading,
  Text,
} from "@chakra-ui/react";
import { supabase } from "../client/supabaseClient";
import spaceBackground from "../assets/space4.jpg";
import SessionContext from "../client/SessionContex";
import { useNavigate, useLocation } from "react-router-dom";

const CharacterCreate = () => {
  const contextValue = React.useContext(SessionContext);
  const { session, signOut } = contextValue;
  const [name, setName] = useState("");
  const [size, setSize] = useState("")
  const [race, setRace] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [theme, setTheme] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = !!session; // Check if the session 

  useEffect(() => {
    if(!isAuthenticated){
      navigate("/");
    }
  }, [isAuthenticated])

  // Access properties from the session object
  const userEmail = session?.session?.user?.email;
  const token = session?.access_token; 

  const handleSubmit = async () => {
    try {
      const { data, error, status } = await supabase
        .from("DBCharacter")
        .insert({
          email: userEmail,
          name: name,
          size: size,
          // speed,
          // hp,
          // stamina,
          // resolve,
          // theme,
          // archtype,
          // specialisation,
          // baseAttackBonus,
          // currentHp,
          // currentStamina,
          // currentResolve,
          // abilityScores,
          // savingThrows,
          // skills,
          // equipment,
          // ac,
          // kc,
          // bulk,
          // feats,
          // initative,
          // meleeAttack,
          // rangedAttack,
          // thrownAttack,
          // weapons,
          // ammunition,
          // resistances,
          // armorType,
          // abilities,
          // spells,
        })
        .select();
      console.log("Status: ", status); // Log the status
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
        backgroundSize: "cover", // Cover the entire container
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center", // Center the image
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
        bg="rgba(0, 0, 0, 0.7)" // semi-transparent black background
        p={5}
        borderRadius="md"
      >
        <FormControl id="characterName" mb={4}>
          <Input
            placeholder="Character Name"
            onChange={(e) => setName(e.target.value)}
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
          <Input
            placeholder="Theme"
            onChange={(e) => setTheme(e.target.value)}
          />
        </FormControl>
        <Button bg="blue.500" color="white" onClick={handleSubmit}>
          Submit
        </Button>
      </Flex>
    </Center>
  );
};

export default CharacterCreate;
