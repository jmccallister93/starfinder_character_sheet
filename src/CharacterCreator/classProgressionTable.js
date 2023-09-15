import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import classProgressionData from "./classProgressionData";
import { useEffect } from "react";

function ClassProgressionTable({ className, updateFormData }) {
  const classData = classProgressionData[className];

  // Check which unique properties exist in the data
  const hasSpells = classData.some((item) => item.spells);
  const hasAdaptiveStrike = classData.some((item) => item.adaptive_strike);
  const hasMajorForms = classData.some((item) => item.majorForms);
  const hasMinorForms = classData.some((item) => item.minorForms);
  const hasEsd = classData.some((item) => item.esd);
  const hasSolarArmor = classData.some((item) => item.solarArmor);
  const hasSolarFlare = classData.some((item) => item.solarFlare);
  const hasSolarShield = classData.some((item) => item.solarShield);
  const hasSolarWeapon = classData.some((item) => item.solarWeapon);

  const ordinalSuffix = (i) => {
    const j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  };

  useEffect(() => {
    let classStats =[]
    classData.map((levelData, idx) => ( 
      classStats.push(levelData)
    ))
    updateFormData("classStats" , classStats)
  }, [className])

  return (
    <Table variant="simple" mt={4}>
      <Thead>
        <Tr
          color="white"
          background="rgb(160, 160, 160)"
          padding="20px"
          borderRadius="10px"
        >
          <Th>Level</Th>
          <Th>Base Attack Bonus</Th>
          <Th>Fortitude Save</Th>
          <Th>Reflex Save</Th>
          <Th>Will Save</Th>
          <Th>Special</Th>
          {hasSpells &&
            [...Array(6).keys()].map((i) => (
              <Th key={i}>{ordinalSuffix(i + 1)} Level Spells per Day</Th>
            ))}
          {hasAdaptiveStrike && <Th>Adaptive Strike</Th>}
          {hasMajorForms && <Th>Major Forms</Th>}
          {hasMinorForms && <Th>Minor Forms</Th>}
          {hasEsd && <Th>Entropic Strike Damage</Th>}
          {hasSolarArmor && <Th>Solar Armor</Th>}
          {hasSolarFlare && <Th>Solar Flare</Th>}
          {hasSolarShield && <Th>Solar Sheild</Th>}
          {hasSolarWeapon && <Th>Solar Weapon</Th>}
        </Tr>
      </Thead>
      <Tbody>
        {classData.map((levelData, idx) => (
          <Tr key={idx}>
            <Td>{levelData.level}</Td>
            <Td>{levelData.bab}</Td>
            <Td>{levelData.fort}</Td>
            <Td>{levelData.ref}</Td>
            <Td>{levelData.will}</Td>
            <Td>{levelData.special}</Td>
            {hasSpells &&
              (levelData.spells || Array(6).fill("-")).map(
                (spellValue, spellIdx) => (
                  <Td key={spellIdx}>
                    {spellValue === 0 || spellValue === "-" ? "-" : spellValue}
                  </Td>
                )
              )}

            {hasAdaptiveStrike && <Td>{levelData.adaptive_strike || "-"}</Td>}
            {hasMajorForms && <Td>{levelData.majorForms || "-"}</Td>}
            {hasMinorForms && <Td>{levelData.minorForms || "-"}</Td>}
            {hasEsd && <Td>{levelData.esd || "-"}</Td>}
            {hasSolarArmor && <Td>{levelData.solarArmor || "-"}</Td>}
            {hasSolarFlare && <Td>{levelData.solarFlare || "-"}</Td>}
            {hasSolarShield && <Td>{levelData.solarShield || "-"}</Td>}
            {hasSolarWeapon && <Td>{levelData.solarWeapon || "-"}</Td>}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default ClassProgressionTable;
