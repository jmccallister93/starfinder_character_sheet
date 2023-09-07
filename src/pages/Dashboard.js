import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Center,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/"); // Redirect to homepage if not authenticated
    }
  }, [isAuthenticated, navigate]);

const handleCreate = () =>{
    navigate("/characterCreate")
}

  return (
    <Center
      h="92.25vh"
    //   flexDirection="column"
      style={{
        background: "linear-gradient(to right, #F2994A, #F2C94C)",
      }}
    >
      <Box >
        <Heading
          color="white"
          borderRadius="md"
          shadow="md"
          fontSize="6rem"
          p="2rem"
        >
          Dashboard
        </Heading>
      </Box>
      <Divider borderColor="white" />
      <Flex flexDirection="column" alignItems="center" w="100%" mt={8} p="2rem">
        <Flex
          flexDirection="column"
          w="100%"
          mb={8}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            bg="#009688"
            color="white"
            variant="solid"
            size="md"
            p="1rem"
            m="1rem"
            border="none"
            borderRadius="0.25rem"
            fontSize="2rem"
            w="30vw"
            _hover={{ bg: "#00BFA5", cursor: "pointer", transition: "0.3s" }}
            onClick={handleCreate}
          >
            Create Charcter
          </Button>
          <Heading fontSize="2rem" color="white" mb={4}>
            View Characters
          </Heading>
          {/* Your View Characters component or logic can go here */}
        </Flex>
      </Flex>
    </Center>
  );
};

export default Dashboard;