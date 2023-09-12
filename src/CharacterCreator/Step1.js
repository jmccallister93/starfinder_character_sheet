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

const Step1 = ({ setFormData, formData }) => {
  return (
    <>
      <Text fontSize="2rem" textAlign="center" fontWeight="bold">
        Step 1
      </Text>
      <Box
        color="white"
        background="grey"
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        <FormControl id="characterName" mb={4} width="33.33%">
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Character Name"
            value={formData.name || ""}
            onChange={(e) => setFormData("name", e.target.value)}
            sx={{ "::placeholder": { color: "white" } }}
            cursor="pointer"
          />
        </FormControl>

        <FormControl id="alignment" mb={4} width="33.33%">
          <FormLabel>Alignment</FormLabel>
          <Select
            placeholder="Select alignment"
            value={formData.alignment || ""}
            onChange={(e) => setFormData("alignment", e.target.value)}
           color="black"
          >
            <option value="lawfulGood" >Lawful Good</option>
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

        <FormControl id="deity" mb={4} width="33.33%">
          <FormLabel>Deity</FormLabel>
          <Select
            placeholder="Select deity"
            value={formData.deity || ""}
            onChange={(e) => setFormData("deity", e.target.value)}
          >
            {/* Deity options will be added later */}
          </Select>
        </FormControl>

        <FormControl id="homeWorld" mb={4} width="33.33%">
          <FormLabel>Home World</FormLabel>
          <Select
            placeholder="Select home world"
            value={formData.homeWorld || ""}
            onChange={(e) => setFormData("homeWorld", e.target.value)}
          >
            {/* HomeWorld options will be added later */}
          </Select>
        </FormControl>

        <FormControl id="weight" mb={4} width="33.33%">
          <FormLabel>Weight</FormLabel>
          <Input
            type="number"
            placeholder="Weight (lbs)"
            value={formData.weight || ""}
            onChange={(e) => setFormData("weight", e.target.value)}
          />
        </FormControl>

        <FormControl id="height" mb={4} width="33.33%">
          <FormLabel>Height</FormLabel>
          <Box display="flex" flexDirection="column" gap={2}>
            <Input
              type="number"
              placeholder="ft"
              value={formData.height_ft || ""}
              onChange={(e) => setFormData("height_ft", e.target.value)}
            />
            <Input
              type="number"
              placeholder="in"
              value={formData.height_in || ""}
              onChange={(e) => setFormData("height_in", e.target.value)}
            />
          </Box>
        </FormControl>

        <FormControl id="description" mb={4} width="33.33%">
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Character description..."
            value={formData.description || ""}
            onChange={(e) => setFormData("description", e.target.value)}
          />
        </FormControl>
      </Box>
    </>
  );
};

export default Step1;
