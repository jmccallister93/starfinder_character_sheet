import React, { useContext } from "react";
// import SessionContext from "../client/SessionContext"
import { Box, Flex, Text, Button, Center, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SessionContext from "../client/SessionContex";

const Home = (props) => {
  const { session } = useContext(SessionContext);

  const isAuthenticated = !!session; // Check if the session
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/register");
  };

  const handleSignin = () => {
    navigate("/login");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <Center
      h="92.25vh"
      flexDirection="column"
      style={{ background: "linear-gradient(to left, #7928CA, #FF0080)" }}
    >
      <Box>
        <Heading
          color="white"
          borderRadius="md"
          p={5}
          shadow="md"
          fontSize="4rem"
        >
          Welcome to Starfinder Character Creator
        </Heading>
      </Box>
      <Flex>
        {!isAuthenticated ? (
          <Button
            bg="#2F80ED"
            color="white"
            variant="solid"
            size="md"
            p="1rem"
            m="1rem"
            border="none"
            borderRadius="0.25rem"
            fontSize="2rem"
            _hover={{ bg: "#56CCF2", cursor: "pointer", transition: "0.3s" }}
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        ) : null}
        <Button
          bg="#16A085"
          color="white"
          variant="outline"
          size="md"
          p="1rem"
          m="1rem"
          border="none"
          borderRadius="0.25rem"
          fontSize="2rem"
          onClick={() => {
            isAuthenticated ? handleDashboard() : handleSignin();
          }}
          _hover={{ bg: "#00BFA5", cursor: "pointer", transition: "0.3s" }}
        >
          {isAuthenticated ? "Visit Dashboard" : "Sign In"}
        </Button>
      </Flex>
    </Center>
  );
};

export default Home;
