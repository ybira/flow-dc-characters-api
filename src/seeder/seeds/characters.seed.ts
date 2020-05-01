import { CreateCharacterDto } from '@api/characters/models/create-character.dto';
import { Alignment } from '@api/database/entities/character.entity';

export const characters: CreateCharacterDto[] = [
  {
    name: 'Superman',
    affiliation: 'Justice League',
    alignment: Alignment.GOOD,
    address: {
      planet: 'Earth',
      city: 'Metropolis',
    },
    skills:
      'Vast superhuman strength/hearing/durability/longevity,' + 'Superhuman vision,' + 'Invulnerability,' + 'Flight',
  },
  {
    name: 'Raven',
    affiliation: 'Teen Titans',
    alignment: Alignment.GOOD,
    address: {
      planet: 'Earth',
      city: 'Titan Tower',
    },
    skills: 'Hallucination manipulation,' + 'Telepathy,' + 'Teleportation,' + 'Chronokinesis',
  },
  {
    name: 'Lex Luthor',
    affiliation: 'Injustice League',
    alignment: Alignment.BAD,
    address: {
      planet: 'Earth',
      city: 'Metropolis',
    },
    skills:
      'Genius-level intellect,' + 'Expert engineer with exceptional technological prowess,' + 'High-tech warsuit',
  },
  {
    name: 'Black Manta',
    affiliation: 'Injustice League',
    alignment: Alignment.BAD,
    address: {
      planet: 'Earth',
      city: 'Atlantis',
    },
    skills:
      'Expert engineer and tactician,' +
      'High-tech battle suit,' +
      'Skilled hand-to-hand combatant and swordsman,' +
      'Scientifically-enhanced stamina and endurance',
  },
  {
    name: 'Wonder Woman',
    affiliation: 'Justice League',
    alignment: Alignment.GOOD,
    address: {
      planet: 'Earth',
      city: 'Themyscira',
    },
    skills:
      'Superhuman strength/hearing/durability/longevity,' +
      'Accelerated healing factor,' +
      'Flight,' +
      'Lasso of Truth',
  },
  {
    name: 'Sinestro',
    affiliation: 'Sinestro Corps',
    alignment: Alignment.BAD,
    address: {
      planet: 'Unknown',
      city: 'Unknown',
    },
    skills:
      'Power ring,' +
      'Host of Parallax,' +
      'Expert hand-to-hand combatant,' +
      'Psychological Intuition',
  },
];
