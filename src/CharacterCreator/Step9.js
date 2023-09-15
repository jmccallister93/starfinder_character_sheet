import { Box, Button, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { supabase } from "../client/supabaseClient";
import { useEffect, useState } from "react";

const Step9 = ({ formData, updateFormData }) => {

const [hp, setHp] = useState()
const [stamina, setStamina] = useState()
const [resolve, setResolve] = useState()
const [ bab, setBab] = useState()
const [ refSave, setRefSave] = useState()
const [willSave, setWillSave] = useState()
const [ fortSave, setFortSave] = useState()

// Calculate CON modifier
const CON_modifier = Math.floor((formData.scores.CON - 10) / 2);

// Calculate key ability score modifier
const keyAbilityScore = formData.class.KeyAbility; // Assuming it's named like "CHA", "DEX", etc.
const key_ability_modifier = Math.floor((formData.scores[keyAbilityScore] - 10) / 2);

// Assuming character level is 1 for this example. Adjust accordingly.
const character_level = 1; // Replace this with actual value if available

// Calculations
const HP = parseInt(formData.class.HP) + parseInt(formData.race.HP);
const Stamina = parseInt(formData.class.StaminaPoints) + CON_modifier;
const Resolve = Math.floor(character_level / 2) + key_ability_modifier;
const BaseAttackBonus = formData.class.BaseAttackBonus; // Update the attribute name if different
const Fortitude = formData.class.Fortitude; // Update the attribute name if different
const Reflex = formData.class.Reflex; // Update the attribute name if different
const Will = formData.class.Will; // Update the attribute name if different

useEffect(() => {
    setHp(HP)
    setStamina(Stamina)
    setResolve(Resolve)
    setBab(BaseAttackBonus)
    setFortSave(Fortitude)
    setRefSave(Reflex)
    setWillSave(Will)
}, [formData])

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
      <Box display="flex" flexDirection="row" justifyContent="space-evenly" alignItems="flex-start">
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
              <b>Description:</b> {formData.description}
            </ListItem>
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
              <b>Base Attack Bonus:</b> {bab}
            </ListItem>
            <ListItem>
              <b>Reflex Save:</b> {refSave}
            </ListItem>
            <ListItem>
              <b>Fortitude Save:</b> {fortSave}
            </ListItem>
            <ListItem>
              <b>Will Save:</b> {willSave}
            </ListItem>
          </List>
        </Box>

        <Box width="25%">
          <Heading size="md"  marginBottom="10px">
            Ability Scores
          </Heading>
          <List>
            {Object.entries(formData.scores).map(([key, value]) => (
              <ListItem key={key}>
                <b>{key}:</b> {value}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box width="25%">
          <Heading size="md"  marginBottom="10px">
            Skills
          </Heading>
          <List>
            {Object.entries(formData.skills).map(([key, value]) => (
              <ListItem key={key}>
                <b>{key}:</b> {value}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box width="25%">
          <Heading size="md"  marginBottom="10px">
            Inventory
          </Heading>
          <List>
            {formData.currentInventory.map((item, index) => (
              <ListItem key={index}>{item.Name}</ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Step9;
