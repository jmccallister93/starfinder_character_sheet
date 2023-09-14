import React, { useEffect, useState } from "react";
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

const Step3 = ({ updateFormData, formData }) => {
  const [method, setMethod] = useState(""); // 'pointBuy', 'quickPick', 'rollForScore'
  const [scores, setScores] = useState({
    STR: 10,
    DEX: 10,
    CON: 10,
    INT: 10,
    WIS: 10,
    CHA: 10,
  });

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

  //   Point Buy
  const [remainingPoints, setRemainingPoints] = useState(10);
  const calculateRemainingPoints = (currentScores) => {
    // Calculate the total adjustments
    const totalAdjustments = Object.keys(currentScores).reduce(
      (acc, key) =>
        acc + totalAdjustment(key).raceAdj + totalAdjustment(key).themeAdj,
      0
    );

    // Calculate the total points used excluding adjustments
    const totalPointsUsed = Object.values(currentScores).reduce(
      (acc, score, index, arr) =>
        acc + (score - 10 - totalAdjustments / arr.length),
      0
    );

    return 10 - totalPointsUsed;
  };
  const handlePointBuy = (stat, change) => {
    const newScores = { ...scores, [stat]: scores[stat] + change };
    const newRemainingPoints = calculateRemainingPoints(newScores);

    setScores(newScores);
    setRemainingPoints(newRemainingPoints);
    updateFormData("scores", newScores);
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

  //Manual entry logic
  //Roll dice logic
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
  const [allocatableScores, setAllocatableScores] = useState([]);

  const handleRollForScore = () => {
    let rolledScores = [];
    for (let i = 0; i < 6; i++) {
      rolledScores.push(rollDice());
    }
    setAllocatableScores(rolledScores);
  };
  const handleManualEntry = (stat, value) => {
    setScores((prevScores) => ({
      ...prevScores,
      [stat]: value,
    }));
    updateFormData("scores", scores);
  };
  const handleScoreAdjust = (stat, change) => {
    const newScores = { ...scores, [stat]: scores[stat] + change };
    setScores(newScores);
    updateFormData("scores", newScores);
};

  //Set adjusted base scores
  const [previousMethod, setPreviousMethod] = useState(null);
  useEffect(() => {
    if (method !== previousMethod) {
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
      setRemainingPoints(10);
      setPreviousMethod(method);
    }
  }, [method, formData, previousMethod]);

  //Update Scores to formData
  useEffect(() => {
    updateFormData("scores", scores);
  }, [scores]);

  return (
    <Box>
      <Text fontSize="2rem" textAlign="center" fontWeight="bold">
        Step 3: Ability Scores
      </Text>
      <RadioGroup onChange={setMethod} value={method}>
        <Stack spacing={5}>
          <Radio value="pointBuy">Point Buy</Radio>
          <Radio value="manualEntry">Manual/Rolled Entry</Radio>
        </Stack>
      </RadioGroup>

      {method === "pointBuy" && (
        <Box textAlign="center">
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
                // border={isKeyAbility(stat) ? "1px solid white" : "none"}
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
        <Box mb={4} textAlign="center">
          <Button onClick={handleRollForScore}>Roll</Button>
          {allocatableScores.length > 0 && (
            <Text mt={4} fontSize="1.5rem">
              You rolled: {allocatableScores.join(", ")}
            </Text>
          )}
        </Box>
      )}
      {method === "manualEntry" && (
        <Box mt={4} textAlign="center">
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
                border="1px solid gray"
                mb={index >= 3 ? "0" : "2rem"}
                display="flex"
                flexDirection="column"
                justifyContent="center"
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

export default Step3;
