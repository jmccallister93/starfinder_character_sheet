import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text, Button, Spacer } from "@chakra-ui/react";
import SessionContext from "../client/SessionContex";
import { supabase } from "../client/supabaseClient";

const Header = (props) => {
  const contextValue = React.useContext(SessionContext);
  const { session, signOut } = contextValue;
  const isAuthenticated = !!session; // Check if the session 
  const userEmail = session?.session?.user?.email || "";

  return (
    <Box
      bg="black"
      p={4}
      color="white"
      h="7vh"
      justifyContent="center"
      textAlign="center"
    >
      <Flex align="center" >
        <Text p={4} fontSize="xl"  _hover={{ bg: "#00BFA5", cursor: "pointer", transition: "0.3s" }}>
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
        <Text fontSize="1.5rem" >|</Text>
        <Text p={4} fontSize="xl"  _hover={{ bg: "#00BFA5", cursor: "pointer", transition: "0.3s" }}>
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
            <Text p={4} fontSize="xl"  _hover={{ bg: "#00BFA5", cursor: "pointer", transition: "0.3s" }}>
              <Link
                style={{
                  fontSize: "1.5rem",
                  textDecoration: "none",
                  color: "white",
                }}
                to={isAuthenticated ? "/characterView" : "/login"}
              >
                Character View
              </Link>
            </Text>
            <Text fontSize="1.5rem">|</Text>
            <Text p={4} fontSize="xl"  _hover={{ bg: "#00BFA5", cursor: "pointer", transition: "0.3s" }}>
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
          </>
        ) : null}
        <Spacer />
        {!isAuthenticated ? (
          <>
            <Text p={4} fontSize="xl"  _hover={{ bg: "#00BFA5", cursor: "pointer", transition: "0.3s" }}>
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
            <Text p={4} fontSize="xl"  _hover={{ bg: "#00BFA5", cursor: "pointer", transition: "0.3s" }}>
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
            <Text p={4} color="white" fontSize="1.5rem">{`Logged in as ${userEmail}`}</Text>
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
