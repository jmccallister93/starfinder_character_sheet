import { supabase } from "../client/supabaseClient";
import SessionContext from "../client/SessionContex";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Box, List, ListItem, Text, Link } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

const CharacterListView = () => {
  const contextValue = useContext(SessionContext);
  const { session } = contextValue;
  const navigate = useNavigate();
  const isAuthenticated = !!session;
  const userEmail = session?.session?.user?.email; // Fetch email from session
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    const fetchCharacters = async () => {
      const { data, error } = await supabase
        .from("DBCharacters")
        .select("*")
        .eq("email", userEmail);

      if (error) {
        console.error("Error fetching characters:", error);
        return;
      }

      setCharacters(data);
    };

    fetchCharacters();
  }, [isAuthenticated, userEmail]);

  return (
    <Box
      color="black"
      background="rgba(255, 255, 255, 0.50)"  // Slightly transparent white for a frosted look
      padding="20px"
      borderRadius="10px"
    >
      <List spacing={2}>
        {characters.map((character) => (
          <ListItem key={character.id}>
            <Link 
              href="#" 
              onClick={() => navigate(`/character/${character.id}`)}
              _hover={{ textDecoration: 'underline', color: 'orange' }} // Add hover effect
            >
              {character.characterName}
              <SmallCloseIcon />
              {character.raceName}
              <SmallCloseIcon />
              {character.className}
              <SmallCloseIcon />
              {character.chracterLevel}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CharacterListView;
