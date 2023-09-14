import React, { useEffect, useState } from "react";
import { Box, Text, Button, Flex, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody } from "@chakra-ui/react";
import { supabase } from "../client/supabaseClient";

const MAX_FEATS = 1;

const featPrerequisites = {
    "Accelerated Recovery": { abilityScores: { Con: 13 } },
    "Adaptive Casting": { abilityScores: { key: 19 }, casterLevel: 7 },
    "Adaptive Resistance": { feats: ["Enhanced Resistance"], baseAttackBonus: 4, racialTraits: ["early stage adaptation"] },
    "Adaptive Upgrade": { abilityScores: { Int: 19 }, skills: { Engineering: 10 } },
    "Agile Casting": { abilityScores: { key: 15, Dex: 15 }, feats: ["Mobility"], casterLevel: 4 },
    "Agile Swimmer": { racialTraits: ["swim speed"] },
    "Alien Herbalism": { skills: { "Life Science": 5, "Survival": 5 } },
    "All Hands on Deck": { racialTraits: ["four or more arms"] },
    "Antagonize": { skills: { Diplomacy: 5, Intimidate: 5 } },
    "Apt Mentor": { skills: { "Life Science or Physical Science": 5 } },
    "Arm Extensions": { racialTraits: ["constructed or construct type"] },
    "Bird's Eye View": { baseAttackBonus: 8 },
    "Blood of the Spider": { racialTraits: ["spell-like ability"] },
    "Borrowed Vitality": { skills: { Mysticism: 5 } },
    "Bud Drone": { classFeatures: ["Drone"], racialTraits: ["adaptation or early stage adaptation"] },
    "Climbing Master": { skills: { Athletics: 5 } },
    "Combat-Trained Mount": { skills: { "Survival": 1 } },
    "Complex Adaptation": { skills: { "Life Science": 5 }, racialTraits: ["early stage adaptation"] },
    "Connection Inkling": { abilityScores: { Wis: 15 }, characterLevel: 5, classRestrictions: ["mystic"] },
    "Corruption's Gift": { other: ["One or more corruption manifestations"] },
    "Cosmic Truth": { abilityScores: { Wis: 15 }, skills: { "Bluff": 5, "Mysticism": 5 } },
    "Creature Companion Adept": { skills: { "Survival": 1 } },
    "Creature Companion Expert": { feats: ["Creature Companion Adept"], skills: { "Survival": 4 } },
    "Creature Companion Master": { feats: ["Creature Companion Expert"], skills: { "Survival": 10 } },
    "Creature Companion Virtuoso": { feats: ["Creature Companion Master"], skills: { "Survival": 13 } },
    "Cultural Chameleon": {}, // No prerequisites
    "Deadly Boast": { abilityScores: { Cha: 19 }, skills: { "Bluff": 10 } },
    "Diehard": {}, // No prerequisites
    "Dispelling Strike": { baseAttackBonus: 10, skills: { "Mysticism": 10 } },
    "DiveBomb": { abilityScores: { Dex: 14 }, baseAttackBonus: 1 },
    "Diverse Conditioning": { racialTraits: ["eternal hope or ecstatic joy"], characterLevel: 5 },
    "Diversion": {}, // No prerequisites
    "Divine Blessing": { other: ["Worship a deity of an alignment within one step of your own alignment"] },
    "Echolocation Attack": { classSkills: ["Perception"] },
    "Effortless Aerobatics": {}, // No prerequisites
    "Eldritch Lore": { abilityScores: { key: 19 }, feats: ["Lesser Eldritch Lore", "Minor Eldritch Lore"], casterLevel: 10, classLevels: 10 },
    "Enclose Serums": { racialTraits: ["adaptation or early stage adaptation", "ooze type"] },
    "Enhanced Communalism": { characterLevel: 5, racialTraits: ["communalism"] },
    "Enhanced Resistance": { baseAttackBonus: 4 },
    "Environmental Adaptation": { abilityScores: { Con: 13 } },
    "Expansive Breath": { abilityScores: { Con: 11 } },
    "Extended Telepathy": { racialTraits: ["limited telepathy"] },
    "Extra Resolve": { characterLevel: 5 },
    "Fast Talk": { skills: { "Bluff": 5 } },
    "Fighting Balance": {}, // No prerequisites
    "Focused Sense": { abilities: ["Blindsense"] },
    "Four-Handed Hacker": { skills: { "Computers": 1 }, other: ["Four or more hands"] },
    "Free Runner": { skills: { "Acrobatics": 3 } },
    "Friends in Low Places": { skills: { "Diplomacy": 5 } },
    "Frightening Injection": { skills: { "Intimidate": 3 } },
    "Disease Adaptation": { abilityScores: { Con: 11 } },
    "Forward Momentum": { abilityScores: { Wis: 13 }, characterLevel: 5 },
    "Frightful Display": { abilityScores: { Cha: 15 }, skills: { "Intimidate": 5 }, other: ["Ability to cast spells"] },
    "Greater Eldritch Lore": { abilityScores: { key: 21 }, feats: ["Eldritch Lore", "Lesser Eldritch Lore", "Minor Eldritch Lore"], casterLevel: 13, classLevels: 13 },
    "Greater Shadow Infusion": { feats: ["Improved Shadow Infusion", "Shadow Infusion"], characterLevel: 13 },
    "Greater Spell Penetration": { feats: ["Spell Penetration"] },
    "Group Negotiations": { skills: { "Diplomacy": 5, "Intimidate": 5 } },
    "Harm Undead": { abilities: ["Healing channel connection power"], classLevels: { "Mystic": 1 } },
    "Hauler": { abilityScores: { Str: 13 } },
    "Helpful Telepath": { racialTraits: ["Communalism", "hive defense"], abilities: ["Limited telepathy", "Telepathy"] },
    "Hyper Speed": { racialTraits: ["Hyper"] },
    "Improved Demoralize": {}, // No prerequisites
    "Improved Dive Bomb": { abilityScores: { Dex: 14, Str: 14 }, feats: ["Dive Bomb"], baseAttackBonus: 7 },
    "Improved Energy Resistance": { abilityScores: { Con: 13 }, characterLevel: 10, racialTraits: ["Energy resistance"] },
    "Improved Iron Will": { feats: ["Iron Will"], characterLevel: 5 },
    "Improved Kip-Up": { skills: { "Acrobatics": 1 }, other: ["Kip-Up feat or moxie racial trait"] },
    "Improved Lightning Reflexes": { feats: ["Lightning Reflexes"], characterLevel: 5 },
    "Improved Shadow Infusion": { feats: ["Shadow Infusion"], characterLevel: 7 },
    "Improved Spell-Like Ability": { abilities: ["At least one spell-like ability that is a level-0 or 1st-level spell"], characterLevel: 4 },
    "Intuit Relationships": { skills: { "Perception": 1, "Sense Motive": 1 } },
    "Jet Dash": {}, // No prerequisites
    "Last-Chance Grab": { skills: { "Athletics": 3 } },
    "Lesser Eldritch Lore": { abilityScores: { key: 17 }, feats: ["Minor Eldritch Lore"], casterLevel: 7, classLevels: 7 },
    "Major Eldritch Lore": { abilityScores: { key: 23 }, feats: ["Eldritch Lore", "Greater Eldritch Lore", "Lesser Eldritch Lore", "Minor Eldritch Lore"], casterLevel: 16, classLevels: 16 },
    "Major Eldritch Lore": { abilityScores: { key: 23 }, feats: ["Eldritch Lore", "Greater Eldritch Lore", "Lesser Eldritch Lore", "Minor Eldritch Lore"], casterLevel: 16, classLevels: 16 },
    "Major Psychic Power": { abilityScores: { Cha: 15 }, feats: ["Minor Psychic Power", "Psychic Power"], characterLevel: 7 },
    "Major Stage Magic": { abilityScores: { Cha: 15 }, feats: ["Minor Stage Magic", "Stage Magic"], characterLevel: 7 },
    "Masked Visage": {}, // No prerequisites
    "Master Crafter": { skills: { "Computers": 5, "Engineering": 5, "Life Science": 5, "Mysticism": 5, "Physical Science": 5, "Profession": 5 } }, // Assuming any of these skills with 5 ranks will satisfy the prerequisite
    "Medical Expert": { skills: { "Life Science": 1, "Medicine": 1, "Physical Science": 1 } },
    "Memorable Coercer": { skills: { "Intimidate": 1 } },
    "Minor Eldritch Lore": { abilityScores: { key: 15 }, casterLevel: 4, classLevels: 4 },
    "Minor Psychic Power": { abilityScores: { Cha: 11 } },
    "Minor Stage Magic": { abilityScores: { Cha: 11 } },
    "Mounted Expert": { feats: ["Combat-Trained Mount"], skills: { "Survival": 5 } },
    "Multifaceted Nature": { racialTraits: ["Dimorphic", "Driftborn"], characterLevel: 9 },
    "Nanite Integration": { characterLevel: 3, other: ["Constructed racial trait or construct type"] },
    "Obnoxious Trickster": { feats: ["Improved Combat Maneuver (dirty trick)"] },
    "Oracular Gift": { abilities: ["Ability to cast augury"] },
    "Penetrating Spell": { other: ["Ability to cast 4th-level spells"] },
    "Percussive Maintenance": { abilityScores: { Str: 11 } },
    "Periastra Training": { abilityScores: { Cha: 13 }, skills: { "Mysticism": 5 }, other: ["Stellar mode class feature"] },
    "Poison Adaptation": { abilityScores: { Con: 11 } },
    "Poison Rejection": { abilityScores: { Con: 17 }, feats: ["Poison Adaptation"] },
    "Polymorph Adept": { abilities: ["You know the polymorph spell as a 3rd-level spell or higher"] },
    "Positive Conduit": { abilityScores: { Con: 13 } },
    "Profession Mastery": { abilityScores: { Cha: 13, Int: 13, Wis: 13 }, skills: { "Profession": 1 }, racialTraits: ["Cultural fascination"] },
    "Profession Mastery": { abilityScores: { Cha: 13, Int: 13, Wis: 13 }, skills: { "Profession": 1 }, racialTraits: ["Cultural fascination"] },
    "Lightning Reflexes": {},  // No prerequisites
    "Psychic Power": { abilityScores: { Cha: 13 }, feats: ["Minor Psychic Power"], characterLevel: 4 },
    "Quick Movement": { racialTraits: ["Quick movement racial trait"], characterLevel: 5 },
    "Rapid Response": {},  // No prerequisites
    "Reflect Projectiles": { abilityScores: { Dex: 15 }, feats: ["Weapon Focus (small arms)"], baseAttackBonus: 5 },
    "Reflective Resistance": { abilityScores: { Con: 13 }, racialTraits: ["Reflective resistance racial trait"], characterLevel: 5 },
    "Rend Foe": { abilityScores: { Str: 15 }, feats: ["Multi-Weapon Fighting"], baseAttackBonus: 6 },
    "Rending Claws": { abilityScores: { Str: 13 }, racialTraits: ["Rending claws racial trait"], characterLevel: 5 },
    "Ritual Caster": { abilityScores: { Int: 13, Wis: 13 }, skills: { "Mysticism": 5 } },
    "Rugged Norikama Training": { feats: ["Profession Mastery"], characterLevel: 5 },
    "Shadow Infusion": { characterLevel: 4 },
    "Share Pain": { abilityScores: { Wis: 15 }, feats: ["Empathic Connection"], characterLevel: 5 },
    "Shoot First": {},  // No prerequisites
    "Shot on the Run": { abilityScores: { Dex: 15 }, feats: ["Mobility"], baseAttackBonus: 4 },
    "Skilled Linguist": { abilityScores: { Int: 13 }, skills: { "Culture": 1 } },
    "Slamming Rush": { abilityScores: { Str: 13 }, feats: ["Improved Unarmed Strike"], baseAttackBonus: 6 },
    "Slink": { skills: { "Stealth": 5 } },
    "Small Arm Proficiency": {},  // No prerequisites
    "Sniper Weapon Proficiency": {},  // No prerequisites
    "Solar Manifestation": { characterLevel: 3, other: ["Stellar mode class feature"] },
    "Solar Wind": { characterLevel: 8, other: ["Stellar mode class feature"] },
    "Soulfire": { abilityScores: { Cha: 15 }, other: ["Solar weapon solar manifestation"] },
    "Special Weapon Proficiency": {},  // No prerequisites
    "Spell Focus": { abilityScores: { key: 13 } },
    "Spell Penetration": {},  // No prerequisites
    "Spider's Climb": { racialTraits: ["Climbing racial trait"], characterLevel: 5 },
    "Spring Attack": { abilityScores: { Dex: 15 }, feats: ["Mobility"], baseAttackBonus: 4 },
    "Squox Companion": { feats: ["Creature Companion Adept"], characterLevel: 5 },
    "Squox Training": { feats: ["Creature Companion Adept"], characterLevel: 5 },
    "Stand Still": {},  // No prerequisites
    "Stellar Parry": { abilityScores: { Dex: 13 }, other: ["Stellar mode class feature"] },
    "Step Up": {},  // No prerequisites
    "Step Up and Strike": { feats: ["Step Up"], baseAttackBonus: 6 },
    "Strike Back": { baseAttackBonus: 11 },
    "Supernova": { characterLevel: 9, other: ["Stellar mode class feature"] },
    "Superior Starquake": { characterLevel: 6, other: ["Stellar mode class feature"] },
    "Sure-Handed Hauler": { abilityScores: { Str: 13, Con: 13 }, skills: { "Athletics": 1 } },
    "Swarming Dispersal": { racialTraits: ["Swarming racial trait"] },
    "Swift Kick": { feats: ["Improved Unarmed Strike"], baseAttackBonus: 8 },
    "Swim-By Attack": { racialTraits: ["Swim speed"] },
    "Toughness": {},  // No prerequisites
    "Versatile Movement": {},  // No prerequisites
    "Versatile Specialization": { characterLevel: 3 },
    "Weapon Focus": { baseAttackBonus: 1 },
    "Weapon Specialization": { characterLevel: 3 },
    "Winded Escape": { racialTraits: ["Breathless racial trait"] },
    "Witchwyrd Countermagic": { abilityScores: { Cha: 15 }, racialTraits: ["Countermagic racial trait"], characterLevel: 5 },
    "Zero-G Training": {}  // No prerequisites
};


