import React, { useContext, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Center,
  Heading,
  Input,
  FormControl,
  useConst,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const { session } = useContext();

  const validatePassword = (password) => {
    // Assuming you require at least 6 characters as mentioned in the Supabase settings
    return password.length >= 6;
  };

  const validateEmail = (email) => {
    // Basic email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const register = () => {
    if (!validatePassword(registerPassword) || !validateEmail(registerEmail)) {
      setErrorMsg("Invalid email or password");
      return;
    }

    axios({
      method: "POST",
      data: {
        email: registerEmail,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:3001/register",
    })
      .then((res) => {
        setErrorMsg("");
        setSuccessMsg("Registration successful. A verification email has been sent to you.");
        navigate('/login', { state: { email: registerEmail }}); // Navigate to login with email as state
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          if (err.response.data.includes("Email already in use")) {
            setErrorMsg("Email already in use.");
            navigate('/login', { state: { email: registerEmail }}); // Navigate to login with email as state
          } else {
            setErrorMsg("An error occurred.");
          }
        }
      });
  };

  return (
    <Center
      h="92.25vh"
      flexDirection="column"
      style={{ background: "linear-gradient(to right, #16A085, #2ECC71)" }}
    >
      <Box>
        <Heading
          color="white"
          borderRadius="md"
          p={5}
          shadow="md"
          fontSize="4rem"
        >
          Register
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
              onChange={(e) => setRegisterEmail(e.target.value)}
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
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </Flex>
        </FormControl>
        <Text fontSize="1rem" color="white">
          Password should be at least 6 characters.
        </Text>
        <Button
          fontSize="2rem"
          p="1rem"
          borderRadius="0.25rem"
          bg="#10AC84"
          color="white"
          border="none"
          _hover={{ bg: "#0D8B70", cursor: "pointer", transition: "0.3s" }}
          onClick={register}
        >
          Submit
        </Button>
      </Flex>
      {errorMsg && <Text color="red.500">{errorMsg}</Text>}
      {successMsg && <Text color="green.500">{successMsg}</Text>}
    </Center>
  );
};

export default Register;
