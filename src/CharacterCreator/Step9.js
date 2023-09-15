import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { supabase } from "../client/supabaseClient";
import { useEffect, useState } from "react";

const Step9 = ({ formData, updateFormData }) => {
  const [hp, setHp] = useState();
  const [stamina, setStamina] = useState();
  const [resolve, setResolve] = useState();
  const [bab, setBab] = useState();
  const [refSave, setRefSave] = useState();
  const [willSave, setWillSave] = useState();
  const [fortSave, setFortSave] = useState();

  // Getting HP Value form Race
  const extractNumericValue = (value) => {
    const result = value.match(/\d+/);
    return result ? parseInt(result[0], 10) : 0;
  };

  // Parsing function for extracting number from strings like "6 + CON" or "6 HP"
  const parseStatValue = (statString) => {
    if (typeof statString !== "string") return 0; // Safety check
    const match = statString.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  // Calculate CON modifier
  const STR_modifier = Math.floor((formData.scores.STR - 10) / 2);
  const DEX_modifier = Math.floor((formData.scores.DEX - 10) / 2);
  const CON_modifier = Math.floor((formData.scores.CON - 10) / 2);
  const INT_modifier = Math.floor((formData.scores.INT - 10) / 2);
  const WIS_modifier = Math.floor((formData.scores.WIS - 10) / 2);
  const CHA_modifier = Math.floor((formData.scores.CHA - 10) / 2);

  const HP = formData.class.HP + extractNumericValue(formData.race.HP);

  const Stamina = parseStatValue(formData.class.StaminaPoints) + CON_modifier;

  // Calculate key ability score modifier
  const keyAbilityScore = formData.class.KeyAbility; // Assuming it's named like "CHA", "DEX", etc.
  const key_ability_modifier = Math.floor(
    (formData.scores[keyAbilityScore] - 10) / 2
  );

  // Assuming character level is 1 for this example. Adjust accordingly.
  const character_level = 1; // Replace this with actual value if available

  // Calculations
  const Resolve = Math.max(1, Math.floor(character_level / 2)) + key_ability_modifier;
  const BaseAttackBonus = formData.classStats[0]?.bab; // Update the attribute name if different
  const Fortitude = formData.classStats[0]?.fort; // Update the attribute name if different
  const Reflex = formData.classStats[0]?.ref; // Update the attribute name if different
  const Will = formData.classStats[0]?.will; // Update the attribute name if different

  const formatAbilityText = (abilityText) => {
    // Remove starting and ending quotes
    const cleanText = abilityText.slice(1, -1);

    // Split the text on periods
    const sections = cleanText.split(".");

    return (
      <Box background="rgb(70,70,70)" p={4} borderRadius={10}>
        {sections.map((section, idx) => {
          // If the section is not empty, render it
          if (section.trim()) {
            return (
              <Text mt={2} key={idx}>
                {section.trim() + "."}
              </Text>
            );
          }
          return null; // If the section is empty, don't render anything
        })}
      </Box>
    );
  };

  useEffect(() => {});

  useEffect(() => {
    setHp(HP);
    setStamina(Stamina);
    setResolve(Resolve);
    setBab(BaseAttackBonus);
    setFortSave(Fortitude);
    setRefSave(Reflex);
    setWillSave(Will);
  }, [formData]);

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
        Step 9: Confirm Character Creation
      </Text>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
        flexWrap="auto"
      >
        <Box width="25%">
          <Heading size="md" marginBottom="10px">
            Basic Details
          </Heading>
          <List>
            <ListItem>
              <b>Name:</b> {formData.name}
            </ListItem>
            <ListItem>
              <b>Race:</b> {formData.race.Name}
            </ListItem>
            <ListItem>
              <b>Class:</b> {formData.class.Name}
            </ListItem>
            <ListItem>
              <b>Theme:</b> {formData.theme.Name}
            </ListItem>
            <ListItem>
              <b>Alignment:</b> {formData.alignment}
            </ListItem>
            <ListItem>
              <b>Home World:</b> {formData.homeWorld}
            </ListItem>
            <ListItem>
              <b>Deity:</b> {formData.deity}
            </ListItem>
            {/* <ListItem>
              <b>Description:</b> {formData.description}
            </ListItem> */}
          </List>
        </Box>

        <Box width="25%">
          <Heading size="md" marginBottom="10px">
            Stats
          </Heading>
          <List>
            <ListItem>
              <b>HP:</b> {hp}
            </ListItem>
            <ListItem>
              <b>Stamina:</b> {stamina}
            </ListItem>
            <ListItem>
              <b>Resolve:</b> {resolve}
            </ListItem>
            <ListItem>
              <b>Base Attack Bonus:</b> +{bab}
            </ListItem>
            <ListItem>
              <b>Reflex Save:</b> +{refSave}
            </ListItem>
            <ListItem>
              <b>Fortitude Save:</b> +{fortSave}
            </ListItem>
            <ListItem>
              <b>Will Save:</b> +{willSave}
            </ListItem>
          </List>
        </Box>

        <Box width="25%">
          <Heading size="md" marginBottom="10px">
            Ability Scores
          </Heading>
          <List>
            <ListItem>
              <b>Key Ability:</b> {formData.class.KeyAbility}
            </ListItem>
            {Object.entries(formData.scores).map(([key, value]) => {
              const modifier = Math.floor((value - 10) / 2);
              return (
                <ListItem key={key}>
                  <b>{key}:</b> {value} (+{modifier})
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Box width="40%">
          <Heading size="md" marginBottom="10px"  textAlign="center">
            Skills
          </Heading>
          <List display="flex" flexDirection="row" flexWrap="wrap" justifyContent="flex-start">
            {Object.entries(formData.skills).map(([key, value]) => (
              <ListItem key={key} width="50%">
                <b>{key}:</b> +{value}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box width="25%">
          <Heading size="md" marginBottom="10px">
            Inventory
          </Heading>
          <List>
            {formData.currentInventory.map((item, index) => (
              <ListItem key={index}>{item.Name}</ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Box mt={4}>
        <Heading size="md" marginBottom="10px">
          Class Feature Details:
        </Heading>
        <Accordion allowMultiple>
          {formData.abilities.map((ability, idx) => (
            <AccordionItem key={idx}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="bold">
                    {ability.ability_name} (Level {ability.ability_level}
                    ):
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {formatAbilityText(ability.ability_description)}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Box>
  );
};

export default Step9;
