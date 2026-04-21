
const { db } = require('../db');
const { badges } = require('../db/schema');

const PREDEFINED_BADGES = [
  {
    id: 'ROOKIE_START',
    name: 'First Signal',
    description: 'Welcome to the Fame Network. You are officially on the grid.',
    icon: '📡',
    category: 'SPECIAL',
  },
  {
    id: 'STREAK_7',
    name: 'Week One',
    description: 'Maintained a 7-day consistency streak.',
    icon: '🔥',
    category: 'STREAKS',
  },
  {
    id: 'STREAK_30',
    name: 'Monthly Legend',
    description: '30 days of consecutive engagement.',
    icon: '🏆',
    category: 'STREAKS',
  },
  {
    id: 'SQUAD_LEADER',
    name: 'Squad Commander',
    description: 'Recruited 3 new athletes to the network.',
    icon: '🎖️',
    category: 'SQUAD',
  },
  {
    id: 'SHOPPER',
    name: 'Gear Head',
    description: 'Verified your first piece of Grassland gear.',
    icon: '👟',
    category: 'SHOPPING',
  },
  {
    id: 'HOF',
    name: 'Hall of Fame',
    description: 'Reached the ultimate status in the Grassland Ecosystem.',
    icon: '👑',
    category: 'SPECIAL',
  },
];

async function seed() {
  console.log('Seeding badges...');
  for (const badge of PREDEFINED_BADGES) {
    try {
        // Using raw SQL if needed or just db.insert
        await db.insert(badges).values(badge).onConflictDoUpdate({
            target: badges.id,
            set: badge,
        });
        console.log(`Seeded: ${badge.name}`);
    } catch (err) {
        console.error(`Error seeding ${badge.id}:`, err.message);
    }
  }
  console.log('Seeding completed.');
  process.exit(0);
}

seed();
