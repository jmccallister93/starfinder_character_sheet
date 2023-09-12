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

const Step3 = ({ setFormData, formData }) => {
  const [method, setMethod] = useState(""); // 'pointBuy', 'quickPick', 'rollForScore'
  const [scores, setScores] = useState({
    STR: 10,
    DEX: 10,
    CON: 10,
    INT: 10,
    WIS: 10,
    CHA: 10,
  });
  

  //   Adjsutments from race/theme
  const formatAdjustment = (adjustment, source) => {
    if (!adjustment) return null;
    const sign = adjustment > 0 ? "+" : "";
    return `${sign}${adjustment} from ${source}`;
  };
  const totalAdjustment = (ability) => {
    const raceAdj = formData.raceAbilityAdjustments[ability] || 0;
    const themeAdj = formData.themeAbilityAdjustments[ability] || 0;
    return { raceAdj, themeAdj };
  };

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
  const handleRollForScore = () => {
    let rolledScores = [];
    for (let i = 0; i < 6; i++) {
      rolledScores.push(rollDice());
    }
    setAllocatableScores(rolledScores);
  };
  //Manual entry logic
  const handleManualEntry = (stat, value) => {
    setScores((prevScores) => ({
        ...prevScores,
        [stat]: value
      }));
  };
  //Set adjusted base scores
useEffect(() => {
    const adjustedScores = {
      STR: 10 + (totalAdjustment('STR').raceAdj || 0) + (totalAdjustment('STR').themeAdj || 0),
      DEX: 10 + (totalAdjustment('DEX').raceAdj || 0) + (totalAdjustment('DEX').themeAdj || 0),
      CON: 10 + (totalAdjustment('CON').raceAdj || 0) + (totalAdjustment('CON').themeAdj || 0),
      INT: 10 + (totalAdjustment('INT').raceAdj || 0) + (totalAdjustment('INT').themeAdj || 0),
      WIS: 10 + (totalAdjustment('WIS').raceAdj || 0) + (totalAdjustment('WIS').themeAdj || 0),
      CHA: 10 + (totalAdjustment('CHA').raceAdj || 0) + (totalAdjustment('CHA').themeAdj || 0),
    };
  
    setScores(adjustedScores);
    setRemainingPoints(10);
  }, [method, formData]);
  

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
          <Radio value="manualEntry">Manual Entry</Radio>
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
                border="1px solid gray"
                mb={index >= 3 ? "0" : "2rem"}
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
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
              </Box>
            ))}
          </Flex>
        </Box>
      )}

      {method === "manualEntry" && (
        <Box mt={4} textAlign="center">
          <Text fontSize="1.5rem">Enter your scores manually:</Text>
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
                  <Text fontSize="1.5rem" mb={2}>
                    {stat}
                  </Text>
                  <Input
                    border="1px solid white"
                    width="3.5rem"
                    type="number"
                    value={scores[stat]}
                    onChange={(e) => handleManualEntry(stat, e.target.value)}
                  />
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
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      )}

      {method === "rollForScore" && (
        <Box mb={4} textAlign="center">
          <Button onClick={handleRollForScore}>Roll</Button>
          {allocatableScores.length > 0 && (
            <Text mt={4} fontSize="1.5rem">
              You rolled: {allocatableScores.join(", ")}
            </Text>
          )}
        </Box>
      )}

      {method === "quickPick" && (
        <Box textAlign="center">
          <Text fontSize="1.5rem">Select Quick Pick Option</Text>
          <Button onClick={() => handleQuickPick("focused")} margin="0.25rem">
            Focused
          </Button>
          <Button onClick={() => handleQuickPick("split")} margin="0.25rem">
            Split
          </Button>
          <Button onClick={() => handleQuickPick("versatile")} margin="0.25rem">
            Versatile
          </Button>
        </Box>
      )}

      {/* This UI is for both quickPick and rollForScore */}
      {(method === "quickPick" || method === "rollForScore") && (
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
              border="1px solid gray"
              mb={index >= 3 ? "0" : "2rem"}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
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
                {allocatableScores.map((value, index) => (
                  <Button
                    key={index}
                    onClick={() => allocateScore(stat, value)}
                  >
                    {value}
                  </Button>
                ))}
              </Box>
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Step3;
