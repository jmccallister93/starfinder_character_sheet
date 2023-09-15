import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";

const Step5 = ({ updateFormData, formData }) => {
  const [method, setMethod] = useState(formData.method || "");

  const initialScores = formData.scores || {
    STR: 10,
    DEX: 10,
    CON: 10,
    INT: 10,
    WIS: 10,
    CHA: 10,
  };
  const [scores, setScores] = useState(initialScores);
  const initialRemainingPoints = formData.remainingPoints || 10;
  const [remainingPoints, setRemainingPoints] = useState(
    initialRemainingPoints
  );
  const initialRolledScores = formData.rolledScores || [];
  const [allocatableScores, setAllocatableScores] =
    useState(initialRolledScores);
  const [previousMethod, setPreviousMethod] = useState(null);

  //   KeyAbility highlights
  const isKeyAbility = (stat) => formData.class?.KeyAbility === stat;

  //   Adjsutments from race/theme
  const formatAdjustment = (adjustment, source) => {
    if (!adjustment) return null;
    const sign = adjustment > 0 ? "+" : "";
    return `${sign}${adjustment} from ${source}`;
  };
  const totalAdjustment = (ability) => {
    const raceAdj = formData.raceAbilityAdjustments?.[ability] || 0;
    const themeAdj = formData.themeAbilityAdjustments?.[ability] || 0;
    return { raceAdj, themeAdj };
  };

  // Reset logic
  const resetToBaseScores = () => {
    const adjustedScores = {
      STR:
        10 +
        (totalAdjustment("STR").raceAdj || 0) +
        (totalAdjustment("STR").themeAdj || 0),
      DEX:
        10 +
        (totalAdjustment("DEX").raceAdj || 0) +
        (totalAdjustment("DEX").themeAdj || 0),
      CON:
        10 +
        (totalAdjustment("CON").raceAdj || 0) +
        (totalAdjustment("CON").themeAdj || 0),
      INT:
        10 +
        (totalAdjustment("INT").raceAdj || 0) +
        (totalAdjustment("INT").themeAdj || 0),
      WIS:
        10 +
        (totalAdjustment("WIS").raceAdj || 0) +
        (totalAdjustment("WIS").themeAdj || 0),
      CHA:
        10 +
        (totalAdjustment("CHA").raceAdj || 0) +
        (totalAdjustment("CHA").themeAdj || 0),
    };
    setRemainingPoints(10)
    setScores(adjustedScores);
  };
  

  // Point Buy
  const calculateRemainingPoints = (currentScores) => {
    // Calculate the total points used excluding adjustments
    const totalPointsUsed = Object.keys(currentScores).reduce(
      (acc, ability) => {
        const adj =
          totalAdjustment(ability).raceAdj + totalAdjustment(ability).themeAdj;
        return acc + (currentScores[ability] - 10 - adj);
      },
      0
    );
    // console.log("Remaining p from calc: " + remainingPoints)
    return 10 - totalPointsUsed;
  };

  const handlePointBuy = (stat, change) => {
    setScores((prevScores) => {
      const newScores = { ...prevScores, [stat]: prevScores[stat] + change };
      const newRemainingPoints = calculateRemainingPoints(newScores);

      // Update the formData right here
      updateFormData("scores", newScores);

      // Update the remaining points
      setRemainingPoints(newRemainingPoints);

      return newScores;
    });
    // console.log("Remaining p from pointbuy: " + remainingPoints)
  };

  // Roll for scores
  const [manualScores, setManualScores] = useState({
    STR: "",
    DEX: "",
    CON: "",
    INT: "",
    WIS: "",
    CHA: "",
  });

  //Manual/Dice Roll entry logic
  const rollDice = () => {
    let rolls = [];
    for (let i = 0; i < 4; i++) {
      rolls.push(Math.ceil(Math.random() * 6));
    }
    rolls.sort((a, b) => b - a); // Sort in descending order
    rolls.pop(); // Remove the smallest roll
    return rolls.reduce((a, b) => a + b); // Sum up the rolls
  };
  //Roll button click
  const handleRollForScore = () => {
    let rolledScores = [];
    for (let i = 0; i < 6; i++) {
      rolledScores.push(rollDice());
    }
    setAllocatableScores(rolledScores);
  };
  const handleScoreAdjust = (stat, change) => {
    const newScores = { ...scores, [stat]: scores[stat] + change };
    setScores(newScores);
    updateFormData("scores", newScores);
  };

  //Set adjusted base scores

  //Needed for previous rerender
  useEffect(() => {
    if (method === "pointBuy") {
      const newRemainingPoints = calculateRemainingPoints(scores);
      setRemainingPoints(newRemainingPoints);
    }
    setPreviousMethod(method);
  }, [method]);
  // Neede dfor previous rerender
  useEffect(() => {
    if (formData.method !== method) {
      const adjustedScores = {
        STR:
          10 +
          (totalAdjustment("STR").raceAdj || 0) +
          (totalAdjustment("STR").themeAdj || 0),
        DEX:
          10 +
          (totalAdjustment("DEX").raceAdj || 0) +
          (totalAdjustment("DEX").themeAdj || 0),
        CON:
          10 +
          (totalAdjustment("CON").raceAdj || 0) +
          (totalAdjustment("CON").themeAdj || 0),
        INT:
          10 +
          (totalAdjustment("INT").raceAdj || 0) +
          (totalAdjustment("INT").themeAdj || 0),
        WIS:
          10 +
          (totalAdjustment("WIS").raceAdj || 0) +
          (totalAdjustment("WIS").themeAdj || 0),
        CHA:
          10 +
          (totalAdjustment("CHA").raceAdj || 0) +
          (totalAdjustment("CHA").themeAdj || 0),
      };

      setScores(adjustedScores);
    }
  }, [formData]);

  // Keep method persistent
  useEffect(() => {
    updateFormData("method", method);
  }, [method]);
  // Keep points persistent
  useEffect(() => {
    updateFormData("remainingPoints", remainingPoints);
  }, [remainingPoints]);
  // Keep rolled scores persistent
  useEffect(() => {
    updateFormData("rolledScores", allocatableScores);
  }, [allocatableScores]);
  //Update Scores to formData
  useEffect(() => {
    updateFormData("scores", scores);
  }, [scores]);

  return (
    <Box color="white"
    background="rgb(50, 50, 50)"
    width="70vw"
    padding="20px"
    borderRadius="10px"
    boxShadow="0px 0px 15px rgba(0,0,0,0.2)">
      <Text fontSize="2.5rem" mb="20px" borderBottom="2px solid white" paddingBottom="10px" textAlign="center" fontWeight="bold" >
        Step 5: Ability Scores
      </Text>
      <RadioGroup onChange={setMethod} value={method}>
        <Stack spacing={5}>
          <Radio value="pointBuy">Point Buy</Radio>
          <Radio value="manualEntry">Manual/Rolled Entry</Radio>
        </Stack>
      </RadioGroup>
      <Button onClick={resetToBaseScores} mt={4}>Reset to Base Scores</Button>

      {method === "pointBuy" && (
        <Box textAlign="center" background="rgb(60, 60, 60)" padding="20px" borderRadius="10px" boxShadow="inset 0px 0px 10px rgba(0,0,0,0.4)">
          <Text fontSize="1.5rem">Remaining Points: {remainingPoints}</Text>
          <Flex
            wrap="wrap"
            justifyContent="space-around"
            flexDirection="row"
            height="fit-content"
          >
            {Object.keys(scores).map((stat, index) => (
              <Box
                key={index}
                w="33.33%"
                p={4}
                textAlign="center"
                borderRadius="md"
                // border="1px solid gray"
                mb={index >= 3 ? "0" : "2rem"}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                background="rgb(60, 60, 60)" padding="20px"  boxShadow="inset 0px 0px 10px rgba(0,0,0,0.4)"
                border={isKeyAbility(stat) ? "1px solid blue" : "1px solid grey"}
              >
                {isKeyAbility(stat) && <Text>* Key Ability</Text>}
                <Text fontSize="1.5rem" mb={2}>
                  {stat}
                </Text>
                <Text fontSize="2rem" fontWeight="bold" mb={4}>
                  {scores[stat]}
                </Text>
                {totalAdjustment(stat).raceAdj !== 0 && (
                  <Box>
                    <Text as="span" fontSize="1.2rem">
                      {" "}
                      {formatAdjustment(totalAdjustment(stat).raceAdj, "Race")}
                    </Text>
                  </Box>
                )}
                {totalAdjustment(stat).themeAdj !== 0 && (
                  <Box>
                    <Text as="span" fontSize="1.2rem">
                      {" "}
                      {formatAdjustment(
                        totalAdjustment(stat).themeAdj,
                        "Theme"
                      )}
                    </Text>
                  </Box>
                )}
                <Box>
                  <Button
                    size="sm"
                    onClick={() => handlePointBuy(stat, -1)}
                    isDisabled={scores[stat] <= 0 || remainingPoints <= 0}
                  >
                    -
                  </Button>
                  <Button
                    size="sm"
                    ml={4}
                    onClick={() => handlePointBuy(stat, 1)}
                    isDisabled={scores[stat] >= 30 || remainingPoints <= 0}
                  >
                    +
                  </Button>
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      )}

      {method === "manualEntry" && (
        <Box mb={4} textAlign="center" >
          <Button onClick={handleRollForScore}>Roll</Button>
          {allocatableScores.length > 0 && (
            <Text mt={4} fontSize="1.5rem">
              You rolled: {allocatableScores.join(", ")}
            </Text>
          )}
        </Box>
      )}
      {method === "manualEntry" && (
        <Box mt={4} textAlign="center" >
          <Text fontSize="1.5rem">Adjust your scores from roll:</Text>
          <Text fontSize="1rem">Roll 4 x d6 take the highest 3.</Text>
          <Flex
            wrap="wrap"
            justifyContent="space-around"
            flexDirection="row"
            height="fit-content"
          >
            {Object.keys(manualScores).map((stat, index) => (
              <Box
                key={index}
                w="33.33%"
                p={4}
                textAlign="center"
                borderRadius="md"
                
                mb={index >= 3 ? "0" : "2rem"}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                background="rgb(60, 60, 60)" padding="20px"  boxShadow="inset 0px 0px 10px rgba(0,0,0,0.4)"
                border={isKeyAbility(stat) ? "1px solid blue" : "1px solid grey"}
              >
                <Box>
                  {isKeyAbility(stat) && <Text>* Key Ability</Text>}
                  <Text fontSize="1.5rem" mb={2}>
                    {stat}
                  </Text>
                  <Text fontSize="2rem" fontWeight="bold" mb={4}>
                    {scores[stat]}
                  </Text>
                  {totalAdjustment(stat).raceAdj !== 0 && (
                    <Box>
                      <Text as="span" fontSize="1.2rem">
                        {" "}
                        {formatAdjustment(
                          totalAdjustment(stat).raceAdj,
                          "Race"
                        )}
                      </Text>
                    </Box>
                  )}
                  {totalAdjustment(stat).themeAdj !== 0 && (
                    <Box>
                      <Text as="span" fontSize="1.2rem">
                        {" "}
                        {formatAdjustment(
                          totalAdjustment(stat).themeAdj,
                          "Theme"
                        )}
                      </Text>
                    </Box>
                  )}
                  <Box>
                    <Button
                      size="sm"
                      onClick={() => handleScoreAdjust(stat, -1)}
                    >
                      -
                    </Button>
                    <Button
                      size="sm"
                      ml={4}
                      onClick={() => handleScoreAdjust(stat, 1)}
                    >
                      +
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Step5;
