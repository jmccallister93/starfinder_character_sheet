import { Text, Radio, RadioGroup, Stack, Heading, Box } from "@chakra-ui/react";
import { useState } from "react";

const Biohacker = ({ formData, updateFormData, feature, classId }) => {
  const [selectedBooster, setSelectedBooster] = useState();
  const [selectedInhibitor, setSelectedInhibitor] = useState();
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState();
  // Biohacks feature
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

  // Selected Biohacks
  const handleBoosterChange = (value) => {
    if (!formData) return;
    if (!formData.feature_choices) formData.feature_choices = {};
    // Clear out existing booster choice if it exists
    if (Array.isArray(formData?.feature_choices[`${feature}_booster`])) {
      formData.feature_choices[`${feature}_booster`] = null;
    }
    setSelectedBooster(value);
    handleChoiceSelection(value, "booster");
  };
  const handleInhibitorChange = (value) => {
    if (!formData) return;
    if (!formData.feature_choices) formData.feature_choices = {};
    // Clear out existing inhibitor choice if it exists
    if (Array.isArray(formData?.feature_choices[`${feature}_inhibitor`])) {
      formData.feature_choices[`${feature}_inhibitor`] = null;
    }
    setSelectedInhibitor(value);
    handleChoiceSelection(value, "inhibitor");
  };

  // Field of Study
  const fieldOfStudy = {
    Anesthesiology: [
      `Anesthesiology is the study of how to reduce sensation, awareness, and pain sensitivity. While normally used to prepare patients for surgical procedures, you can creatively apply principles of anesthesiology in combat to help your allies work through pain or to inhibit your opponents.
        \n
        Booster: You inject a living creature with a substance that confers insensitivity to pain. That creature gains a +2 enhancement bonus to saving throws against pain effects and gains DR 1/—. This DR increases by 1 for every 5 biohacker levels you have, and it stacks with one other source of DR, to a maximum DR value up to your biohacker level.
        \n
        Inhibitor: You deliver a chemical compound that makes the target tired and weak, dealing nonlethal damage equal to your biohacker level and giving the target the fatigued condition (Fortitude negates fatigue and halves the nonlethal damage). If the target is already fatigued and becomes fatigued again, it becomes exhausted instead. This is a poison effect.
        Breakthrough
        You can use the following ability when you achieve the breakthrough for this field of study.
        \n
        Ignore Pain: As a standard action, you can create and deliver a formula that allows a living creature to overcome pain and injury. When injected, the formula grants the target a number of temporary Hit Points equal to twice your biohacker level for 1 minute. The first time during that minute that the target is reduced to 0 Hit Points but not killed outright, it can continue to act normally until the end of its next turn or until it takes additional damage, at which point it becomes unconscious, as normal.`,
    ],
    Cybermedicine: [
      `Cybermedicine is the study of integrating biological and technological material and understanding their interactions.
        \n
        Booster: You boost a living creature or construct with a nanite-infused substance that causes both living creatures and constructs to heal more efficiently. If that creature would benefit from any effect that restores Hit Points, increase the number of Hit Points restored by 50% or by an amount equal to your key ability score modifier, whichever is lower.
        \n
        Inhibitor: You deliver a nanite solution to a living creature or construct, interfering with its healing or repair. Whenever the creature would regain Hit Points from an effect, it must succeed at a Fortitude save or regain no Hit Points from the effect. For persistent healing effects like regeneration, the creature must attempt a new saving throw against the inhibitor each round to regain Hit Points, though the inhibitor doesn’t suppress such abilities altogether. This is a poison effect and ignores a construct’s immunity to poison.
        Breakthrough
        You can use the following ability when you achieve the breakthrough for this field of study.
        \n
        Override Biology: As a standard action, you create and deliver a formula packed with nanites that flood a living creature’s body, granting it construct-like traits. The target gains the no breath universal creature ability as well as a +2 enhancement bonus to saving throws against disease, mind-affecting effects, poison, and sleep (unless those effects specifically target constructs).`,
    ],
    Efficiency: [
      `Efficiency is the study of maximizing useful work for a given amount of available energy.
        \n
        Booster: You enable the target to accomplish greater deeds with less effort. Once per round when the creature expends a Resolve Point, there’s a 25% chance it gains the Resolve Point’s effects but doesn’t expend the Resolve Point. This effect doesn’t last long enough to affect abilities that take longer than 1 minute, including resting to recover Stamina Points.
        \n
        Inhibitor: You deliver an agent that slows reaction time and causes the target to move inefficiently, imparting a –2 penalty to Reflex saving throws.
        Breakthrough
        You can use the following ability when you achieve the breakthrough for this field of study.
        \n
        True Efficiency (Ex): You create and apply a special compound to a biohack that doubles that biohack’s duration. You can use this breakthrough as part of the same action you use to administer the biohack.`,
    ],
    Genetic: [
      `Genetics is the study of living creatures’ inherited characteristics.

        Booster: You temporarily boost a living creature (one that does not have the unliving universal creature rule) to improve the acuity of its hearing, granting the subject the benefits of blindsense (sound) with a range of 60 feet. If the creature already has blindsense, it instead gains the benefit of the Blind‑Fight feat. This benefit lasts for 60 minutes.
        
        Inhibitor: You deliver a DNA-twisting or material-altering chemical nanite compound into a creature's body, increasing the damage it takes from one energy type (your choice). If the creature takes the chosen type of energy damage, it takes additional damage of the same type equal to half your level (minimum 1). This biohack doesn't increase the damage a creature takes from natural hazards or environments, only damage from energy attacks, spells, and other abilities.
        Breakthrough
        You can use the following ability when you achieve the breakthrough for this field of study.
        
        Gene Therapy (Ex): As a standard action, you can create and deliver a medicinal formula to a living creature that suspends the effects of damage to their mind and body. When injected, the formula allows the target to ignore the effects of all ability score damage and drain for 10 minutes. If you are at least 7th level, this effect lasts for 1 hour. If you are at least 13th level, it lasts for 24 hours.`,
    ],
    Immunology: [
      `Immunology is the study of how living creatures’ bodies fight off diseases and other maladies.

        Booster: You boost a creature’s immune system, granting a +2 enhancement bonus to Fortitude saving throws.
        
        Inhibitor: You deliver a potent compound that weakens a creature’s immune system (or creates vulnerabilities in nonliving creatures), imparting a –2 penalty to Fortitude saving throws.
        Breakthrough
        You can use the following ability when you achieve the breakthrough for this field of study.
        
        Suppress Disease (Ex): As a standard action, you can create and deliver a formula that supercharges a target’s immune system. When injected, the formula allows the target to ignore the effects of the highest stage (not including the disease’s end state) of a single disease affecting them for 1 hour. The disease doesn’t progress normally during that time, but this time doesn’t count toward the disease’s duration. If you are at least 7th level, the target ignores the effects of the highest stage of a single disease for 24 hours. If you are at least 13th level, the target ignores the effects for 1 week.`,
    ],
    Neurochemistry: [
      `Neurochemistry is the study of the chemicals that affect creatures’ brains and nerves (or related cognitive systems).

        Booster: You bolster the chemistry of a creature’s brain (or other cognitive system), allowing it to ignore the effects of the confused and staggered conditions for the booster’s duration. While the creature is ignoring these effects, the duration of the condition elapses as normal.
        
        Inhibitor: You deliver a strong chemical admixture that interferes with a creature’s neurons (or equivalent), imparting a –2 penalty to Will saving throws.
        Breakthrough
        You can use the following ability when you achieve the breakthrough for this field of study.
        
        Boost Neurotransmitters (Ex): As a standard action, you can create and deliver a compound that causes a surge of cognitive activity. When injected into a creature, the formula grants the target a +4 enhancement bonus to saving throws against mind‑affecting effects for 1 minute. If the target is already subject to a mind-affecting effect, the target can immediately attempt a new saving throw with a +2 enhancement bonus against the effect. This does not grant a new saving throw if the effect did not originally allow one.`,
    ],
    Pharmacology: [
      `Pharmacology is the study of drugs and their effects on living creatures.

        Booster: You deliver a coagulant to a living creature, granting it immunity to the bleeding condition for the duration of this effect. If the creature is under the effect of the bleeding condition when you administer this biohack, that condition ends.
        
        Inhibitor: You introduce a mild hallucinogen into a living creature’s body, making it difficult for the target to move or act. The target gains the encumbered condition and must succeed at a Fortitude save or also gain the entangled condition. This is a mind-affecting poison effect.
        Breakthrough
        You can use the following ability when you achieve the breakthrough for this field of study.
        
        Alleviate Pain (Ex): As a standard action, you can create and deliver a formula to a living creature to prevent pain and nausea. When injected, the mixture provides the target with a +4 enhancement bonus to saving throws against pain effects and effects that cause the sickened or nauseated condition. This bonus lasts for 1 minute. If the target is already under one of these effects, or if it already has the sickened or nauseated condition, it can immediately attempt a new saving throw with a +2 enhancement bonus to end the effect or remove the condition. This does not grant a new saving throw if the effect did not originally allow one. If you are at least 7th level, the bonus to saving throws against pain effects and effects that cause the sickened or nauseated condition increases to +6, or +4 for targets already afflicted and attempting a new saving throw. If you are at least 13th level, this automatically removes the sickened condition, and the bonus to new saving throws for the other conditions increases to +6.`,
    ],
    Thaumapathy: [
      `Thaumapathy studies the inherent magic that suffuses living things, enhancing or dampening that power with the use of eldritch pharmaceuticals.

        Booster: You temporarily boost a creature’s intrinsic magical field, granting it spell resistance equal to 5 + your class level. If it already has spell resistance, increase the spell resistance by 1 (or by 2 if the original spell resistance is less than or equal to 10 + your biohacker level).
        
        Inhibitor: Your inhibitor restricts the magical pathways of the target’s body, making spellcasting more difficult. Reduce the caster level and saving throw DCs of spells and spell-like abilities the creature casts by 1. The creature takes a penalty equal to 1 per damage die when rolling damage dealt by its spells and spell-like abilities.
        For the duration of the inhibitor’s effect, spells and spell-like abilities that normally have a casting time of 1 standard action instead gain a casting time of 1 round, and spells and spell-like abilities that normally have a casting time of 1 round gain a casting time of 2 rounds.
        Breakthrough
        You can use the following ability when you achieve the breakthrough for this field of study.
        
        Magic Renewal (Su): As a standard action, you can create and deliver a medicinal formula to a living creature that restores one of that creature’s expended spell slots or expended spell-like abilities. The level of the spell slot or spell-like ability restored cannot exceed one-third your biohacker level (rounded up). A creature can benefit from your magic renewal breakthrough only once per day.`,
    ],
    Thermoregulation: [
      `By manipulating thermoregulation, a biohacker can protect creatures from extreme temperatures or cause them to overheat.

        Booster: You protect a creature against extreme heat and cold. The target gains cold resistance 1 and fire resistance 1, and these resistances increase by 1 for every 4 biohacker levels you have. If the creature is burning, it can immediately attempt a Reflex save with a +2 bonus to end the burning effect. If the creature has the staggered condition from failing a saving throw against a cold effect, it can immediately attempt a new saving throw against the effect, ending it on a success.
        
        Inhibitor: You impair a creature’s ability to regulate body temperature. If the target takes fire damage, it must succeed at a Fortitude save or gain the burning condition, taking 1d6 fire damage per turn. If the target takes cold damage, it must succeed at a Fortitude save or gain a special version of the burning condition that deals 1d6 cold damage per turn, which can be ended automatically by taking fire damage; the target can’t roll on the ground to gain a new saving throw, but instead it can wrap itself in insulating material and shiver as a full action to attempt a new saving throw with a +4 bonus. The damage per turn increases by 1d6 for every 6 biohacker levels you have.
        Breakthrough
        You can use the following ability when you achieve the breakthrough for this field of study.
        
        Inescapable Heat (Ex): As a standard action, you can deliver a formula that heightens the target’s sensory response to heat and cold, causing unpredictable fear to these stimuli. For 1 minute, whenever the creature takes cold or fire damage, it becomes shaken for 1 round. The first time during that minute the creature begins its turn with the burning condition, it becomes confused for the duration of the burning effect (Will negates). However, on a d% result of 51–75 to determine the confused creature’s actions (Core Rulebook 274), the creature attempts to end the burning condition rather than dealing damage to itself. At the start of each subsequent turn, the creature can attempt a new Will save, ending the confused condition immediately on a success. This is a fear and pain effect.`,
    ],
    Toxicology: [
      `Toxicology is the study of the adverse effects certain chemicals have on living creatures.

        Booster: You cause a living creature to sweat a foul secretion. Any living creature attacking the affected target with a natural attack takes a –2 penalty to the attack. This penalty is a poison effect. If the attacker has active environmental protections (such as those provided by most armor), the penalty applies only after the attacker has hit and damaged the target once.
        
        Inhibitor: You deliver a weak toxin into a living creature’s body, imparting the sickened condition unless it succeeds at a Fortitude saving throw. This is a poison effect.
        Breakthrough
        You can use the following ability when you achieve the breakthrough for this field of study.
        
        Suppress Poison (Ex): As a standard action, you can create and deliver a formula to a living creature that holds the course of a toxin in check. When injected, the formula allows the target to ignore the effects of the highest stage (not including the poison’s end state) of a single poison affecting that creature for 1 minute. The poison doesn’t progress normally during that time, but this time doesn’t count toward the poison’s duration. If you are at least 7th level, the target ignores the effects of the highest stage of a single poison for 10 minutes. If you are at least 13th level, the target ignores the effects of all stages of a single poison for 1 hour.`,
    ],
  };

  //   Selceted Field of Study
  const handleFieldOfStudyChange = (value) => {
    if (!formData) return;
    if (!formData.feature_choices) formData.feature_choices = {};
    // Clear out existing booster choice if it exists
    if (Array.isArray(formData?.feature_choices[`${feature}_field_of_study`])) {
      formData.feature_choices[`${feature}_field_of_study`] = null;
    }
    setSelectedFieldOfStudy(value);
    handleChoiceSelection(value, "field_of_study");
  };
  // Update selection
  const handleChoiceSelection = (selectedChoice, choiceType) => {
    // Ensure feature_choices exists in formData
    if (!formData.feature_choices) {
      formData.feature_choices = {};
    }

    // Set the array with the new choice inside feature_choices based on choiceType
    formData.feature_choices[`${feature}_${choiceType}`] = [selectedChoice];

    // Update the parent state with the updated form data
    updateFormData(formData);
  };
  console.log(feature);

  return (
    <>
      {/* Biohacker */}
      {feature === "Biohacks" ? (
        <>
          <Heading fontSize="1.5rem">Biohacks (Ex) - 1st Level</Heading>
          <Heading fontSize="1.2rem" mt={2}>
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

          <Heading fontSize="1.2rem" mt={2}>
            Basic Inhibitor
          </Heading>
          <RadioGroup
            value={selectedInhibitor}
            onChange={handleInhibitorChange}
          >
            <Stack spacing={4}>
              {biohacks.basic_inhibitor.map((option, idx) => (
                <Radio key={idx} value={option}>
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </>
      ) : null}

      {/* Field Of Study */}
      {feature === "Primary Field of Study" ? (
        <>
          <Heading fontSize="1.5rem">Field Of Study</Heading>
          <RadioGroup
            value={selectedFieldOfStudy}
            onChange={handleFieldOfStudyChange}
          >
            <Stack spacing={4}>
              {Object.keys(fieldOfStudy).map((studyField, idx) => (
                <Box key={idx}>
                  <Radio value={studyField}>
                    <b>{studyField}</b>
                  </Radio>
                  {fieldOfStudy[studyField][0]
                    .split("\n")
                    .map((paragraph, pIdx) => (
                      <Text mt={2} key={pIdx}>
                        {paragraph.trim()}
                      </Text>
                    ))}
                </Box>
              ))}
            </Stack>
          </RadioGroup>
        </>
      ) : null}
    </>
  );
};

export default Biohacker;
