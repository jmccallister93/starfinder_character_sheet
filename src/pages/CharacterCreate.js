import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  Input,
  Button,
  Center,
  Heading,
  Text,
} from "@chakra-ui/react";
import { supabase } from "../client/supabaseClient";
import spaceBackground from "../assets/space4.jpg";
import SessionContext from "../client/SessionContex";
import { useNavigate, useLocation } from "react-router-dom";
import Step1 from "../CharacterCreator/Step1";
import Step2 from "../CharacterCreator/Step2";
import Step3 from "../CharacterCreator/Step3";

const CharacterCreate = () => {
  const navigate = useNavigate();
  const contextValue = React.useContext(SessionContext);
  const { session, updateSession  } = contextValue;
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!session; // Check if the session

  useEffect(() => {
    async function checkSession() {
      const { data: currentSession, error: sessionError } =
        await supabase.auth.getSession();

      if (currentSession) {
        updateSession(currentSession);
        setIsLoading(false);
      } else {
        // No active session or an error occurred
        if (sessionError) {
          console.log("Error fetching session:", sessionError.message);
        }
        navigate("/");
      }
    }

    checkSession();
  }, []);

  // Access properties from the session object
  const userEmail = session?.session?.user?.email;
  const token = session?.access_token;

  //Character form
  const [formData, setFormData] = useState({});

  // Stepper for setup
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(6)

  const handleNext = () => {
    // Validation logic here...
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

    // This function will update the formData state with data from each step
    const updateFormData = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

  return (
    <Center
      h="92.25vh"
      flexDirection="column"
      background="linear-gradient(to right, #3B3D5B, #B0B0B0)"
    >
      <Box >
        <Heading
          color="white"
          borderRadius="md"
          p={5}
          shadow="md"
          fontSize="4rem"
        >
          Create Character
        </Heading>
      </Box>
      <Flex
        flexDirection="column"
        alignItems="center"
        color="white" background="grey"
        p={5}
        borderRadius="md"
      >
       {currentStep === 1 && <Step1 setFormData={updateFormData} formData={formData} />}
       {currentStep === 2 && <Step2 setFormData={updateFormData} formData={formData} />}
       {currentStep === 3 && <Step3 setFormData={updateFormData} formData={formData} />}
        
        
        {currentStep > 1 && <Button onClick={handlePrevious}>Previous</Button>}
        {currentStep < totalSteps ? (
          <>
          <Button ml={4} onClick={handleNext}>Next</Button>
          <Button ml={4} onClick={handleNext}>Save as Draft</Button>
          </>
        ) : (
          <Button bg="black" color="white">Submit</Button>
        )}
      </Flex>
    </Center>
  );
};

export default CharacterCreate;
