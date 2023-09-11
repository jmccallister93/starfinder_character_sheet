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

const Step3 = ({ setFormData }) => {
  const [method, setMethod] = useState(""); // 'pointBuy', 'quickPick', 'rollForScore'
  const [scores, setScores] = useState({
    STR: 10,
    DEX: 10,
    CON: 10,
    INT: 10,
    WIS: 10,
    CHA: 10,
  });
  //   Point Buy
  const [remainingPoints, setRemainingPoints] = useState(10);
  const handlePointBuy = (stat, change) => {
    if (
      (change === 1 && remainingPoints > 0 && scores[stat] < 15) ||
      (change === -1 && scores[stat] > 8)
    ) {
      setScores((prevScores) => ({
        ...prevScores,
        [stat]: prevScores[stat] + change,
      }));
      setRemainingPoints((prevPoints) => prevPoints - change);
    }
  };

  //   Quick Picks
  const [allocatableScores, setAllocatableScores] = useState([]);
  const handleQuickPick = (type) => {
    let scoresArray = [];
    switch (type) {
      case "focused":
        scoresArray = [18, 14, 11, 10, 10, 10];
        break;
      case "split":
        scoresArray = [16, 16, 11, 10, 10, 10];
        break;
      case "versatile":
        scoresArray = [14, 14, 14, 11, 10, 10];
        break;
      default:
        break;
    }
    setAllocatableScores(scoresArray);
    // Reset scores to default values when switching quick pick type
    setScores({
      STR: 10,
      DEX: 10,
      CON: 10,
      INT: 10,
      WIS: 10,
      CHA: 10,
    });
  };
  const allocateScore = (stat, value) => {
    // Capture the previous value for the given stat
    const previousValue = scores[stat];

    // Update the scores
    setScores((prevScores) => ({
      ...prevScores,
      [stat]: value,
    }));

    // If there's a previous value, add it back to allocatableScores
    if (previousValue && previousValue !== 10) {
      // We exclude 10 since it's the default value
      setAllocatableScores((prevScores) => [...prevScores, previousValue]);
    }

    // Remove the new allocated score from allocatableScores
    setAllocatableScores((prevScores) => {
      const index = prevScores.indexOf(value);
      if (index > -1) {
        prevScores.splice(index, 1);
      }
      return [...prevScores];
    });
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

  const rollDice = () => {
    let rolls = [];
    for (let i = 0; i < 4; i++) {
      rolls.push(Math.ceil(Math.random() * 6));
    }
    rolls.sort((a, b) => b - a); // Sort in descending order
    rolls.pop(); // Remove the smallest roll
    return rolls.reduce((a, b) => a + b); // Sum up the rolls
  };

  const handleRollForScore = () => {
    let rolledScores = [];
    for (let i = 0; i < 6; i++) {
      rolledScores.push(rollDice());
    }
    setAllocatableScores(rolledScores);
  };

  const handleManualEntry = (stat, value) => {
    setManualScores({
      ...manualScores,
      [stat]: value,
    });
  };

  useEffect(() => {
    setScores({
      STR: 10,
      DEX: 10,
      CON: 10,
      INT: 10,
      WIS: 10,
      CHA: 10,
    });
    setRemainingPoints(10);
  }, [method]);

  return (
    <Box>
      <Text fontSize="2rem" textAlign="center" fontWeight="bold">
        Step 3
      </Text>
      <RadioGroup onChange={setMethod} value={method}>
        <Stack spacing={5}>
          <Radio value="pointBuy">Point Buy</Radio>
          <Radio value="quickPick">Quick Pick</Radio>
          <Radio value="rollForScore">Roll for Score</Radio>
        </Stack>
      </RadioGroup>

      {method === "pointBuy" && (
        <Box>
          <Text fontSize="1.5rem">Remaining Points: {remainingPoints}</Text>
          <Flex wrap="wrap" justifyContent="space-around">
            {Object.keys(scores).map((stat) => (
              <Box
                key={stat}
                w="20%"
                p={4}
                textAlign="center"
                borderRadius="md"
                border="1px solid gray"
                m={2}
              >
                <Text fontSize="1.5rem" mb={2}>
                  {stat}
                </Text>
                <Text fontSize="2rem" fontWeight="bold" mb={4}>
                  {scores[stat]}
                </Text>
                <Button
                  size="sm"
                  onClick={() => handlePointBuy(stat, -1)}
                  isDisabled={scores[stat] <= 8 || remainingPoints >= 10}
                >
                  -
                </Button>
                <Button
                  size="sm"
                  ml={4}
                  onClick={() => handlePointBuy(stat, 1)}
                  isDisabled={scores[stat] >= 15 || remainingPoints <= 0}
                >
                  +
                </Button>
              </Box>
            ))}
          </Flex>
        </Box>
      )}

      {method === "rollForScore" && (
        <Box mb={4}>
          <Button onClick={handleRollForScore}>Roll</Button>
          {allocatableScores.length > 0 && (
            <Text mt={4}>You rolled: {allocatableScores.join(", ")}</Text>
          )}
        </Box>
      )}

{method === "quickPick" && (
        <Box>
          <Button onClick={() => handleQuickPick("focused")}>Focused</Button>
          <Button onClick={() => handleQuickPick("split")}>Split</Button>
          <Button onClick={() => handleQuickPick("versatile")}>
            Versatile
          </Button>
        </Box>
      )}

      {/* This UI is for both quickPick and rollForScore */}
      {(method === "quickPick" || method === "rollForScore") && (
        <Flex wrap="wrap" justifyContent="space-around">
          {Object.keys(scores).map((stat) => (
            <Box
              key={stat}
              w="20%"
              p={4}
              textAlign="center"
              borderRadius="md"
              border="1px solid gray"
              m={2}
            >
              <Text fontSize="1.5rem" mb={2}>
                {stat}
              </Text>
              <Text fontSize="2rem" fontWeight="bold" mb={4}>
                {scores[stat]}
              </Text>
              {allocatableScores.map((value, index) => (
                <Button key={index} onClick={() => allocateScore(stat, value)}>
                  {value}
                </Button>
              ))}
            </Box>
          ))}
        </Flex>
      )}



{method === "rollForScore" && (
  <Box mt={4}>
    <Text>Or enter your scores manually:</Text>
    <Flex wrap="wrap" justifyContent="space-around">
      {Object.keys(manualScores).map((stat) => (
        <Box
          key={stat}
          w="20%"
          p={4}
          textAlign="center"
          borderRadius="md"
          border="1px solid gray"
          m={2}
        >
          <Text fontSize="1.5rem" mb={2}>
            {stat}
          </Text>
          <Input
            type="number"
            value={manualScores[stat]}
            onChange={(e) => handleManualEntry(stat, e.target.value)}
          />
        </Box>
      ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Step3;
