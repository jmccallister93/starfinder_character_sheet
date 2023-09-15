import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { supabase } from "../client/supabaseClient";
import { useEffect, useState } from "react";

const Step1 = ({ updateFormData, formData }) => {
  const [fetchedData, setFetchedData] = useState();
  const [deity, setDeity] = useState([]);
  const [pactWorlds, setPactWorlds] = useState([]);

  const fetchDataFromTable = async (tableName, setDataCallback) => {
    const { data, error } = await supabase.from(tableName).select("*");
    if (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
    } else {
      setDataCallback(data || []);
    }
  };

  useEffect(() => {
    fetchDataFromTable("deities", setDeity);
    fetchDataFromTable("pactWorlds", setPactWorlds);
  }, []);

  const clearSelection = () => {
    updateFormData("name", null);
    updateFormData("alignment", null);
    updateFormData("deity", null);
    updateFormData("description", null);
    updateFormData("height_ft", null);
    updateFormData("height_in", null);
    updateFormData("weight", null);
    updateFormData("homeWorld", null);
}


  return (
    <Box
      color="white"
      background="rgb(50, 50, 50)"
      width="70vw"
      padding="20px"
      borderRadius="10px"
      boxShadow="0px 0px 15px rgba(0,0,0,0.2)"
    >
      <Text
        fontSize="2.5rem"
        mb="20px"
        borderBottom="2px solid white"
        paddingBottom="10px"
        textAlign="center"
        fontWeight="bold"
      >
        Step 1: Basic Details
      </Text>
      <Button  mb="20px" ml={2} onClick={clearSelection}>Clear All</Button>
      <Box
        color="white"
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        background="rgb(60, 60, 60)"
        padding="20px"
        borderRadius="10px"
        boxShadow="inset 0px 0px 10px rgba(0,0,0,0.4)"
      >
        <FormControl id="characterName" mb={4} width="28%" padding="2rem">
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Character Name"
            value={formData.name || ""}
            onChange={(e) => updateFormData("name", e.target.value)}
            cursor="pointer"
            color="white"
            sx={{
              option: {
                backgroundColor: "#333", // You can set this to any color you prefer
                "&:hover": {
                  backgroundColor: "#555", // Color for hover state
                },
              },
            }}
          />
        </FormControl>

        <FormControl id="alignment" mb={4} width="28%" padding="2rem">
          <FormLabel>Alignment</FormLabel>
          <Select
            placeholder="Select alignment"
            value={formData.alignment || ""}
            onChange={(e) => updateFormData("alignment", e.target.value)}
            color="white"
            sx={{
              option: {
                backgroundColor: "#333", // You can set this to any color you prefer
                "&:hover": {
                  backgroundColor: "#555", // Color for hover state
                },
              },
            }}
          >
            <option value="Lawful Good">Lawful Good</option>
            <option value="Neutral Good">Neutral Good</option>
            <option value="Chaotic Good">Chaotic Good</option>
            <option value="Lawful Neutral">Lawful Neutral</option>
            <option value="True Neutral">True Neutral</option>
            <option value="Chaotic Neutral">Chaotic Neutral</option>
            <option value="Lawful Evil">Lawful Evil</option>
            <option value="Neutral Evil">Neutral Evil</option>
            <option value="Chaotic Evil">Chaotic Evil</option>
          </Select>
        </FormControl>

        <FormControl id="deity" mb={4} width="28%" padding="2rem">
          <FormLabel>Deity</FormLabel>
          <Select
            placeholder="Select deity"
            value={formData.deity || ""}
            onChange={(e) => updateFormData("deity", e.target.value)}
            color="white"
            sx={{
              option: {
                backgroundColor: "#333", // You can set this to any color you prefer
                "&:hover": {
                  backgroundColor: "#555", // Color for hover state
                },
              },
            }}
          >
            {deity &&
              deity.map((de, index) => (
                <option key={index} value={de.Name}>
                  {de.Name}
                </option>
              ))}
              <option>None</option>
          </Select>
        </FormControl>

        <FormControl id="homeWorld" mb={4} width="28%" padding="2rem">
          <FormLabel>Home World</FormLabel>
          <Select
            placeholder="Select home world"
            value={formData.homeWorld || ""}
            onChange={(e) => updateFormData("homeWorld", e.target.value)}
            color="white"
            sx={{
              option: {
                backgroundColor: "#333", // You can set this to any color you prefer
                "&:hover": {
                  backgroundColor: "#555", // Color for hover state
                },
              },
            }}
          >
            {pactWorlds &&
              pactWorlds.map((world, index) => (
                <option key={index} value={world.Name}>
                  {world.Name}
                </option>
              ))}
          </Select>
        </FormControl>

        <FormControl id="weight" mb={4} width="28%" padding="2rem">
          <FormLabel>Weight</FormLabel>
          <Input
            type="number"
            placeholder="Weight (lbs)"
            value={formData.weight || ""}
            onChange={(e) => updateFormData("weight", e.target.value)}
            color="white"
            sx={{
              option: {
                backgroundColor: "#333", // You can set this to any color you prefer
                "&:hover": {
                  backgroundColor: "#555", // Color for hover state
                },
              },
            }}
          />
        </FormControl>

        <FormControl id="height" mb={4} width="28%" padding="2rem">
          <FormLabel>Height</FormLabel>
          <Box display="flex" flexDirection="column" gap={2}>
            <Input
              type="number"
              placeholder="ft"
              value={formData.height_ft || ""}
              onChange={(e) => updateFormData("height_ft", e.target.value)}
              color="white"
              sx={{
                option: {
                  backgroundColor: "#333", // You can set this to any color you prefer
                  "&:hover": {
                    backgroundColor: "#555", // Color for hover state
                  },
                },
              }}
            />
            <Input
              type="number"
              placeholder="in"
              value={formData.height_in || ""}
              onChange={(e) => updateFormData("height_in", e.target.value)}
              color="white"
              sx={{
                option: {
                  backgroundColor: "#333", // You can set this to any color you prefer
                  "&:hover": {
                    backgroundColor: "#555", // Color for hover state
                  },
                },
              }}
            />
          </Box>
        </FormControl>

        <FormControl id="description" mb={4} width="90%" padding="2rem">
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Character description..."
            value={formData.description || ""}
            onChange={(e) => updateFormData("description", e.target.value)}
            color="white"
            sx={{
              option: {
                backgroundColor: "#333", // You can set this to any color you prefer
                "&:hover": {
                  backgroundColor: "#555", // Color for hover state
                },
              },
            }}
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default Step1;
