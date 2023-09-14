const classFeatures = {
    Biohacker: [
        {
          name: "Biohacker Expertise",
          level: 1,
          description: "At 1st level, you gain a +1 insight bonus to Medicine, Life Science, and Engineering skill checks." 
        },
        {
          name: "Field Discovery",
          level: 1,
          description: "At 1st level, you gain one field discovery of your choice. You gain an additional field discovery at 3rd level and every 2 levels thereafter."
        },
        {
          name: "Nanite Surge",  
          level: 1,
          description: "At 1st level, you gain a nanite surge, allowing you to direct your nanites to give you a bonus or heal your allies."
        },
        {
          name: "Biohacking",
          level: 2,
          description: "At 2nd level, you can augment allies with a biohack using nanites, granting enhancements and healing."
        }, 
        {  
          name: "Evasion",
          level: 2,
          description: "At 2nd level, you gain evasion, allowing you to avoid damage from many area-effect attacks."
        },
        {
          name: "Hyperawareness",
          level: 6,  
          description: "At 6th level, you gain a bonus to Perception and Sense Motive checks."
        },
        {
          name: "Advanced Biohacking",
          level: 7,
          description: "At 7th level, your biohacking abilities become more advanced and versatile."
        },
        {
          name: "Perfect Physique",
          level: 17,
          description: "At 17th level, your mastery over your physiology makes you immune to disease and poison."
        },
        {
          name: "Master Biohacker",
          level: 20,
          description: "At 20th level, you become a master biohacker, gaining increased uses of biohacks and unlocking greater nanite potential."
        }
      ],
      Envoy: [{
        name: "Expertise", 
        level: 1,
        description: "At 1st level, you gain an expertise talent of your choice, granting you special abilities."
      },
      { 
        name: "Skill Expertise",
        level: 1,
        description: "At 1st level, you gain skill expertise, granting you bonuses to certain trained skills."
      },
      {
        name: "Envoy Improvisation",  
        level: 1,  
        description: "At 1st level, you gain an envoy improvisation, granting you a versatile skill to use."
      },
      {
        name: "Nova Power",
        level: 3,
        description: "At 3rd level, you gain the ability to unleash powerful nova powers with specialized augmentations." 
      },
      {
        name: "Skill Mastery",
        level: 7,
        description: "At 7th level, you become so skilled that you can reroll certain skill checks."
      },
      {
        name: "Inspiring Boost",
        level: 13,
        description: "At 13th level, you can grant your allies bonuses to skill checks, ability checks, and saving throws."
      }, 
      {
        name: "Superior Improvisation",
        level: 15,
        description: "At 15th level, you gain an additional envoy improvisation."
      },
      {
        name: "Master Gevalarsk Lancer",
        level: 19,
        description: "At 19th level, you become a master orator, gaining bonuses to Diplomacy and Intimidate and the ability to read creatures."
      },
      {  
        name: "Legendary Improvisation",
        level: 20, 
        description: "At 20th level, you gain your final envoy improvisation."
      }],
      Mechanic: [  {
        name: "Expertise",
        level: 1,
        description: "At 1st level, you gain a +1 insight bonus to Engineering and Computers skill checks."
      },
      {
        name: "Bot Builder",
        level: 1,
        description: "At 1st level, you gain the ability to build a custom robot companion called a drone."
      },
      {
        name: "Custom Rig",
        level: 1,
        description: "At 1st level, you gain your own custom rig, a mechanical suit that augments your abilities."
      },
      {
        name: "Overdrive",
        level: 2,
        description: "At 2nd level, you gain the ability to overcharge your gear with overdrive, granting bonuses."
      },
      {
        name: "Remote Tech",
        level: 5,
        description: "At 5th level, you can remotely control drones and other technology through your custom rig."
      },
      {  
        name: "Power Surge",
        level: 11,
        description: "At 11th level, your overdrive bonuses improve and you gain the ability to charge your drone's gear."
      },
      {
        name: "Mech Jockey",
        level: 16,
        description: "At 16th level, your expertise with machines allows you to build more advanced drones."
      },
      {
        name: "Tech Master",
        level: 19,
        description: "At 19th level, you achieve complete mastery over technology, gaining skill bonuses and gear enhancements." 
      },
      {
        name: "Mech Mastery",
        level: 20,
        description: "At 20th level, your custom rig reaches its full potential, and your drones become incredibly powerful."
      }],
      Mystic: [{
        name: "Spellcasting",
        level: 1,
        description: "At 1st level, you can cast mystic spells drawn from the mystic spell list using your key ability score."
      },
      {
        name: "Spell Resistance",
        level: 1,
        description: "At 1st level, you gain spell resistance equal to 6 + your mystic level."
      },  
      {
        name: "Channel",
        level: 1,
        description: "At 1st level, you can channel energy through your connection powers."
      },
      {
        name: "Connection",
        level: 1,
        description: "At 1st level, you learn two connection powers from those available to your chosen connection."
      },
      {
        name: "Magic Hack",
        level: 5,
        description: "At 5th level, you can undermine other spellcasters with targeted counterspell attempts called magic hacks."
      },
      {
        name: "Mind Barrier",
        level: 9,
        description: "At 9th level, you shield your mind each day, granting you bonuses against mental attacks."
      },
      {
        name: "Phenomenal Power",
        level: 13,
        description: "At 13th level, you can expend more focus to increase the power of your spells phenomenally."
      },
      {
        name: "Rune Artisan",  
        level: 15,
        description: "At 15th level, you can scribe mystic runes to augment your spells, granting bonuses and new effects."
      },
      {
        name: "Overmind",
        level: 20,
        description: "At 20th level, your mastery of mysticism makes you an overmind, granting you powerful abilities and bonuses."
      }],
      Operative: [  {
        name: "Operative's Edge",
        level: 1,
        description: "At 1st level, you gain a +1 insight bonus to initiative checks and skill checks."
      },
      {
        name: "Evasion",
        level: 2, 
        description: "At 2nd level, you gain evasion, allowing you to avoid damage from many area-effect attacks."
      },
      {
        name: "Debilitating Trick",
        level: 3,
        description: "At 3rd level, you can trick or startle foes, hampering them for 1 round with a trick combat maneuver."
      },
      {
        name: "Uncanny Mobility",  
        level: 5,
        description: "At 5th level, you can no longer be caught flat-footed and can move through threatened squares without provoking attacks of opportunity."
      },
      {
        name: "Specialization",
        level: 6,
        description: "At 6th level, you gain an operative specialization, granting you specialized techniques and abilities."    
      },
      {
        name: "Double Debilitation",
        level: 9,  
        description: "At 9th level, you can debilitate two targets at once with your trick combat maneuver."
      },
      {
        name: "Triple Debilitation",
        level: 13,
        description: "At 13th level, you can debilitate three targets at once with your trick combat maneuver."
      },
      {
        name: "Master Debilitator",
        level: 17,
        description: "At 17th level, whenever you debilitate a foe, you hamper a second foe with the same debilitating trick."
      },
      {
        name: "Operative Mastery",
        level: 20,
        description: "At 20th level, you become a master operative, gaining initiative, skill, and trick attack bonuses."
      }],
      Solarian: [  {
        name: "Solar Weapon",
        level: 1,
        description: "At 1st level, you summon a solar weapon that orbits your body and attacks foes."
      },
      {
        name: "Solar Armor",
        level: 1, 
        description: "At 1st level, you gain solar armor that orbits your body and protects you."
      },
      {
        name: "Stellar Mode",
        level: 1,
        description: "At 1st level, you gain your chosen stellar mode, altering your solar weapon and granting you special abilities."
      },
      {
        name: "Solar Crystals",
        level: 1,
        description: "At 1st level, you gain a pool of solar crystals you can use to activate stellar revelations."
      },
      {
        name: "Stellar Revelation",
        level: 2,
        description: "At 2nd level, and every 2 levels thereafter, you learn a stellar revelation from your stellar mode choices."
      },
      {
        name: "Gravity Hold",
        level: 5,
        description: "At 5th level, you can spend crystals to immobilize a foe by increasing gravity around it."
      },
      {
        name: "Attunement",
        level: 7,
        description: "At 7th level, you become closely attuned with your stellar mode, boosting associated weapon and spell DCs."
      },
      {  
        name: "Corona",
        level: 15,
        description: "At 15th level, you can emit a blinding flash from your stellar corona that affects foes."
      },
      {
        name: "Perfect Attunement",
        level: 19,
        description: "At 19th level, your stellar mode attunement reaches perfection, granting you bonuses and abilities." 
      },
      {
        name: "Unity",
        level: 20,
        description: "At 20th level, your study of all modes is complete, allowing you to combine up to three modes."
      }  ],
      Soldier: [  {
        name: "Bonus Feat",
        level: 1,
        description: "At 1st level, you gain a bonus combat feat."
      },
      {
        name: "Expert Attack",
        level: 2,
        description: "At 2nd level, you gain Expert Attack with one specific weapon, granting you bonuses with that weapon."
      },
      {
        name: "Onslaught",
        level: 4,
        description: "At 4th level, you can make additional attacks after reducing a target's HP to 0."
      },
      {
        name: "Weapon Specialization",
        level: 5,
        description: "At 5th level, you gain Weapon Specialization with one specific weapon, granting you bonuses with that weapon." 
      },
      {
        name: "Armor Mastery",  
        level: 9,
        description: "At 9th level, you gain Damage Reduction while wearing heavy armor."
      },
      {
        name: "Rain of Death",
        level: 13,
        description: "At 13th level, you can attack all enemies within range after reducing a target's HP to 0."
      },
      {
        name: "Greater Weapon Specialization",
        level: 17,
        description: "At 17th level, your Weapon Specialization bonuses increase."
      },
      {
        name: "Master At Arms",
        level: 20,
        description: "At 20th level, you become a master at arms, gaining initiative, attack, and weapon damage bonuses."
      }],
      Technomancer:[  {
        name: "Magic Hack",
        level: 1,
        description: "At 1st level, you can undermine other spellcasters with targeted counterspell attempts called magic hacks."
      },
      {
        name: "Spell Cache",
        level: 1, 
        description: "At 1st level, you gain a spell cache to store spells for later use."
      },  
      {
        name: "Cache Capacitor",
        level: 3,
        description: "At 3rd level, your spell cache capacity increases by 1."
      },
      {
        name: "Magic Hack Mastery",
        level: 5,
        description: "At 5th level, your magic hacks become more powerful and harder to resist."
      },
      {
        name: "Superior Cache",
        level: 7,
        description: "At 7th level, your spell cache capacity increases by 2."
      },
      {
        name: "Cache Capacitor",  
        level: 11,
        description: "At 11th level, your spell cache capacity increases again by 1."
      },
      {
        name: "Superior Cache",
        level: 15,
        description: "At 15th level, your spell cache capacity increases again by 2."
      },
      {
        name: "Instant Cache",
        level: 17,
        description: "At 17th level, you can cast a spell directly from your cache as a swift action."
      },
      {
        name: "Master Technomancer",
        level: 20,
        description: "At 20th level, you become a master technomancer, gaining bonuses and maximizing your spell cache capacity."
      }],
      Vanguard: [  {
        name: "On the Attack",
        level: 1,
        description: "At 1st level, you gain abilities related to attacking foes, like Power Attack and Weapon Specialization."
      },
      {
        name: "Surprise Attack",
        level: 4,
        description: "At 4th level, you gain abilities related to catching foes off guard."
      },
      {
        name: "Unstoppable Onslaught",
        level: 10,
        description: "At 10th level, you become adept at pressing the attack against multiple foes."
      },
      {
        name: "Superior Onslaught",
        level: 16, 
        description: "At 16th level, your onslaught abilities improve greatly."
      },
      {
        name: "Inexorable Onslaught",
        level: 20,
        description: "At 20th level, your onslaught becomes truly inexorable, granting you devastating attack capabilities."
      }],
      Witchwarper: [
        {
            name: "Spellcasting",
            level: 1,
            description: "At 1st level, the Witchwarper gains the ability to cast spells."
          },
          {
            name: "Infinite Worlds",
            level: 1,
            description: "Starting at 1st level, the Witchwarper can pull from alternate realities to temporarily transform a nearby area."
          },
          {
            name: "Paradigm Shift",
            level: 2,
            description: "At 2nd level, and every 2 levels thereafter, the Witchwarper gains a paradigm shift, a unique ability that further manipulates reality."
          },
          {
            name: "Weapon Specialization",
            level: 3,
            description: "At 3rd level, the Witchwarper gains the Weapon Specialization feat as a bonus feat for each weapon type with which this class grants proficiency."
          },
          {
            name: "Alternate Outcome",
            level: 6,
            description: "Starting at 6th level, the Witchwarper can tap into alternate realities to prevent unfortunate events from occurring."
          },
          {
            name: "Resistant Energy",
            level: 9,
            description: "At 9th level, the Witchwarper can use infinite worlds to grant allies resistance to a chosen energy type."
          },
          {
            name: "Reality Leech",
            level: 12,
            description: "At 12th level, when the Witchwarper uses infinite worlds to hamper foes, she can gain temporary Hit Points based on the number of affected enemies."
          },
          {
            name: "Doublecast",
            level: 15,
            description: "Starting at 15th level, the Witchwarper can cast two spells at once, though only one of them can be of the highest spell level she can cast."
          },
          {
            name: "Pervasive Infinite Worlds",
            level: 18,
            description: "At 18th level, the effects of the Witchwarper’s infinite worlds become more difficult to resist."
          },
          {
            name: "True Infinite Worlds",
            level: 20,
            description: "At 20th level, the Witchwarper can use her infinite worlds ability an unlimited number of times per day."
          }
      ],
      Nanocyte: [
        {
          name: "Nanite Integration",
          level: 1,
          description: "At 1st level, the Nanocyte has a colony of nanites in their body which they can use for various tasks."
        },
        {
          name: "Nanite Surge",
          level: 1,
          description: "Starting at 1st level, the Nanocyte can push their nanites to the limit, granting them a temporary surge of energy."
        },
        {
          name: "Nanite Configuration",
          level: 2,
          description: "At 2nd level, and every 2 levels thereafter, the Nanocyte can choose a configuration that determines how they deploy and use their nanites."
        },
        {
          name: "Weapon Specialization",
          level: 3,
          description: "At 3rd level, the Nanocyte gains the Weapon Specialization feat as a bonus feat for each weapon type this class grants proficiency with."
        },
        {
          name: "Nanite Knack",
          level: 4,
          description: "Starting at 4th level, and every 4 levels thereafter, the Nanocyte can choose a special knack that offers new ways to use their nanites."
        },
        {
          name: "Nanite Aegis",
          level: 7,
          description: "At 7th level, the Nanocyte's nanites provide protection, granting them a +1 enhancement bonus to EAC and KAC."
        },
        {
          name: "Greater Nanite Surge",
          level: 9,
          description: "Starting at 9th level, the Nanocyte’s nanite surge becomes more powerful."
        },
        {
          name: "Nanite Expertise",
          level: 12,
          description: "At 12th level, the Nanocyte gains a +4 insight bonus to a skill of their choice."
        },
        {
          name: "Nanite Overdrive",
          level: 15,
          description: "Starting at 15th level, the Nanocyte can overcharge their nanites for a short period, granting them additional abilities."
        },
        {
          name: "Nanite Mastery",
          level: 18,
          description: "At 18th level, the Nanocyte's mastery over their nanites allows them to use two nanite surges without expending any uses."
        },
        {
          name: "Ultimate Nanocyte",
          level: 20,
          description: "At 20th level, the Nanocyte’s bond with their nanites reaches its pinnacle, granting them unparalleled control and power."
        }
      ],
      
      Precog: [
        {
          name: "Spells",
          level: 1,
          description: "Starting at 1st level, the Precog gains the ability to cast spells, drawing upon their innate ability to foresee possible futures."
        },
        {
          name: "Anchor",
          level: 1,
          description: "You have a preternatural affinity for an aspect of time itself that grants you power. Your anchor grounds your ability to interact with time and provides the foundation of all your powers."
        },
        {
          name: "Focal Paradox",
          level: 1,
          description: "Your anchor provides you a particular aptitude when using your paradox ability."
        },
        {
          name: "Paradox",
          level: 1,
          description: "Your unique relationship with time allows you to dexterously manipulate its flow at key moments, allowing you to know what’s going to happen before it transpires."
        },
        {
          name: "Temporal Anomaly",
          level: 2,
          description: "Temporal anomalies represent your ability to channel your unique relationship with time into tangible actions."
        },
        {
          name: "Chronomatic Defense",
          level: 3,
          description: "You can execute precisely timed moves that help you and others dodge incoming attacks."
        },
        {
          name: "Weapon Specialization",
          level: 3,
          description: "You gain the Weapon Specialization feat as a bonus feat for each weapon type with which this class grants you proficiency."
        },
        {
          name: "Temporal Aggression",
          level: 4,
          description: "You can view possible timelines and choose the precise moment that will inflict the most grievous injury upon your foes."
        },
        {
          name: "Improved Anchor",
          level: 9,
          description: "You gain increased competence channeling your anchor into a powerful effect."
        },
        {
          name: "Paradoxical Acceleration",
          level: 10,
          description: "You learn how to burn your personal reserves of energy to fuel a greater view of the timeline."
        },
        {
          name: "Chronomatic Flow",
          level: 12,
          description: "Through your knowledge of time’s flow, you can cast your spells with the exact timing necessary for maximum effect."
        },
        {
          name: "Greater Anchor",
          level: 15,
          description: "Your mastery of your anchor provides you an exceptional ability."
        },
        {
          name: "Timeless Paragon",
          level: 20,
          description: "You exist in perfect synchrony with your timeline, gaining an impressive degree of control over your existence. You no longer age, nor do you die of old age."
        }
      ],
      
      Evolutionist: [
        {
          name: "Adaptive Strike",
          level: 1,
          description: "You can transform one or more parts of your body into a deadly weapon. This adaptive strike can take various forms such as claws, teeth, or even fiery wings."
        },
        {
          name: "Evolution Track",
          level: 1,
          description: "Your body houses latent transformative potential that roils to life in stressful situations. This potential is represented by a pool of Mutation Points (MP)."
        },
        {
          name: "Flexible Skill",
          level: 1,
          description: "As part of your ongoing personal metamorphosis, your skill repertoire is always evolving."
        },
        {
          name: "Niche",
          level: 1,
          description: "Each evolutionist selects a specific niche of personal transformation into some new kind of being."
        },
        {
          name: "Augmented Form",
          level: 2,
          description: "Your body eagerly accepts new augmentations, even creating some of the components out of your own flesh."
        },
        {
          name: "Evolutionist Adaptation",
          level: 2,
          description: "As you gain experience you master new ways to adjust your body and abilities on the fly."
        },
        {
          name: "Fulcrum",
          level: 2,
          description: "You create a unique talisman, memento, or accessory called a fulcrum, which helps you channel supernatural energies into your strikes."
        },
        {
          name: "Skill Boost",
          level: 3,
          description: "Your personal transformation gradually enhances your prowess with certain skills."
        },
        {
          name: "Weapon Specialization",
          level: 3,
          description: "You gain Weapon Specialization as a bonus feat for each weapon type for which this class grants you proficiency."
        },
        {
          name: "Evolution Drain",
          level: 5,
          description: "You can leech genetic material and raw evolutionary potential from others."
        },
        {
          name: "Evolutionary Focus",
          level: 7,
          description: "Having managed extraordinary achievements within your niche of transformation, you can afford to specialize into a secondary focus that further refines your powers."
        },
        {
          name: "Accelerated Evolution",
          level: 11,
          description: "When you gain MP at the start of your turn, you can gain 2 MP instead."
        },
        {
          name: "Evolution Drinker",
          level: 14,
          description: "When you hit a creature with your evolution drain special melee attack and the target fails its Fortitude save, you can choose to gain 1d3+1 Mutation Points instead of 1d3 MP."
        }
      ]
      

};

export default classFeatures;
