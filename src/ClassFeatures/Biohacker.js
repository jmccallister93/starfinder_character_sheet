import { Text, Radio, RadioGroup, Stack, Heading, Box } from "@chakra-ui/react";
import { useState } from "react";

const Biohacker = ({ formData, updateFormData, feature, classId }) => {
  const [selectedBooster, setSelectedBooster] = useState();
  const [selectedInhibitor, setSelectedInhibitor] = useState();
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState();
  const [selectedTheorems1, setSelectedTheorems1] = useState();
  const [selectedTheorems2, setSelectedTheorems2] = useState();
  const [selectedTheorems3, setSelectedTheorems3] = useState();
  const [selectedTheorems4, setSelectedTheorems4] = useState();
  const [selectedTheorems5, setSelectedTheorems5] = useState();
  const [selectedTheorems6, setSelectedTheorems6] = useState();
  const [selectedTheorems7, setSelectedTheorems7] = useState();
  const [selectedTheorems8, setSelectedTheorems8] = useState();
  const [selectedTheorems9, setSelectedTheorems9] = useState();
  const [selectedTheorems10, setSelectedTheorems10] = useState();
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
  const theoremsLevel2 = {
    "Accelerated Metabolism (Ex)": `Once per day, you can target a living creature with a special biohack as a move action. This doesn’t deal any damage and doesn’t count against your total uses of biohacks, but it otherwise functions as a biohack. If you hit the target, it must succeed at a Fortitude saving throw or suffer a dramatic increase in the speed at which its system metabolizes drugs and poisons. For the next 10 minutes, the onset time and maximum duration of any contact, ingested, inhaled, or injury drugs and poisons affecting the target are halved, and the victim must attempt two saves each round against the effects, progressing to the next stage on the appropriate track with each failed save.`,
    "Adaptive Metabolism (Ex)": `As a move action, you can expend one of your biohacks to inject yourself or an ally attuned to your custom microlab with a specially designed compound derived from a native Kehtarian lichen with unsurpassed adaptive properties, momentarily fooling the target’s system into metabolizing chemical compounds differently. Choose any serum with an item level no greater than half your biohacker level. The next poison, drug, or serum that affects the target before the start of your next turn has the effect of the serum you chose instead of its usual one. The substituted effect lasts a maximum of 1d4 rounds or the length of the original effect, whichever is shorter. If the original effect is still ongoing when the duration expires, it resumes at the same stage it was at before the change.`,
    "Ampoule Expertise (Su)": `You’ve discovered how to create specialized spell ampoules using ingredients in your custom microlab. Your selection of spell amps is limited to a number of spells equal to 3 + half your biohacker level; these spells must fulfill all the requirements for a spell amp as detailed on page 224 of the Starfinder Core Rulebook. These spells comprise the list of spell amps you can create with this ability. Each time you gain a biohacker level, you can swap out one spell on this list for another spell that qualifies. Whenever you gain an even‑numbered biohacker level, you also select one additional spell to add to your list of spell amps.
    The first time each day that you create your biohacks, you can create two 0-level spell amps and one 1st-level spell amp from your list. At 8th level, you also can prepare one 2nd-level spell amp from your list. Your spell amps are highly experimental and provide a benefit only when either consumed by you or when an imbiber also spends 1 Resolve Point as part of the action to consume the spell amp. You can inject these spell amps as though they were biohacks, though you must expend 1 Resolve Point and a biohack to do so.`,
    "Botanical Booster (Ex)": `Any booster you successfully use on yourself or an ally alters the target’s biochemistry to become more like that of a plant or plant creature. The target gains a +2 enhancement bonus to saving throws against mind-affecting effects, paralysis, poison, polymorph, sleep, and stunning effects, unless the effect specifies that it’s effective against plants. This extra benefit to the booster doesn’t affect targets with the plantlike subtype or the plantlike universal creature rule.`,
    "Culinary Expert (Ex)": `You can craft food or drink in half the time it would normally take, your custom microlab counts as professional’s tools for Profession (cook) checks, and you can use your Life Science skill in place of Profession (cook) for checks other than those to earn a living. If you gain an insight bonus to Life Science or Profession (cook) checks, you apply that insight bonus to both skills.`,
    "Cushion the Blow (Ex)": `As a reaction, you can expend one of your biohacks to protect an ally attuned to your custom microlab who is about to take falling damage. The target must be adjacent to you or within the first range increment of a ranged injection weapon you’re wielding. The target treats the fall as if it were 20 feet shorter, plus an additional 10 at 5th level and every 3 levels thereafter.
    At 5th level, you can spend 1 Resolve Point when you use this theorem to instead target an ally who is about to take bludgeoning damage from an attack or spell. The ally reduces the damage taken by an amount equal to twice your key ability score modifier. At 10th level, this amount increases to three times your key ability score modifier, and at 15th level, this amount increases to four times your key ability score modifier. Once a creature has benefited from this use of cushion the blow, they cannot benefit from it again until they take a 10-minute rest to recover Stamina Points.`,
    "Decomposing Inhibitor (Ex)": `Any biohack inhibitor you successfully use against a creature causes its cellular structure to rapidly break down. For each of the next 1d4+1 rounds, the target takes 2d6 acid damage at the end of its turn.`,
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
    "Treatment Mastery (Ex)": `You gain a +2 circumstance bonus to your Medicine check when using the treat disease and treat drugs or poison tasks, and can do so with greater speed. It takes you 1 minute to treat disease, and a move action to treat drugs or poison. You can also attempt these tasks without a medkit, medical lab, or medical bay, though doing so takes the normal amount of time for both tasks and you do not gain the bonus to the checks.`,
  };
  const theoremsLevel8 = {
    "Advanced Locomotive Adaptation (Ex)": `You can use locomotive adaptation twice per day, and the climb and swim speeds you grant with this theorem increase to 30 feet each. When selecting the movement speed you give the targets, you add a burrow speed of 20 feet as well as an extraordinary fly speed of 20 feet with average maneuverability to the options from which you can choose. You must have the locomotive adaptation theorem to choose this theorem.`,
    "Arms Expert (Ex)": `If you have the weapon specialization class feature, add your full class level to damage (rather than half your class level) with small arms and weapons with which you have gained proficiency through the injection expert class feature.`,
    "Elongation Mutation (Ex)": `Any booster you successfully use on yourself or an ally causes the target’s limbs to become elastic and capable of stretching a great distance. The creature increases its reach by 5 feet. This effect lasts a number of rounds equal to your primary ability score modifier (minimum 1 round), in addition to the booster’s other effects.`,
    "Enhanced Senses (Ex)": `Following a regimen of experimental treatments, you have altered your senses to notice even the faintest traces of sounds or movement. You gain blindsense (vibration) with a range of 5 feet as well as a +2 enhancement bonus to Will saving throws against illusions.
    As a move action, you can spend 1 Resolve Point to enter a state of heightened awareness. This state allows you see invisible creatures as per see invisibility, your enhancement bonus to Will saving throws against illusions increases to +4, and you take a –2 penalty to Fortitude saving throws due to the enhanced strain on your body. This state lasts for a number of minutes equal to 10 × your biohacker level, and you can end the state before then as a swift action.`,
    "Far Injection (Ex)": `Constant tinkering allows you to increase the range of ranged injection weapons with which you gained proficiency through your injection expert class feature. The range increments of these weapons double when you use them. At 16th level, their range increments instead triple when you use them.`,
    "First Aid Expert (Ex)": `When you use your custom microlab as a medkit, advanced medkit, or medical lab to treat deadly wounds and exceed the DC by 5, rather than add your Intelligence modifier to the amount healed, you add either twice your Intelligence modifier or twice your Wisdom modifier to the amount healed.`,
    "Grounding Inhibitor (Ex)": `Any biohack inhibitor you successfully use against a foe that has a nonmagical fly speed severely inhibits that target’s ability to fly. In addition to taking the inhibitor’s normal effects, the target has its maneuverability reduced to clumsy; if its maneuverability is already clumsy, its fly speed is halved.`,
    "Improved Instant Recalibration (Ex)": `You’ve learned to spot a disaster before it happens. You can use the instant recalibration theorem when an attuned creature fails a skill check by 3 or less. If you also spend a Resolve Point when activating this ability, you can instead affect an attuned creature who would fail a skill check by 5 or less. You must know the instant recalibration theorem to select this theorem.`,
    "Improved Treat Condition (Ex)": `Add the following conditions to the list of those you can remove with the treat condition theorem: frightened and nauseated. You must know the treat condition theorem to select this theorem.`,
    "Powerful Biohacks (Ex)": `You can use fringe science to tweak your biohacks so that you can affect any creature with biohacks that normally don’t affect creatures with the unliving universal creature rule. If the biohack had the poison descriptor, you can remove that descriptor each time you use that biohack.`,
    "Stable Biohacks (Ex)": `You have ironed out many of the kinks in your formulas, and your biohacks now remain effective even when they leave your possession. This allows you to give your biohacks to others to use at their convenience. Other creatures must load a biohacks into an injection weapon before use as a move action, or apply the biohack to themself or an adjacent willing or unconscious ally as a standard action. Biohacks you create that are not used count against your maximum until they are used or become inert 24 hours after creation.`,
    "Sure-Step Booster (Ex)": `Any booster you successfully use on yourself or an ally grants the target the ability to take a guarded step through difficult terrain for a number of rounds equal to your key ability score modifier, in addition to its normal effects.`,
    "Technological Biohacks (Ex)": `Your biohacks that affect only living creatures can also affect creatures with the construct type or technological subtype. Your biohacks ignore such creatures’ immunities to poison.`,
    "Thickened Bones (Ex)": `Through extensive biochemical treatments, you’ve permanently reinforced your bones, making it less taxing to carry heavy loads and helping you resist catastrophic harm. Your bulk carrying limit increases by 2, and you don’t become fatigued from the long-term effects of living in a high-gravity environment. You gain a +2 bonus to saving throws made to resist the wound and severe wound critical hit effects, as well as other effects that would sever or mutilate your limbs.`,
    "Tranq Dart (Ex)": `Once per day, you can target a living creature with a special biohack as a standard action. This doesn’t deal any damage and doesn’t count against your total uses of biohacks, but it otherwise functions as a biohack. If you hit the target, they must succeed at a Fortitude saving throw or fall into a deep sleep after 1 round, gaining the asleep condition. On a successful saving throw, the target is unaffected. At 14th level, you can use this ability twice per day. This is a poison effect.`,
    "Treat Radiation (Ex)": `Using your custom microlab, you can spend 1 hour to treat the effects of radiation in one living creature, after which you make a special check, rolling 1d20 and adding your biohacker level and any insight bonus you have to Medicine checks to the result. The check’s DC equals the radiation effect’s save DC. If you succeed, the target is cured of both the radiation’s poison effects and the radiation sickness disease, moving the target to the healthy state on both tracks. At 14th level, it takes you only 10 minutes to perform this treatment, though this doesn’t count as a 10-minute rest to regain Stamina Points.`,
  };
  const theoremsLevel14 = {
    "Ampoule Mastery (Su)": `You have surpassed conventional spell ampoule science, allowing you to prepare one 3rd-level spell amp each day from your list of known spell amps using the ampoule expertise theorem. When you gain this theorem, you also add one additional spell to your list of spell amps that you can prepare.
    At 18th level, you can prepare one 4th-level spell amp each day from your list of known spell amps; this exceeds the normal level limit for spell ampoules, though any 4th-level spells you add to your list of spell amps must still follow all other rules for creating spell amps.
    You must have Ampoule Expertise to select this theorem.`,
    "Bleeding Biohacks (Ex)": `Your biohacks include insidious anticoagulants. Any biohack inhibitor that you successfully use against a target also afflicts them with an amount of bleed damage equal to 1d10 + your key ability score modifier, in addition to the inhibitor’s standard effects.`,
    "Energetic Booster (Ex)": `Any booster you successfully use on yourself or an ally grants the benefits of Agile Casting, Shot on the Run, or Spring Attack (your choice) for a number of rounds equal to your key ability score, in addition to its normal effect. The ally does not have to meet any of these feats’ prerequisites to gain these benefits.`,
    "Greater Field Dressing (Ex)": `When you use the field dressing theorem, the target instead regains a number of Hit Points or Stamina Points (whichever you normally restore with field dressing) equal to 4d8 + your key ability score modifier, or 6d8 + your key ability score modifier if you are 18th level or higher. You must know the field dressing theorem to select this theorem.`,
    "Greater Treat Condition (Ex)": `Add the following conditions to the list of those you can remove with the treat condition theorem: cowering, dazed, panicked, paralyzed, and stunned. You must know the treat condition and improved treat condition theorems to select this theorem.`,
    "Iron Gut (Ex)": `You know how to fight through nausea. You are immune to the sickened condition. While you are nauseated, you can take either a swift action and move action during your turn or two move actions. The nauseated condition still prevents you from attacking, casting spells, concentrating on spells, or doing anything else that requires attention.`,
    "Liquid Bravery (Ex)": `You have consumed enough fortifying chemical concoctions to have negated some of the fear you feel. You are immune to the shaken condition. If you are frightened, you need not flee or fight, and if you are panicked, you need not drop all held items and flee, but you still cower if you are cornered. You still take the penalties associated with frightened and panicked as normal.`,
    "Ooze Form (Ex)": `Once per day, you can spend 10 minutes creating and administering a mutagen that gives your body ooze-like qualities for a number of hours equal to your key ability score modifier. For this duration, you gain the compression and unflankable universal creature rules, as well as immunity to the additional damage from critical hits (though you are still affected by critical hit effects).
    Once during the mutagen’s duration as a reaction when you take piercing or slashing damage, you can split into two copies of yourself. Divide your current Hit Points and Stamina Points evenly between the two, but otherwise, the copies share the same statistics and equipment. If one of the copies casts a spell, expends ammunition, or uses other limited-use resources, that resource is consumed for both copies. Any item dropped by just one copy becomes inert, shapeless biomatter. The copies share the same initiative count, with one acting immediately after the other. Each turn, one of the copies can use a full round’s worth of actions, and the other can take only a move action.
    The effect lasts 5 rounds, after which one of the copies dissolves, and the other copy becomes you. Combine the copies’ Hit Point totals and Stamina Point totals to determine your HP and SP totals when the effect ends; these totals cannot exceed their normal maximums. If the copies are adjacent to each other, one copy can meld with the other as a move action, ending the effect prematurely. If one of the copies is reduced to 0 HP, the effect ends; your remaining copy becomes the “real” version, and you are staggered until the end of your next turn.`,
    "Poison Extraction (Ex)": `You’ve modified your custom microlab to deal with poisonous substances. When you fail a saving throw against a poison effect, you can activate your custom microlab as a reaction to attempt to extract the toxin. Reroll the saving throw with a +2 bonus, and use the second result. If you succeed, you cure the poison, shunt the toxin into a small reservoir in your custom microlab, and create a dose of the poison that you can use. The extracted poison becomes harmless if not used within 1 hour. Once you use this theorem, you can’t do so again until you spend 1 Resolve Point to recover Stamina Points.`,
  };

  //   Selecte Theorems
  const handleTheorems1Change = (value) => {
    setSelectedTheorems1(value);
    handleChoiceSelection(value, "theorem_1");
  };
  const handleTheorems2Change = (value) => {
    setSelectedTheorems2(value);
    handleChoiceSelection(value, "theorem_2");
  };
  const handleTheorems3Change = (value) => {
    setSelectedTheorems3(value);
    handleChoiceSelection(value, "theorem_3");
  };
  const handleTheorems4Change = (value) => {
    setSelectedTheorems4(value);
    handleChoiceSelection(value, "theorem_4");
  };
  const handleTheorems5Change = (value) => {
    setSelectedTheorems5(value);
    handleChoiceSelection(value, "theorem_5");
  };
  const handleTheorems6Change = (value) => {
    setSelectedTheorems6(value);
    handleChoiceSelection(value, "theorem_6");
  };
  const handleTheorems7Change = (value) => {
    setSelectedTheorems7(value);
    handleChoiceSelection(value, "theorem_7");
  };
  const handleTheorems8Change = (value) => {
    setSelectedTheorems8(value);
    handleChoiceSelection(value, "theorem_8");
  };
  const handleTheorems9Change = (value) => {
    setSelectedTheorems9(value);
    handleChoiceSelection(value, "theorem_19");
  };
  const handleTheorems10Change = (value) => {
    setSelectedTheorems10(value);
    handleChoiceSelection(value, "theorem_10");
  };

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

      {/* Theorums 1 */}
      {feature === "Theorem 1" ? (
        <>
          <Heading fontSize="1.5rem">Theorems 1</Heading>
          <RadioGroup
            value={selectedTheorems1}
            onChange={handleTheorems1Change}
          >
            <Stack spacing={4}>
              {Object.keys(theoremsLevel2).map((theorem1, idx) => (
                <Box key={idx}>
                  <Radio value={theorem1}>
                    <b>{theorem1}</b>
                  </Radio>
                  {theoremsLevel2[theorem1]
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
      {/* Theorums 2 */}
      {feature === "Theorem 2" ? (
        <>
          <Heading fontSize="1.5rem">Theorems 2</Heading>
          <RadioGroup
            value={selectedTheorems2}
            onChange={handleTheorems2Change}
          >
            <Stack spacing={4}>
              {Object.keys(theoremsLevel2).map((theorem1, idx) => (
                <Box key={idx}>
                  <Radio value={theorem1}>
                    <b>{theorem1}</b>
                  </Radio>
                  {theoremsLevel2[theorem1]
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
      {/* Theorums 3 */}
      {feature === "Theorem 3" ? (
        <>
          <Heading fontSize="1.5rem">Theorems 3</Heading>
          <RadioGroup
            value={selectedTheorems3}
            onChange={handleTheorems3Change}
          >
            <Stack spacing={4}>
              {Object.keys(theoremsLevel2).map((theorem1, idx) => (
                <Box key={idx}>
                  <Radio value={theorem1}>
                    <b>{theorem1}</b>
                  </Radio>
                  {theoremsLevel2[theorem1]
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
      {/* Theorums 4 */}
      {feature === "Theorem 4" ? (
        <>
          <Heading fontSize="1.5rem">Theorems 4</Heading>
          <RadioGroup
            value={selectedTheorems4}
            onChange={handleTheorems4Change}
          >
            <Stack spacing={4}>
              {Object.keys(theoremsLevel8).map((theorem8, idx) => (
                <Box key={idx}>
                  <Radio value={theorem8}>
                    <b>{theorem8}</b>
                  </Radio>
                  {theoremsLevel8[theorem8]
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
      {/* Theorums 5 */}
      {feature === "Theorem 5" ? (
        <>
          <Heading fontSize="1.5rem">Theorems 5</Heading>
          <RadioGroup
            value={selectedTheorems5}
            onChange={handleTheorems5Change}
          >
            <Stack spacing={4}>
              {Object.keys(theoremsLevel8).map((theorem8, idx) => (
                <Box key={idx}>
                  <Radio value={theorem8}>
                    <b>{theorem8}</b>
                  </Radio>
                  {theoremsLevel8[theorem8]
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
      {/* Theorums 6 */}
      {feature === "Theorem 6" ? (
        <>
          <Heading fontSize="1.5rem">Theorems 6</Heading>
          <RadioGroup
            value={selectedTheorems6}
            onChange={handleTheorems6Change}
          >
            <Stack spacing={4}>
              {Object.keys(theoremsLevel8).map((theorem8, idx) => (
                <Box key={idx}>
                  <Radio value={theorem8}>
                    <b>{theorem8}</b>
                  </Radio>
                  {theoremsLevel8[theorem8]
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
      {/* Theorums 7 */}
      {feature === "Theorem 7" ? (
        <>
          <Heading fontSize="1.5rem">Theorems 7</Heading>
          <RadioGroup
            value={selectedTheorems7}
            onChange={handleTheorems7Change}
          >
            <Stack spacing={4}>
              {Object.keys(theoremsLevel14).map((theorem14, idx) => (
                <Box key={idx}>
                  <Radio value={theorem14}>
                    <b>{theorem14}</b>
                  </Radio>
                  {theoremsLevel14[theorem14]
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
      {/* Theorums 8 */}
      {feature === "Theorem 8" ? (
        <>
          <Heading fontSize="1.5rem">Theorems 8</Heading>
          <RadioGroup
            value={selectedTheorems8}
            onChange={handleTheorems8Change}
          >
            <Stack spacing={4}>
              {Object.keys(theoremsLevel14).map((theorem14, idx) => (
                <Box key={idx}>
                  <Radio value={theorem14}>
                    <b>{theorem14}</b>
                  </Radio>
                  {theoremsLevel14[theorem14]
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
      {/* Theorums 9 */}
      {feature === "Theorem 9" ? (
        <>
          <Heading fontSize="1.5rem">Theorems 9</Heading>
          <RadioGroup
            value={selectedTheorems9}
            onChange={handleTheorems9Change}
          >
            <Stack spacing={4}>
              {Object.keys(theoremsLevel14).map((theorem14, idx) => (
                <Box key={idx}>
                  <Radio value={theorem14}>
                    <b>{theorem14}</b>
                  </Radio>
                  {theoremsLevel14[theorem14]
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
      {/* Theorums 10 */}
      {feature === "Theorem 10" ? (
        <>
          <Heading fontSize="1.5rem">Theorems 10</Heading>
          <RadioGroup
            value={selectedTheorems10}
            onChange={handleTheorems10Change}
          >
            <Stack spacing={4}>
              {Object.keys(theoremsLevel14).map((theorem10, idx) => (
                <Box key={idx}>
                  <Radio value={theorem10}>
                    <b>{theorem10}</b>
                  </Radio>
                  {theoremsLevel14[theorem10]
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
