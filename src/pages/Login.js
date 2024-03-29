import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Text,
  Button,
  Center,
  Heading,
  Input,
  FormControl,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../client/supabaseClient";
import SessionContext from "../client/SessionContex";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState();
  const { updateSession } = useContext(SessionContext);

  async function signInWithEmail(email, password) {
    if (!email || !password) {
      setErrorMessage(<h2>Please fill out all fields</h2>);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error.message);
      setErrorMessage(<h2>{error.message}</h2>);
    } else {
      // Fetch the session after successfully logging in
      const { data: currentSession, error: sessionError } =
        await supabase.auth.getSession();
      if (currentSession) {
        setSession(currentSession);
        updateSession(currentSession);
        const lastUrl = sessionStorage.getItem("lastUrl");
        navigate(lastUrl || "/");
      } else if (sessionError) {
        console.log("Error fetching session:", error.message);
      }
    }
  }

  //Submit login
  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmail(email, password);
  };
  return (
    <Center
      h="91vh"
      flexDirection="column"
      style={{ background: "linear-gradient(to right, #2F80ED, #56CCF2)" }}
    >
      <Box>
        <Heading
          color="white"
          borderRadius="md"
          p={5}
          
          fontSize="4rem"
        >
          Login
        </Heading>
      </Box>
      <Flex flexDirection="column" alignItems="center">
        <FormControl id="email" mb={4}>
          <Flex>
            <Text color="white" fontSize="2rem" p={4} w="8rem">
              Email:
            </Text>
            <Input
              placeholder="Email"
              type="email"
              size="lg"
              fontSize="1.5rem"
              w="300px"
              m="1rem"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Flex>
        </FormControl>
        <FormControl id="password" mb={4}>
          <Flex>
            <Text color="white" fontSize="2rem" p={4} w="12rem">
              Password:
            </Text>
            <Input
              placeholder="Password"
              type="password"
              size="lg"
              fontSize="1.5rem"
              w="300px"
              m="1rem"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Flex>
        </FormControl>
        <Button
          fontSize="2rem"
          p="2rem"
          borderRadius="0.25rem"
          bg="#009688"
          color="white"
          border="none"
          onClick={handleSubmit}
          _hover={{ bg: "#00BFA5", cursor: "pointer", transition: "0.3s" }}
        >
          Submit
        </Button>
      </Flex>
      {errorMessage && <Text color="red.500">{errorMessage}</Text>}
    </Center>
  );
};

export default Login;
