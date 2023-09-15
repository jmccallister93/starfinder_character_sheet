import { supabase } from "../client/supabaseClient";
import SessionContext from "../client/SessionContex";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Box, Divider, Flex, Heading, List, ListItem, Skeleton, SkeletonCircle, SkeletonText, Stat, StatLabel, StatNumber, Text } from "@chakra-ui/react";

const CharacterView = () => {
  const contextValue = useContext(SessionContext);
  const { session } = contextValue;
  const navigate = useNavigate();
  const isAuthenticated = !!session;
  const { uuid } = useParams(); // Assuming you've set up routes with UUID
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <>
    {isLoading === true ? (
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
    ) : (
      <Box bg="white" p={4} boxShadow="lg" rounded="md">
        <Heading>{character.characterName}</Heading>
        <Text>{`${character.className} ${character.characterLevel}, ${character.raceName}`}</Text>
        <Divider mt={2} mb={2} />

        {/* Main Stats */}
        <Flex>
          {['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'].map((stat) => (
            <Stat key={stat} p={2}>
              <StatLabel>{stat}</StatLabel>
              <StatNumber>{character[stat.toLowerCase()]}</StatNumber> {/* Assuming you have these stats in your character object */}
            </Stat>
          ))}
        </Flex>

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
