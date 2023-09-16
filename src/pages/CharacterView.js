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
  const [totalHp, setTotalHp] = useState("");
  const [currentHp, setCurrentHp] = useState();
  const [totalStamina, setTotalStamina] = useState()
  const [currentStamina, setCurrentStamina] = useState()
  const [totalResolve, setTotalResolve] = useState()
  const [currentResolve, setCurrentResolve] = useState()

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

    if (character?.combineSkills) {
      setSkillsObject(JSON.parse(character.combineSkills));
    }
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
    if (character?.raceHp && character?.classHp) {
      const raceHpValue = parseInt(character.raceHp, 10);
      const classHpValue = parseInt(character.classHp, 10);
      setTotalHp(raceHpValue + classHpValue);
    }
    if(character?.stamina){
      setTotalStamina(character.stamina)
    }
    if(character?.resolve){
      setTotalResolve(character.resolve)
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
                <Text m={1}>{totalStamina}</Text>/<Text m={1}>{totalStamina}</Text>
                <Text m={1}>--</Text>
              </Box>
              <Box display="flex" justifyContent="center">
                <Text>Stamina Points</Text>
              </Box>
            </Box>
            {/* Resolve */}
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
                <Text m={1}>{totalResolve}</Text>/<Text m={1}>{totalResolve}</Text>
                <Text m={1}>--</Text>
              </Box>
              <Box display="flex" justifyContent="center">
                <Text>Resolve Points</Text>
              </Box>
            </Box>
          </Flex>

          {/* Saving Throws */}
          <Flex flexDirection="column">
            <Heading size="md">Savings Throws</Heading>
            <Box display="flex" alignItems="center" mb={2}>
              <Text mr={2}>Fortitude Save</Text>
              <Box border="1px solid black" p={2} display="inline-block">
                +3
              </Box>
            </Box>

            <Box display="flex" alignItems="center" mb={2}>
              <Text mr={2}>Reflex Save</Text>
              <Box border="1px solid black" p={2} display="inline-block">
                +3
              </Box>
            </Box>

            <Box display="flex" alignItems="center" mb={2}>
              <Text mr={2}>Will Save</Text>
              <Box border="1px solid black" p={2} display="inline-block">
                +3
              </Box>
            </Box>
            
          </Flex>


          {/* Skills */}
          <Box mt={4}>
            <Heading size="md">Skills</Heading>
            <Flex flexDirection="column">
              {Object.entries(skillsObject).map(([skillName, skillValue]) => (
                <Box display="flex" alignItems="center" mb={2} key={skillName}>
                  <Text mr={2}>{skillName}</Text>
                  <Box border="1px solid black" p={2} display="inline-block">
                    {skillValue}
                  </Box>
                </Box>
              ))}
            </Flex>
          </Box>

          {/* Initiative */}
          <Box mt={4}>
            <Heading size="md">Initiative</Heading>
          </Box>
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
          <Box mt={4}>
            <Heading size="md">Proficiencies</Heading>
          </Box>
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
