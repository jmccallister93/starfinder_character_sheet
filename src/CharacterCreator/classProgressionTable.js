import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import classProgressionData from "./classProgressionData";

function ClassProgressionTable({ className }) {
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

  return (
    <Table variant="simple" mt={4}>
      <Thead>
        <Tr>
          <Th>Level</Th>
          <Th>Base Attack Bonus</Th>
          <Th>Fortitude Save</Th>
          <Th>Reflex Save</Th>
          <Th>Will Save</Th>
          <Th>Special</Th>
          {hasSpells && <Th>Spells</Th>}
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
            {hasSpells && <Td>{levelData.spells?.join(", ") || "-"}</Td>}
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
