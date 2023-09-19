import { Text, Radio, RadioGroup, Stack, Heading, Box } from "@chakra-ui/react";
import { useState } from "react";

const Biohacker = ({ formData, updateFormData, feature, classId }) => {
  const [selectedBooster, setSelectedBooster] = useState();
  const [selectedInhibitor, setSelectedInhibitor] = useState();
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState();
  // Biohacks feature
  const biohacks = {
    basic_booster: [
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
    setSelectedBooster(value);
    handleChoiceSelection(value, "booster");
  };
  const handleInhibitorChange = (value) => {
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
    setSelectedFieldOfStudy(value);
    handleChoiceSelection(value, "field_of_study");
  };

//  Theorems
const theorems2 ={
    "Accelerated Metabolism (Ex)": `Once per day, you can target a living creature with a special biohack as a move action. This doesn’t deal any damage and doesn’t count against your total uses of biohacks, but it otherwise functions as a biohack. If you hit the target, it must succeed at a Fortitude saving throw or suffer a dramatic increase in the speed at which its system metabolizes drugs and poisons. For the next 10 minutes, the onset time and maximum duration of any contact, ingested, inhaled, or injury drugs and poisons affecting the target are halved, and the victim must attempt two saves each round against the effects, progressing to the next stage on the appropriate track with each failed save.`,
    "Adaptive Metabolism (Ex)": `As a move action, you can expend one of your biohacks to inject yourself or an ally attuned to your custom microlab with a specially designed compound derived from a native Kehtarian lichen with unsurpassed adaptive properties, momentarily fooling the target’s system into metabolizing chemical compounds differently. Choose any serum with an item level no greater than half your biohacker level. The next poison, drug, or serum that affects the target before the start of your next turn has the effect of the serum you chose instead of its usual one. The substituted effect lasts a maximum of 1d4 rounds or the length of the original effect, whichever is shorter. If the original effect is still ongoing when the duration expires, it resumes at the same stage it was at before the change.`,
    "Ampoule Expertise (Su)": `You’ve discovered how to create specialized spell ampoules using ingredients in your custom microlab. Your selection of spell amps is limited to a number of spells equal to 3 + half your biohacker level; these spells must fulfill all the requirements for a spell amp as detailed on page 224 of the Starfinder Core Rulebook. These spells comprise the list of spell amps you can create with this ability. Each time you gain a biohacker level, you can swap out one spell on this list for another spell that qualifies. Whenever you gain an even‑numbered biohacker level, you also select one additional spell to add to your list of spell amps.
    The first time each day that you create your biohacks, you can create two 0-level spell amps and one 1st-level spell amp from your list. At 8th level, you also can prepare one 2nd-level spell amp from your list. Your spell amps are highly experimental and provide a benefit only when either consumed by you or when an imbiber also spends 1 Resolve Point as part of the action to consume the spell amp. You can inject these spell amps as though they were biohacks, though you must expend 1 Resolve Point and a biohack to do so.`,
    "Botanical Booster (Ex)":`Any booster you successfully use on yourself or an ally alters the target’s biochemistry to become more like that of a plant or plant creature. The target gains a +2 enhancement bonus to saving throws against mind-affecting effects, paralysis, poison, polymorph, sleep, and stunning effects, unless the effect specifies that it’s effective against plants. This extra benefit to the booster doesn’t affect targets with the plantlike subtype or the plantlike universal creature rule.`,
    "Culinary Expert (Ex)": `You can craft food or drink in half the time it would normally take, your custom microlab counts as professional’s tools for Profession (cook) checks, and you can use your Life Science skill in place of Profession (cook) for checks other than those to earn a living. If you gain an insight bonus to Life Science or Profession (cook) checks, you apply that insight bonus to both skills.`,
    "Cushion the Blow (Ex)": `As a reaction, you can expend one of your biohacks to protect an ally attuned to your custom microlab who is about to take falling damage. The target must be adjacent to you or within the first range increment of a ranged injection weapon you’re wielding. The target treats the fall as if it were 20 feet shorter, plus an additional 10 at 5th level and every 3 levels thereafter.
    At 5th level, you can spend 1 Resolve Point when you use this theorem to instead target an ally who is about to take bludgeoning damage from an attack or spell. The ally reduces the damage taken by an amount equal to twice your key ability score modifier. At 10th level, this amount increases to three times your key ability score modifier, and at 15th level, this amount increases to four times your key ability score modifier. Once a creature has benefited from this use of cushion the blow, they cannot benefit from it again until they take a 10-minute rest to recover Stamina Points.`,
    "Decomposing Inhibitor (Ex)":`Any biohack inhibitor you successfully use against a creature causes its cellular structure to rapidly break down. For each of the next 1d4+1 rounds, the target takes 2d6 acid damage at the end of its turn.`,
    "Electrostatic Sense (Ex)": `You’ve attuned your body’s natural electrical field to be sensitive to others’ energy. You gain blindsense (electricity) with a range of 5 feet. You can expend a biohack as a move action to increase the range to 20 feet for a number of rounds equal to your key ability score modifier.
    If you have blindsense (electricity), blindsight (electricity), electrolocation, or a similar sensory ability that uses electricity, you instead increase that ability’s range by 10 feet. You can expend a biohack as a move action to instead increase the ability’s range by 50% or to a range of 20 feet, whichever is greater, for a number of rounds equal to your key ability score.`,
    "Energized Assault (Ex)": `As a move action, you can expend a biohack to amplify your body’s natural electrical field to energize your attacks. For one minute, whenever you make an attack with a weapon, you can replace half that weapon’s damage with electricity damage. If the weapon already deals two types of damage, replace one of them of your choice with electricity. This theorem never causes a weapon that normally targets KAC to target EAC.`,
    "Field Dressing (Ex)": `As a standard action, you can use your custom microlab to quickly render medical aid to an adjacent willing or unconscious creature. If you are an instinctive biohacker, the target regains a number of Stamina Points equal to your key ability score modifier. If you are a studious biohacker, the target regains a number of Hit Points equal to your key ability score modifier. This number increases to 1d6 + your key ability score modifier at 4th level, and to 2d8 + your key ability score modifier at 8th level. You must have your custom microlab in your possession to use this ability, and you can use it a number of times per day equal to your key ability score modifier. Regardless of what type of biohacker you are, once a creature has benefited from your field dressing, they cannot benefit from your field dressing again until they take a 10-minute rest to recover Stamina Points.`,
    "Hampering Inhibitor (Ex)": `Any biohack inhibitor you successfully use against a foe decreases that foe’s speed by 50%, to a minimum of 5 feet, in addition to the normal inhibitor effect you choose. If the target has multiple movement types, all its speeds are decreased.`,
    "Instant Recalibration (Ex)": `When a creature attuned to your microlab would fail a skill check by 2 or less, you can expend a biohack as a reaction to adjust its hormone levels to coax peak performance, allowing the creature to reroll the skill check and take the better result. Once an attuned creature has rerolled a skill check from this ability, it can’t do so again until you rest for 8 hours to regain Resolve Points. You must be aware of and have line of sight to the attuned creature to use this theorem.`,
    "Locomotive Adaptation (Ex)": `Once per day, you can spend 10 minutes creating fast-acting mutagens that alter subjects’ physiology (granting sticky suckers or webbing and fins on their appendages). Choose either a climb speed of 20 feet or a swim speed of 20 feet. At the end of the 10 minutes, you and all those attuned to your custom microlab gain the selected movement speed with a duration of 10 minutes × your biohacker level. A creature that already has the chosen form of movement is unaffected by the mutagen. You must have your custom microlab in your possession to use this ability.`,
    "Medication Mastery (Ex)": `You can quickly turn the compounds and catalysts in your custom microlab into medicinals. You can create an analgesic, an antitoxin, or a sedative with an item level no higher than your biohacker level. If you are an instinctive biohacker, you can also make excitants and stimulants. If you are a studious biohacker, you can also make antiemetics and coagulants. These medicinals are highly unstable and cannot be stored for later use or used by anyone else. You can add one of these medicinals to any attack you make with an injection weapon as part of the action to make the attack or attacks, but you can’t add a biohack of any kind to the same attack. You can use this ability a number of times equal to your key ability score, and you regain all expended uses of this ability (up to your maximum) when you take a 10-minute rest to recover Stamina Points.`,
    "Microlab Jack (Ex)": `Your custom microlab can function as a standard datajack, though it doesn’t count against the maximum number of augmentations you can install in your brain system. This functions as a high-density datajack at 8th level and as an accelerated datajack at 14th level.`,
    "Mobility Enhancement (Ex)": `You can administer a special biohack to a living creature, enhancing the target’s flexibility. This functions as a biohack booster but does not count against your total uses of biohack. If you hit the target, they increase the distance they can move when using Acrobatics to tumble by 5 feet, and they reduce the amount by which the Acrobatics DC increases when the target tumbles through a space threatened by multiple opponents to 1 per additional foe beyond the first. The target can also calculate the DC of Athletics checks to jump as though they always had a running start. You can use this special biohack a number of times per day equal to your key ability modifier, and its effects last for 1 minute.`,
    "Morphing Hack (Su)": `You have developed a special hybrid biohack that can physically transform a creature. Once per day as a standard action, you can target a living creature with a special biohack that counts against your total uses of biohacks and otherwise functions as a biohack. If you hit your target, they are affected by a 1st-level polymorph spell; an unwilling creature can negate the effect with a successful Fortitude save. Your caster level for this effect is equal to your biohacker level, and the effect lasts for a number of rounds equal to your key ability score. As you advance in biohacker levels, your morphing hack becomes more potent; increase the polymorph spell level to 2nd when you reach 5th level, and by one additional spell level for every 3 biohacker levels you have (maximum 6th level at 17th level).
    When you select this theorem, select a single polymorph form according to the guidelines for the spell on page 145 of Alien Archive 2. Every time you use this ability, the target turns into the polymorph form you have chosen. Each time you gain a biohacker level, you can select a new form for this theorem, replacing the old one. You can select this theorem multiple times, with each additional theorem giving you an additional daily use of this biohack and an additional polymorph form for the biohack.`,
    "Painful Injection (Ex)": `When you hit an enemy with a weapon with the injection weapon special property, you can cause the ammunition (whatever it may be) to lodge painfully in that creature’s body. The target takes an additional amount of damage equal to half your key ability modifier.`,
    "Prickly Booster (Ex)": `Any booster you successfully use on yourself or an ally causes the target’s skin to sprout thorny projections for a number of rounds equal to your key ability score modifier, in addition to the booster’s other effects. Any creature who hits the target with a natural attack or unarmed melee attack takes 1d6 piercing damage; this damage increases to 2d6 at 8th level, to 3d6 at 14th level, and to 5d6 at 20th level.`,
    "Speedy Serums (Ex)": `When you use your custom microlab to craft a serum, you can do so in half the normal time.`,
    "Strange Anatomy (Ex)": `Using complex chemical concoctions, you have altered your own physiology. When an enemy scores a critical hit against you, reduce the amount of damage dealt by a number equal to your key ability score modifier. This does not prevent you from taking critical hit effects. At 6th level, reduce the damage from critical hits by twice your key ability score modifier. At 12th level, you reduce it by three times your key ability score modifier, and at 18th level, you reduce it by four times your key ability score modifier.`,
    "Telepathic Boost (Ex)": `In addition to your biohacks’ normal effects, creatures you affect with your biohack boosters can communicate with you telepathically at a range of 30 feet for the duration of the booster’s effect as long as you share a language.`,
    "Toxic Skin (Ex)": `You have handled so many toxins that they’ve accumulated in your skin (or equivalent outer layer). Any creature that hits you with a natural attack must succeed at a Fortitude save or gain the sickened condition for 1 minute. Any creature that swallows you whole must succeed at a Fortitude save or gain the nauseated condition for 1 round; the creature automatically vomits you back out at the start of its next turn. (This vomiting takes no action.) When expelled, you land prone adjacent to the creature in a square of the creature’s choosing. Once a creature has been affected by your toxic skin, it can’t be affected by it again for 24 hours, although it could be affected by another biohacker’s toxic skin.`,
    "Treat Condition (Ex)": `As a standard action, you can treat a willing, adjacent creature to remove the shaken, sickened, or staggered condition. This doesn’t end the effect that caused the condition, and the target can regain the condition from any source as normal. You can use this ability a number of times equal to your key ability score modifier. You regain all expended uses of this ability (up to your maximum) when you take a 10-minute rest to recover Stamina.`,
    "Treatment Mastery (Ex)": `You gain a +2 circumstance bonus to your Medicine check when using the treat disease and treat drugs or poison tasks, and can do so with greater speed. It takes you 1 minute to treat disease, and a move action to treat drugs or poison. You can also attempt these tasks without a medkit, medical lab, or medical bay, though doing so takes the normal amount of time for both tasks and you do not gain the bonus to the checks.`
}


  // Update selection
  const handleChoiceSelection = (selectedChoice, choiceType) => {
    formData.feature_choices = formData.feature_choices || {};
  
    // Always ensure nested structure, even for non-"Biohacks"
    formData.feature_choices[feature] = formData.feature_choices[feature] || {};
    formData.feature_choices[feature][choiceType] = selectedChoice;
  
    // Update the parent state with the updated form data
    updateFormData(formData);
  };
  
//   console.log(feature);

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
              {biohacks.basic_booster.map((option, idx) => (
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
