import { supabase } from "../client/supabaseClient";
import SessionContext from "../client/SessionContex";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Box, List, ListItem, Text, Link } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import "primeicons/primeicons.css";
import { PrimeIcons } from "primereact/api";

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
      .eq("email", userEmail);;

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
      background="rgba(255, 255, 255, 0.50)" // Slightly transparent white for a frosted look
      padding="20px"
      borderRadius="10px"
    >
      <List spacing={2}>
        {characters.map((character) => (
          <ListItem key={character.uuid}>
            <Link
              href="#"
              onClick={() => navigate(`/CharacterView/${character.uuid}`)}
              _hover={{ textDecoration: "underline", color: "orange" }}
              fontSize="1rem"
            >
              <i
                className="pi pi-chevron-right"
                style={{
                  fontSize: "0.75rem",
                  margin: "0.25rem",
                  verticalAlign: "middle",
                }}
              ></i>
              {character.characterName}
              <i
                className="pi pi-circle-fill"
                style={{
                  fontSize: "0.3rem",
                  margin: "0.25rem",
                  verticalAlign: "middle",
                }}
              ></i>
              {character.raceName}
              <i
                className="pi pi-circle-fill"
                style={{
                  fontSize: "0.3rem",
                  margin: "0.25rem",
                  verticalAlign: "middle",
                }}
              ></i>
              {character.className}
              <i
                className="pi pi-circle-fill"
                style={{
                  fontSize: "0.3rem",
                  margin: "0.25rem",
                  verticalAlign: "middle",
                }}
              ></i>
              {character.themeName}
              <i
                className="pi pi-circle-fill"
                style={{
                  fontSize: "0.3rem",
                  margin: "0.25rem",
                  verticalAlign: "middle",
                }}
              ></i>
              Lvl {character.characterLevel}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CharacterListView;
