import React, { useEffect, useState } from "react";
import { Box, Text, Button, Input, Flex } from "@chakra-ui/react";

const skillsList = [
  "Acrobatics",
  "Athletics",
  "Bluff",
  "Computers",
  "Culture",
  "Diplomacy",
  "Disguise",
  "Engineering",
  "Intimidate",
  "Life Science",
  "Medicine",
  "Mysticism",
  "Perception",
  "Physical Science",
  "Piloting",
  "Profession",
  "Sense Motive",
  "Sleight of Hand",
  "Stealth",
  "Survival",
];

const classSkills = {
  Envoy: [
    "Bluff",
    "Computers",
    "Culture",
    "Diplomacy",
    "Disguise",
    "Intimidate",
    "Perception",
    "Profession",
    "Sense Motive",
  ],
  Mechanic: [
    "Athletics",
    "Computers",
    "Engineering",
    "Medicine",
    "Perception",
    "Physical Science",
    "Piloting",
    "Profession",
  ],
  Mystic: [
    "Culture",
    "Diplomacy",
    "Life Science",
    "Medicine",
    "Mysticism",
    "Perception",
    "Profession",
    "Sense Motive",
    "Survival",
  ],
  Operative: [
    "Acrobatics",
    "Athletics",
    "Bluff",
    "Computers",
    "Culture",
    "Disguise",
    "Engineering",
    "Intimidate",
    "Medicine",
    "Perception",
    "Piloting",
    "Profession",
    "Sense Motive",
    "Sleight of Hand",
    "Stealth",
    "Survival",
  ],
  Solarian: [
    "Acrobatics",
    "Athletics",
    "Diplomacy",
    "Intimidate",
    "Mysticism",
    "Perception",
    "Physical Science",
    "Profession",
    "Sense Motive",
    "Stealth",
  ],
  Soldier: [
    "Acrobatics",
    "Athletics",
    "Engineering",
    "Intimidate",
    "Medicine",
    "Piloting",
    "Profession",
    "Survival",
  ],
  Technomancer: [
    "Computers",
    "Engineering",
    "Life Science",
    "Mysticism",
    "Physical Science",
    "Piloting",
    "Profession",
  ],
  Biohacker: [
    "Bluff",
    "Computers",
    "Culture",
    "Diplomacy",
    "Engineering",
    "Life Science",
    "Medicine",
    "Perception",
    "Physical Science",
    "Profession",
    "Sense Motive",
    "Sleight of Hand",
  ],
  Vanguard: [
    "Acrobatics",
    "Athletics",
    "Culture",
    "Diplomacy",
    "Intimidate",
    "Life Science",
    "Medicine",
    "Mysticism",
    "Perception",
    "Profession",
    "Stealth",
    "Survival",
  ],
  Witchwarper: [
    "Acrobatics",
    "Bluff",
    "Culture",
    "Diplomacy",
    "Intimidate",
    "Mysticism",
    "Physical Science",
    "Profession",
  ],
};
const skillPointsPerLevel = {
    "Biohacker": 4,
    "Envoy": 8,
    "Evolutionist": 4,
    "Mechanic": 4,
    "Mystic": 6,
    "Nanocyte": 6,
    "Operative": 8,
    "Precog": 6,
    "Solarian": 4,
    "Soldier": 4,
    "Technomancer":4,
    "Vanguard": 6,
    "Witchwarper": 4
  };


  const Step6 = ({ updateFormData, formData }) => {
    const [skills, setSkills] = useState(formData?.skills || []);

    
  const clearSelection = () => {
    setSkills([])
}
  
    // This function determines if the given skill is a class skill for the selected class
    const isClassSkill = (skillName) => {
        return classSkills[formData.class?.Name]?.includes(skillName);
    };
  
    // This function handles the changes made to skill ranks by the user
    const handleSkillChange = (skillName, value) => {
        const totalSkillRanksAllocated = Object.values(skills).reduce((acc, curr) => acc + (curr || 0), 0);
        
        if (value >= 0 && totalSkillRanksAllocated + value - (skills[skillName] || 0) <= skillPointsPerLevel[formData.class?.Name]) {
            setSkills((prevSkills) => ({
                ...prevSkills,
                [skillName]: value
            }));
        }
    };
    
    

    const getSkillBonus = (skillName) => {
        const rankBonus = skills[skillName] || 0; // Bonus from the ranks invested
        const classSkillBonus = isClassSkill(skillName) ? 3 : 0; // +3 bonus if it's a class skill
        return rankBonus + classSkillBonus;
    };
    
  

  
    const incrementSkill = (skillName) => {
        const currentRank = skills[skillName] || 0;
        if (currentRank < 1) { // Ensure that a skill doesn't get more than 1 rank
            handleSkillChange(skillName, currentRank + 1);
        }
    };
      
    const decrementSkill = (skillName) => {
        const currentRank = skills[skillName] || 0;
        handleSkillChange(skillName, currentRank - 1);
    };
    
    
      const totalSkillRanksAllocated = Object.values(skills).reduce((acc, curr) => acc + (curr || 0), 0);
      const skillPointsForClass = skillPointsPerLevel[formData.class?.Name] || 0;
      const skillPointsRemaining = skillPointsForClass - totalSkillRanksAllocated;

      const getCombinedSkills = () => {
        let combinedSkills = {};
        
        for (let skill of skillsList) {
          combinedSkills[skill] = (skills[skill] || 0) + (isClassSkill(skill) ? 3 : 0);
        }
      
        return combinedSkills;
      };

      useEffect(() => {
        updateFormData("skills", getCombinedSkills());
      }, [skills]);
      
  
      return (
        <Box  color="white"
        background="rgb(50, 50, 50)"
        width="70vw"
        padding="20px"
        borderRadius="10px"
        boxShadow="0px 0px 15px rgba(0,0,0,0.2)">
          <Text fontSize="2.5rem" mb="20px" borderBottom="2px solid white" paddingBottom="10px" textAlign="center" fontWeight="bold">
            Step 6: Skills
          </Text>
    
          <Text fontSize="1.5rem">Skill Points Remaining: {skillPointsRemaining}</Text>
          <Button onClick={clearSelection}>Clear Selection</Button>
          <Flex wrap="wrap" justifyContent="space-between" mt={4}>
                {skillsList.map((skill, index) => (
                    <Flex key={index} mb={3} w="30%" alignItems="center" justifyContent="space-between">
                        <Text fontSize="1.2rem" flex="1">
                            {skill} {isClassSkill(skill) ? "(Class Skill)" : ""}
                        </Text>
                        <Text ml={2} mr={2} display="inline">
                            +{getSkillBonus(skill)}
                        </Text>
                        <Box background="rgb(60, 60, 60)" padding="20px" borderRadius="10px" boxShadow="inset 0px 0px 10px rgba(0,0,0,0.4)">
                            <Button size="sm" onClick={() => decrementSkill(skill)} disabled={skills[skill] <= 0}>-</Button>
                            <Text ml={2} mr={2} display="inline">
                                {skills[skill] || 0}
                            </Text>
                            <Button size="sm" onClick={() => incrementSkill(skill)}>+</Button>
                        </Box>
                    </Flex>
                ))}
            </Flex>
        </Box>
      );
  };
  

export default Step6;
