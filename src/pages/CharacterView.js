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

const CharacterView = () => {
  const contextValue = useContext(SessionContext);
  const { session } = contextValue;
  const navigate = useNavigate();
  const isAuthenticated = !!session;
  const { uuid } = useParams(); // Assuming you've set up routes with UUID
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [healthAdjustment, setHealthAdjustment] = useState(null);
  const [scoresObject, setScoresObject] = useState({});
  const [skillsObject, setSkillsObject] = useState({});
  const [classSkillsArray, setClassSkillsArray] = useState({});
  const [raceAbilityAdjustmentsObject, setRaceAbilityAdjustmentsObject] =
    useState({});
  const [themeAbilityAdjustmentsObject, setThemeAbilityAdjustmentsObject] =
    useState({});
  const [currentInventoryArray, setCurrentInventoryArray] = useState({});
  const [classStatsArray, setClassStatsArray] = useState({});
  const [totalHp, setTotalHp] = useState("")

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

  // Score modifier
  function calculateModifier(score) {
    return Math.floor((score - 10) / 2);
  }

  //parse json data
  useEffect(() => {
    if (character?.scores) {
      setScoresObject(JSON.parse(character.scores));
    }
    if (character?.skills) {
      setSkillsObject(JSON.parse(character.skills));
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
          <Text>{`${character.sex} | ${character.raceName} |  ${character.themeName} |  ${character.className} ${character.characterLevel} `}</Text>
          <Text>Level {character.characterLevel}</Text>
          <Divider mt={2} mb={2} />

          {/* Main Stats */}
          <Box display="flex" justifyContent="space-evenly">
            {Object.keys(scoresObject).map((key) => {
              const score = scoresObject[key];
              const modifier = calculateModifier(score);
              return (
                <Stat key={key}>
                  <Box border="1px solid black" textAlign="center">
                    <StatLabel>{key}</StatLabel>
                    <Box border="1px solid black" textAlign="center" m={4}>
                      <StatNumber>+{modifier}</StatNumber>
                    </Box>
                    <Box border="1px solid black" textAlign="center" m={4}>
                      <StatNumber>{score}</StatNumber>
                    </Box>
                  </Box>
                </Stat>
              );
            })}
            {/* Speed */}
            <Box
              display="flex"
              flexDirection="column"
              border="1px solid black"
              textAlign="center"
              height="9rem"
              justifyContent="space-evenly"
            >
              <Text>Walking</Text>
              <Text fontSize="1.5rem">
                <b>30</b>ft.
              </Text>
              <Text>Speed</Text>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              border="1px solid black"
              textAlign="center"
              justifyContent="space-evenly"
            >
              <Box display="flex" flexDirection="column">
                <Button>Heal</Button>
                <Input border="1px solid black"></Input>
                <Button>Damage</Button>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column"
              border="1px solid black"
              textAlign="center"
              justifyContent="space-evenly">
              <Box
                display="flex"
                
                justifyContent="space-evenly"
              >
                <Text m={1}>Current</Text>
                <Text m={1}>Total</Text>
                <Text m={1}>Temp</Text>
              </Box>
              <Box
                display="flex"
                justifyContent="space-evenly"
              >
                <Text m={1}>{totalHp}</Text>
                /
                <Text m={1}>{totalHp}</Text>
                <Text m={1}>--</Text>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
              >
                <Text>Hit Points</Text>
              </Box>
            </Box>
          </Box>

          {/* Skills */}
          <List spacing={2}>
            {/* Example for skills; you'd likely map over an array of skills in your character object */}
            <ListItem>
              <Text>Acrobatics: +{character.acrobatics}</Text>
            </ListItem>
            {/* ... more skills */}
          </List>

          {/* Features and Traits */}
          <Box mt={4}>
            <Heading size="md">Features & Traits</Heading>
            <Text>{character.features}</Text>
          </Box>

          {/* Equipment */}
          <Box mt={4}>
            <Heading size="md">Equipment</Heading>
            <Text>{character.equipment}</Text>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CharacterView;
