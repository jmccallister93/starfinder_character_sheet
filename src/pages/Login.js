import React, { useState, useEffect } from "react";
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
import { useAuth } from "../contexts/AuthContext";

const Login = (props) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, setIsAuthenticated, setUserEmail } = useAuth();

  useEffect(() => {
    if (location.state && location.state.email) {
      setLoginEmail(location.state.email);
    }
  }, [location.state]);

  const login = async () => {
    try {
      const res = await axios({
        method: "POST",
        data: {
          email: loginEmail,
          password: loginPassword,
        },
        withCredentials: true,
        url: "http://localhost:3001/login",
      });
  
      // If this line executes, the call was successful
     
  
      setIsAuthenticated(true);
      setErrorMsg("");
      if (res.status === 200) {
        console.log('Login successful');
        setIsAuthenticated(true);
        setUserEmail(loginEmail);
        navigate('/');
      }
    } catch (err) {
      // If this block executes, the call failed
      console.log("Axios error:", err);
      setIsAuthenticated(false);
      if (err.response && err.response.data) {
        setErrorMsg(err.response.data);
      }
    }
  };

  return (
    <Center
      h="92.25vh"
      flexDirection="column"
      style={{ background: "linear-gradient(to right, #2F80ED, #56CCF2)" }}
    >
      <Box>
        <Heading
          color="white"
          borderRadius="md"
          p={5}
          shadow="md"
          fontSize="4rem"
        >
          Login
        </Heading>
      </Box>
      <Flex flexDirection="column" alignItems="center">
        <FormControl id="email" mb={4}>
          <Flex>
            <Text color="white" fontSize="1.5rem" p={2} w="100px">
              Email:
            </Text>
            <Input
              placeholder="Email"
              type="email"
              size="lg"
              fontSize="1.5rem"
              w="300px"
              m="1rem"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </Flex>
        </FormControl>
        <FormControl id="password" mb={4}>
          <Flex>
            <Text color="white" fontSize="1.5rem" p={2} w="100px">
              Password:
            </Text>
            <Input
              placeholder="Password"
              type="password"
              size="lg"
              fontSize="1.5rem"
              w="300px"
              m="1rem"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </Flex>
        </FormControl>
        <Button
          fontSize="2rem"
          p="1rem"
          borderRadius="0.25rem"
          bg="#009688"
          color="white"
          border="none"
          onClick={login}
          _hover={{ bg: "#00BFA5", cursor: "pointer", transition: "0.3s" }}
        >
          Submit
        </Button>
      </Flex>
      {errorMsg && <Text color="red.500">{errorMsg}</Text>}
    </Center>
  );
};

export default Login;
