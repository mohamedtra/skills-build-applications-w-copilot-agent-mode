import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    console.log('Seed the octofit_db database with test data');
    await mongoose.connect(connectionString, { dbName: 'octofit_db' });

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      Leaderboard.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      { name: 'Summit Striders', members: [] },
      { name: 'Velocity Crew', members: [] },
      { name: 'Core Circuit', members: [] },
    ]);

    const users = await User.insertMany([
      { username: 'maya', email: 'maya@octofit.com', name: 'Maya Chen', team: teams[0]._id, points: 1280 },
      { username: 'leo', email: 'leo@octofit.com', name: 'Leo Martinez', team: teams[0]._id, points: 1125 },
      { username: 'nina', email: 'nina@octofit.com', name: 'Nina Patel', team: teams[1]._id, points: 1345 },
      { username: 'omar', email: 'omar@octofit.com', name: 'Omar Hassan', team: teams[1]._id, points: 980 },
      { username: 'zoe', email: 'zoe@octofit.com', name: 'Zoe Kim', team: teams[2]._id, points: 1190 },
    ]);

    await Promise.all(
      teams.map(async (team) => {
        const teamMembers = users
          .filter((user) => user.team?.toString() === team._id.toString())
          .map((user) => user._id);

        await Team.findByIdAndUpdate(team._id, { members: teamMembers }, { returnDocument: 'after' });
      }),
    );

    const workouts = await Workout.insertMany([
      {
        name: 'Trail Tempo Run',
        description: 'A steady 30-minute trail run focused on pacing and recovery.',
        difficulty: 'Intermediate',
        duration: 30,
      },
      {
        name: 'Power Circuit',
        description: 'High-intensity strength intervals with squats, presses, and lunges.',
        difficulty: 'Advanced',
        duration: 40,
      },
      {
        name: 'Mobility Reset',
        description: 'A guided mobility and flexibility session for recovery and posture.',
        difficulty: 'Beginner',
        duration: 25,
      },
      {
        name: 'Cycling Sprint Ladder',
        description: 'Alternating sprint and recovery intervals to improve cycling power.',
        difficulty: 'Advanced',
        duration: 35,
      },
    ]);

    const activities = await Activity.insertMany([
      { user: users[0]._id, type: 'run', duration: 31, points: 110, completedAt: new Date('2026-08-22T06:30:00Z') },
      { user: users[1]._id, type: 'strength', duration: 42, points: 140, completedAt: new Date('2026-08-23T18:00:00Z') },
      { user: users[2]._id, type: 'cycling', duration: 36, points: 155, completedAt: new Date('2026-08-24T07:15:00Z') },
      { user: users[3]._id, type: 'swim', duration: 28, points: 100, completedAt: new Date('2026-08-24T19:30:00Z') },
      { user: users[4]._id, type: 'mobility', duration: 24, points: 90, completedAt: new Date('2026-08-25T08:00:00Z') },
      { user: users[0]._id, type: 'cycling', duration: 33, points: 120, completedAt: new Date('2026-08-26T17:45:00Z') },
      { user: users[2]._id, type: 'run', duration: 29, points: 118, completedAt: new Date('2026-08-27T06:10:00Z') },
    ]);

    const leaderboardEntries = await Leaderboard.insertMany([
      { user: users[2]._id, points: 1345 },
      { user: users[0]._id, points: 1280 },
      { user: users[4]._id, points: 1190 },
      { user: users[1]._id, points: 1125 },
      { user: users[3]._id, points: 980 },
    ]);

    console.log(JSON.stringify({
      teams: teams.length,
      users: users.length,
      workouts: workouts.length,
      activities: activities.length,
      leaderboard: leaderboardEntries.length,
      status: 'seeded',
    }, null, 2));

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
