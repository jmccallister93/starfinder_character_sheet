import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Flex, Text, Button, Spacer } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import SessionContext from "../client/SessionContex";
import { supabase } from "../client/supabaseClient";

const Header = (props) => {
  const contextValue = React.useContext(SessionContext);
  const { session, signOut } = contextValue;
  const isAuthenticated = !!session; // Check if the session
  const userEmail = session?.session?.user?.email || "";
  const [characters, setCharacters] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCharacters();
    }

    if (location.pathname === "/dashboard") {
      fetchCharacters();
    }
  }, [isAuthenticated, location]);

  const fetchCharacters = async () => {
    const { data, error } = await supabase
      .from("DBCharacters")
      .select("uuid, characterName")
      .eq("email", userEmail);

    if (error) {
      console.error("Error fetching characters:", error);
      return;
    }

    setCharacters(data);
  };

  return (
    <Box
      bg="black"
      p={4}
      color="white"
      h="9vh"
      justifyContent="center"
      textAlign="center"
    >
      <Flex align="center">
        <Text
          p={4}
          fontSize="xl"
          _hover={{ bg: "#00BFA5", cursor: "pointer", transition: "0.3s" }}
        >
          <Link
            style={{
              fontSize: "1.5rem",
              textDecoration: "none",
              color: "white",
            }}
            to="/"
          >
            Home
          </Link>
        </Text>
        <Text fontSize="1.5rem">|</Text>
        <Text
          p={4}
          fontSize="xl"
          _hover={{ bg: "#00BFA5", cursor: "pointer", transition: "0.3s" }}
        >
          <Link
            style={{
              fontSize: "1.5rem",
              textDecoration: "none",
              color: "white",
            }}
            to={isAuthenticated ? "/dashboard" : "/login"}
          >
            Dashboard
          </Link>
        </Text>
        {isAuthenticated ? (
          <>
            <Text fontSize="1.5rem">|</Text>

            <Text
              p={4}
              fontSize="xl"
              _hover={{ bg: "#00BFA5", cursor: "pointer", transition: "0.3s" }}
            >
              <Link
                style={{
                  fontSize: "1.5rem",
                  textDecoration: "none",
                  color: "white",
                }}
                to={isAuthenticated ? "/characterCreate" : "/login"}
              >
                Character Create
              </Link>
            </Text>
            <Text fontSize="1.5rem">|</Text>
            <Text>
              <Menu>
                <MenuButton
                  border="none"
                  background="black"
                  color="white"
                  fontSize="1.5rem"
                  p={4}
                  // fontSize="xl"
                  _hover={{
                    bg: "#00BFA5",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                >
                  Character View
                </MenuButton>
                <MenuList background="black">
                  {characters.map((character) => (
                    <Link
                      to={`/characterView/${character.uuid}`}
                      background="black"
                    >
                      <MenuItem
                        key={character.uuid}
                        background="black"
                        _hover={{ bg: "#00BFA5" }}
                      >
                        {character.characterName}
                      </MenuItem>
                    </Link>
                  ))}
                </MenuList>
              </Menu>
            </Text>
          </>
        ) : null}
        <Spacer />
        {!isAuthenticated ? (
          <>
            <Text
              p={4}
              fontSize="xl"
              _hover={{ bg: "#00BFA5", cursor: "pointer", transition: "0.3s" }}
            >
              <Link
                style={{
                  fontSize: "1.5rem",
                  textDecoration: "none",
                  color: "white",
                }}
                to="/login"
              >
                Login
              </Link>
            </Text>
            <Text fontSize="1.5rem">|</Text>
            <Text
              p={4}
              fontSize="xl"
              _hover={{ bg: "#00BFA5", cursor: "pointer", transition: "0.3s" }}
            >
              <Link
                style={{
                  fontSize: "1.5rem",
                  textDecoration: "none",
                  color: "white",
                }}
                to="/register"
              >
                Register
              </Link>
            </Text>
          </>
        ) : (
          <>
            <Text
              p={4}
              color="white"
              fontSize="1.5rem"
            >{`Logged in as ${userEmail}`}</Text>
            <Button
              fontSize="1.5rem"
              border="none"
              borderRadius="0.25rem"
              colorScheme="pink"
              variant="solid"
              _hover={{ bg: "red", transition: "0.3s" }}
              p="0.25rem"
              onClick={signOut}
            >
              Logout
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
