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
import SessionContext from "../client/SessionContex";
import { supabase } from "../client/supabaseClient";


const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const { updateSession } = useContext(SessionContext);

  const validatePassword = (password) => {
    // Assuming you require at least 6 characters as mentioned in the Supabase settings
    return password.length >= 6;
  };

  const validateEmail = (email) => {
    // Basic email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const register = async () => {
    if (!validatePassword(registerPassword) || !validateEmail(registerEmail)) {
      setErrorMsg("Invalid email or password");
      return;
    }
  
    const { error } = await supabase.auth.signUp({
      email: registerEmail,
      password: registerPassword,
    });
  
    if (error) {
      console.log(error.message);
      if (error.message.includes("Email already in use")) {
        setErrorMsg("Email already in use.");
        navigate('/login', { state: { email: registerEmail }});
      } else {
        setErrorMsg("An error occurred.");
      }
    } else {
      setErrorMsg("");
      setSuccessMsg("Registration successful. A verification email has been sent to you.");
      navigate('/login', { state: { email: registerEmail }}); 
    }
  };
  

  return (
    <Center
      h="91vh"
      flexDirection="column"
      style={{ background: "linear-gradient(to right, #16A085, #2ECC71)" }}
    >
      <Box>
        <Heading
          color="white"
          borderRadius="md"
          p={5}
          
          fontSize="4rem"
        >
          Register
        </Heading>
      </Box>
      <Flex flexDirection="column" alignItems="center">
        <FormControl id="email" mb={4}>
          <Flex>
            <Text  color="white" fontSize="2rem" p={4} w="12rem">
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
            <Text  color="white" fontSize="2rem" p={4} w="12rem">
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
          p="2rem"
          borderRadius="0.25rem"
          bg="#2F80ED"
          color="white"
          border="none"
          _hover={{ bg: "#56CCF2", cursor: "pointer", transition: "0.3s" }}
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
