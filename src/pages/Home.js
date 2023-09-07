import React from "react";
import { useAuth } from "../contexts/AuthContext"; // import the hook
import { Box, Flex, Text, Button, Center, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const { isAuthenticated } = useAuth();
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
    <Center h="92.25vh" flexDirection="column" style={{background: "linear-gradient(to left, #7928CA, #FF0080)"}}>
      <Box >
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
          bg="#FF4080"
            color="white"
            variant="solid"
            size="md"
            p="1rem"
            m="1rem"
            border="none"
            borderRadius="0.25rem"
            fontSize="2rem"
            _hover={{ bg: "#00BFA5", cursor: "pointer", transition: "0.3s" }}
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        ) : null}
        <Button
          bg="#9638FF"
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
