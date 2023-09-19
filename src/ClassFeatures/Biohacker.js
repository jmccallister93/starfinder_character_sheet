import { Text, Radio, RadioGroup, Stack, Heading } from "@chakra-ui/react";
import { useState } from "react";

const Biohacker = ({ formData, updateFormData, feature, classId }) => {
  const biohacks = {
    basic_boost: [
      "The target gains a +1 enhancement bonus to AC.",
      "The target gains a +2 enhancement bonus to skill checks.",
      "The target gains a +10-foot enhancement bonus to their speed. If the creature has more than one movement type, choose one to receive this bonus.",
    ],
    basic_inhibitor: [
      "The target takes a –2 penalty to AC.",
      "You reduce the target’s DR by 5. At 9th level, you instead reduce it by 10. At 17th level, you instead reduce it by 15.",
      "You reduce the target’s resistance to one type of energy (your choice) by 5. At 9th level, you instead reduce it by 10. At 17th level, you instead reduce it by 15.",
    ],
  };

  const [selectedBooster, setSelectedBooster] = useState();
  const [selectedInhibitor, setSelectedInhibitor] = useState();

  const handleBoosterChange = (value) => {
    setSelectedBooster(value);
    handleChoiceSelection(value);
};

const handleInhibitorChange = (value) => {
    setSelectedInhibitor(value);
    handleChoiceSelection(value);
};


const handleChoiceSelection = (selectedChoice) => {
    updateFormData(`feature_choice_${classId.Name}`, selectedBooster);
};


  
  return (
    <>
      <Heading as="h3" size="md">
        Biohacks (Ex) - 1st Level
      </Heading>
      <Text>
        As part of your custom microlab...
        {/* Truncated for brevity */}
      </Text>
      <Heading as="h4" size="sm">
        Basic Booster
      </Heading>
      <RadioGroup value={selectedBooster} onChange={handleBoosterChange}>
        <Stack spacing={4}>
          {biohacks.basic_boost.map((option, idx) => (
            <Radio key={idx} value={option}>
              {option}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>

      <Heading as="h4" size="sm">
        Basic Inhibitor
      </Heading>
      <RadioGroup value={selectedInhibitor} onChange={handleInhibitorChange}>
        <Stack spacing={4}>
          {biohacks.basic_inhibitor.map((option, idx) => (
            <Radio key={idx} value={option}>
              {option}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>

      <Heading as="h4" size="sm">
        Minor Biohacks
      </Heading>
      <Text>
        You can create minor biohacks from less...
        {/* Truncated for brevity */}
      </Text>
      {/* You can add more sections similarly */}
    </>
  );
};

export default Biohacker;
