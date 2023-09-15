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
import SessionContext from "../client/SessionContex";
import CharacterListView from "../CharacterView/CharacterListView";

const Dashboard = (props) => {
  const { session, signOut } = React.useContext(SessionContext); // Use the new context here
  const isAuthenticated = !!session; // Check if the session 
  const navigate = useNavigate();

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
      h="91vh"
    //   flexDirection="column"
      style={{
        background: "linear-gradient(to right, #F2994A, #F2C94C)",
      }}
    >
      <Box >
        <Heading
          color="white"
          borderRadius="md"
          
          fontSize="6rem"
          p="2rem"
        >
          Dashboard
        </Heading>
      </Box>
     
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
            p="2rem"
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
          <Heading fontSize="2rem" color="white" mb={2} mt={4}>
            View Character
          </Heading>
          <CharacterListView />
        </Flex>
      </Flex>
    </Center>
  );
};

export default Dashboard;