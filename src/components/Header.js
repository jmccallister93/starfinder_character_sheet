import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text, Button, Spacer } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext"; // import the hook

const Header = (props) => {
  const { isAuthenticated, userEmail, setIsAuthenticated, setUserEmail } = useAuth();

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail("");
  };

  return (
    <Box bg="black" p={4} color="white" h="7vh" justifyContent="center" textAlign="center">
      <Flex align="center">
        <Text p={4} fontSize="xl">
          <Link style={{ fontSize: '1.5rem', textDecoration: 'none', color: 'white' }} to="/">Home</Link>
        </Text>
        <Text p={4} fontSize="xl">
          <Link 
            style={{ fontSize: '1.5rem', textDecoration: 'none', color: 'white' }} 
            to={isAuthenticated ? "/dashboard" : "/login"}>
            Dashboard
          </Link>
        </Text>
        <Spacer />
        {!isAuthenticated ? (
          <>
            <Text p={4} fontSize="xl">
              <Link style={{ fontSize: '1.5rem', textDecoration: 'none', color: 'white' }} to="/login">Login</Link>
            </Text>
            <Text p={4} fontSize="xl">
              <Link style={{ fontSize: '1.5rem', textDecoration: 'none', color: 'white' }} to="/register">Register</Link>
            </Text>
          </>
        ) : (
          <>
            <Text p={4} color='white' fontSize="xl">{`Logged in as ${userEmail}`}</Text>
            <Button colorScheme="pink" variant="solid" onClick={logout}>
              Logout
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
