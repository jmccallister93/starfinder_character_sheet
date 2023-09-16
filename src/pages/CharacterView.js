import { supabase } from "../client/supabaseClient";
import SessionContext from "../client/SessionContex";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  List,
  ListItem,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import AbilityScores from "../CharacterView/AbilityScores";
import Speed from "../CharacterView/Speed";
import Hp from "../CharacterView/Hp";
import Stamina from "../CharacterView/Stamina";
import Resolve from "../CharacterView/Resolve";
import SavingThrows from "../CharacterView/SavingThrows";
import Skills from "../CharacterView/Skills";
import Proficiencies from "../CharacterView/Proficiencies";
import Initiative from "../CharacterView/Initiative";
import Feats from "../CharacterView/Feats";

const CharacterView = () => {
  const contextValue = useContext(SessionContext);
  const { session } = contextValue;
  const navigate = useNavigate();
  const isAuthenticated = !!session;
  const { uuid } = useParams(); // Assuming you've set up routes with UUID
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [healthAdjustment, setHealthAdjustment] = useState(null);

  const [skillsObject, setSkillsObject] = useState({});
  const [classSkillsArray, setClassSkillsArray] = useState({});
  const [raceAbilityAdjustmentsObject, setRaceAbilityAdjustmentsObject] =
    useState({});
  const [themeAbilityAdjustmentsObject, setThemeAbilityAdjustmentsObject] =
    useState({});
  const [currentInventoryArray, setCurrentInventoryArray] = useState({});
  const [classStatsArray, setClassStatsArray] = useState({});



  // Get data authenictate user
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    // Fetch character details from Supabase
    const fetchCharacter = async () => {
      const { data, error } = await supabase
        .from("DBCharacters")
        .select("*")
        .eq("uuid", uuid)
        .single();

      if (error) {
        console.error("Error fetching character:", error);
        return;
      }

      setCharacter(data);
      setIsLoading(false);
    };

    fetchCharacter();
  }, [isAuthenticated, uuid]);


  //parse json data
  useEffect(() => {
    if (character?.classSkills) {
      setClassSkillsArray(JSON.parse(character.classSkills));
    }
    if (character?.raceAbilityAdjustments) {
      setRaceAbilityAdjustmentsObject(
        JSON.parse(character.raceAbilityAdjustments)
      );
    }
    if (character?.themeAbilityAdjustments) {
      setThemeAbilityAdjustmentsObject(
        JSON.parse(character.themeAbilityAdjustments)
      );
    }
    if (character?.currentInventory) {
      setCurrentInventoryArray(JSON.parse(character.currentInventory));
    }
    if (character?.classStats) {
      setClassStatsArray(JSON.parse(character.classStats));
    }

  }, [character]);

  return (
    <>
      {isLoading === true ? (
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      ) : (
        // TopLeft Header details
        <Box bg="white" p={4} boxShadow="lg" rounded="md">
          <Heading>{character.characterName}</Heading>
          <Text>{`${character.sex} | ${character.raceName} |  ${character.themeName} |  ${character.className} ${character.classLevel} `}</Text>
          <Text>Level {character.classLevel}</Text>
          <Divider mt={2} mb={2} />

          {/* Main Stats */}
          <Flex display="flex" justifyContent="space-evenly">
           <AbilityScores character={character}/>
            {/* Speed */}
           <Speed character={character} />
            {/* health, stamina, resolve */}
            <Box
              display="flex"
              flexDirection="column"
              border="1px solid black"
              textAlign="center"
              justifyContent="space-evenly"
              width="fit-content"
            >
              {/* Heal and damge */}
              <Box display="flex" flexDirection="column">
                <Button>Heal</Button>
                <Input border="1px solid black"></Input>
                <Button>Damage</Button>
              </Box>
            </Box>
            {/* HP */}
           <Hp character={character} />
            {/* Stamina */}
           <Stamina character={character} />
            {/* Resolve */}
            <Resolve character={character} />
          </Flex>

          {/* Saving Throws */}

          <SavingThrows character={character} />


          {/* Skills */}
          <Skills character={character} />

          {/* Initiative */}
         <Initiative character={character} />
         {/* Feats */}
         <Feats character={character} />
          {/* EAC */}
          <Box mt={4}>
            <Heading size="md">EAC</Heading>
          </Box>
          {/* KAC */}
          <Box mt={4}>
            <Heading size="md">KAC</Heading>
          </Box>
          {/* Condiitons */}
          <Box mt={4}>
            <Heading size="md">Conditons</Heading>
          </Box>
          {/* Proficiencies */}
         <Proficiencies character={character} />
          {/* Table for Actions/Spells/Invnentory/Features */}
{/* Actions */}
<Box mt={4}>
            <Heading size="md">Actions</Heading>
          </Box>
          {/* Spells */}
          <Box mt={4}>
            <Heading size="md">Spells</Heading>
          </Box>
          {/* Features */}
          <Box mt={4}>
            <Heading size="md">Features</Heading>
          </Box>
          
          {/* Inventory */}
          <Box mt={4}>
            <Heading size="md">Inventory</Heading>
            <Text>{character.equipment}</Text>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CharacterView;
