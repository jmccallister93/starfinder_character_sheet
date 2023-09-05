import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext"; // import the hook


const Header = (props) => {
  const { isAuthenticated, userEmail, setIsAuthenticated, setUserEmail } =
    useAuth(); // use the hook

  const logout = () => {
    // Perform logout logic here, and then:
    setIsAuthenticated(false);
    setUserEmail("");
  };

  return (
    <Box bg="teal.400" p={4} color="white">
      <Flex align="center" justifyContent="flex-end">
        <Text p={4}>
          <Link to="/">Home</Link>
        </Text>
        {!isAuthenticated ? (
          <>
            <Text p={4}>
              <Link to="/login">Login</Link>
            </Text>
            <Text p={4}>
              <Link to="/register">Register</Link>
            </Text>
          </>
        ) : (
          <>
            <Text p={4} color='black'>{`Logged in as ${userEmail}`}</Text>
            <Button colorScheme="teal" variant="outline" onClick={logout}>
              Logout
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