const Step5 = ({ updateFormData, formData }) => {
    const [featsList, setFeatsList] = useState([]);
    const [selectedFeats, setSelectedFeats] = useState([]);

    useEffect(() => {
        const fetchFeats = async () => {
            const { data, error } = await supabase.from('feats').select('Name, Prerequisites, Description');

            if (data) {
                setFeatsList(data);
            }
            if (error) {
                console.error("Error fetching feats:", error);
            }
        };

        fetchFeats();
    }, []);

    const toggleFeatSelection = (featName) => {
        setSelectedFeats(prev => {
            if (prev.includes(featName)) {
                return prev.filter(feat => feat !== featName);
            } else if (prev.length < MAX_FEATS) {
                return [...prev, featName];
            } else {
                return prev;
            }
        });
    };

    useEffect(() => {
        updateFormData("feats", selectedFeats);
    }, [selectedFeats]);

    return (
        <Box>
            <Text fontSize="2rem" textAlign="center" fontWeight="bold">
                Step 5: Feats
            </Text>

            <Flex direction="column" mb={4}>
                <Text fontSize="1.2rem">Selected Feats ({selectedFeats.length}/{MAX_FEATS}):</Text>
                <Box pl={4}>
                    {selectedFeats.map(feat => (
                        <Text key={feat} fontSize="1.1rem">{feat}</Text>
                    ))}
                </Box>
            </Flex>

            <Flex 
                wrap="wrap" 
                mt={4}
                direction="column"
                height="20rem"
                overflowY="auto"
            >
                {featsList.map((feat, index) => (
                    <Flex key={index} mb={3} w="25%" alignItems="center" justifyContent="center">
                        <Box textAlign="center" flex="1">
                            <Text fontSize="1.2rem" p="0.25rem">
                                {feat.Name}
                                <Popover>
                                    <PopoverTrigger>
                                        <Button size="xs" ml="2">
                                            ?
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent bg="black">
                                        <PopoverArrow />
                                        <PopoverHeader>{feat.Name}</PopoverHeader>
                                        <PopoverBody>
                                            <strong>Prerequisites:</strong> 
                                            <br />
                                            {feat.Prerequisites}
                                            <br />
                                            <strong>Description:</strong>
                                            <br />
                                            {feat.Description}
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Text>
                            <Button size="sm" p="1rem" onClick={() => toggleFeatSelection(feat.Name)}>
                                {selectedFeats.includes(feat.Name) ? "Deselect" : "Select"}
                            </Button>
                        </Box>
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
};

export default Step5;
