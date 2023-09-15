import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Header from "../components/Header";

const Step1 = ({ updateFormData, formData }) => {
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
       fontSize="2.5rem" mb="20px" borderBottom="2px solid white" paddingBottom="10px" textAlign="center" fontWeight="bold"
      >
        Step 1: Basic Details
      </Text>

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
            sx={{ "::placeholder": { color: "white" } }}
            cursor="pointer"
          />
        </FormControl>

        <FormControl id="alignment" mb={4} width="28%" padding="2rem" >
          <FormLabel>Alignment</FormLabel>
          <Select
            placeholder="Select alignment"
            value={formData.alignment || ""}
            onChange={(e) => updateFormData("alignment", e.target.value)}
            color="black"
          >
            <option value="lawfulGood">Lawful Good</option>
            <option value="neutralGood">Neutral Good</option>
            <option value="chaoticGood">Chaotic Good</option>
            <option value="lawfulNeutral">Lawful Neutral</option>
            <option value="trueNeutral">True Neutral</option>
            <option value="neutralNeutral">Chaotic Neutral</option>
            <option value="lawfulEvil">Lawful Evil</option>
            <option value="neutralEvil">Neutral Evil</option>
            <option value="chaoticEvil">Chaotic Evil</option>
          </Select>
        </FormControl>

        <FormControl id="deity" mb={4} width="28%" padding="2rem">
          <FormLabel>Deity</FormLabel>
          <Select
            placeholder="Select deity"
            value={formData.deity || ""}
            onChange={(e) => updateFormData("deity", e.target.value)}
          >
            {/* Deity options will be added later */}
          </Select>
        </FormControl>

        <FormControl id="homeWorld" mb={4} width="28%" padding="2rem">
          <FormLabel>Home World</FormLabel>
          <Select
            placeholder="Select home world"
            value={formData.homeWorld || ""}
            onChange={(e) => updateFormData("homeWorld", e.target.value)}
          >
            {/* HomeWorld options will be added later */}
          </Select>
        </FormControl>

        <FormControl id="weight" mb={4} width="28%" padding="2rem">
          <FormLabel>Weight</FormLabel>
          <Input
            type="number"
            placeholder="Weight (lbs)"
            value={formData.weight || ""}
            onChange={(e) => updateFormData("weight", e.target.value)}
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
            />
            <Input
              type="number"
              placeholder="in"
              value={formData.height_in || ""}
              onChange={(e) => updateFormData("height_in", e.target.value)}
            />
          </Box>
        </FormControl>

        <FormControl id="description" mb={4} width="90%" padding="2rem">
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Character description..."
            value={formData.description || ""}
            onChange={(e) => updateFormData("description", e.target.value)}
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default Step1;
