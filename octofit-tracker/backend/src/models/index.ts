import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  points: { type: Number, default: 0 },
}, { timestamps: true });

const teamSchema = new Schema({
  name: { type: String, required: true, trim: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const activitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, trim: true },
  duration: { type: Number, required: true, min: 0 },
  points: { type: Number, required: true, min: 0 },
  completedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const workoutSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true, trim: true },
  duration: { type: Number, required: true, min: 0 },
}, { timestamps: true });

const leaderboardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  points: { type: Number, required: true, min: 0, default: 0 },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);