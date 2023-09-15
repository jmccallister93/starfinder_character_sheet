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
  Tooltip,
} from "@chakra-ui/react";
import { supabase } from "../client/supabaseClient";
import spaceBackground from "../assets/space4.jpg";
import SessionContext from "../client/SessionContex";
import { useNavigate, useLocation } from "react-router-dom";
import Step1 from "../CharacterCreator/Step1";
import Step2 from "../CharacterCreator/Step2";
import Step3 from "../CharacterCreator/Step3";
import Step4 from "../CharacterCreator/Step4";
import Step5 from "../CharacterCreator/Step5";
import Step6 from "../CharacterCreator/Step6";
import Step7 from "../CharacterCreator/Step7";
import Step8 from "../CharacterCreator/Step8";
import Step9 from "../CharacterCreator/Step9";

const CharacterCreate = () => {
  const navigate = useNavigate();
  const contextValue = React.useContext(SessionContext);
  const { session, updateSession } = contextValue;
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!session; // Check if the session
  const [validateForm, setValidateForm] = useState(false);

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
  const [totalSteps, setTotalSteps] = useState(9);

  const handleNext = () => {
    // Validation logic here...
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // This function will update the formData state with data from each step
  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <Center
      h="91vh"
      flexDirection="column"
      background="linear-gradient(to right, #3B3D5B, #B0B0B0)"
    >
      <Box>
        <Heading color="white" borderRadius="md" shadow="none" border="none">
          Create Character
        </Heading>
      </Box>
      <Flex justifyContent="center" mt={4}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentStep(index + 1)}
            m={1}
            colorScheme={currentStep === index + 1 ? "teal" : "gray"}
          >
            Step {index + 1}
          </Button>
        ))}
      </Flex>
      <Flex
        flexDirection="column"
        alignItems="center"
        color="black"
        background="#B0B0B0"
        p={5}
        borderRadius="md"
        margin="2rem"
        overflowX="auto"
        justifyContent="space-between"
      >
        {currentStep === 1 && (
          <Step1
            updateFormData={updateFormData}
            formData={formData}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 2 && (
          <Step2
            updateFormData={updateFormData}
            formData={formData}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 3 && (
          <Step3
            updateFormData={updateFormData}
            formData={formData}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 4 && (
          <Step4
            updateFormData={updateFormData}
            formData={formData}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 5 && (
          <Step5
            updateFormData={updateFormData}
            formData={formData}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 6 && (
          <Step6
            updateFormData={updateFormData}
            formData={formData}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 7 && (
          <Step7
            updateFormData={updateFormData}
            formData={formData}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 8 && (
          <Step8
            updateFormData={updateFormData}
            formData={formData}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 9 && (
          <Step9
            updateFormData={updateFormData}
            formData={formData}
            setCurrentStep={setCurrentStep}
            setValidateForm={setValidateForm}
          />
        )}

        <Box alignItems="center" textAlign="center">
          <Flex justifyContent="space-between" mb={4} mt={4}>
            {currentStep > 1 && (
              <Button onClick={handlePrevious} margin="0.25rem">
                Previous
              </Button>
            )}
            {currentStep < totalSteps && (
              <Button onClick={handleNext} margin="0.25rem">
                Next
              </Button>
            )}
          </Flex>

          {currentStep < totalSteps ? (
            // <Button onClick={handleNext} margin="0.25rem" mt={4}>
            //   Save as Draft
            // </Button>
            <></>
          ) : (
            <Button
              bg={validateForm === false ? "red" : "green"}
              color="white"
              mt={4}
              isDisabled={validateForm === false}
            >
              Submit
            </Button>
          )}
        </Box>
      </Flex>
    </Center>
  );
};

export default CharacterCreate;
