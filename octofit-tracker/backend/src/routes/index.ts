import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';
import { resourceRoutes } from './resourceRoutes.js';

const router = Router();

router.use('/users', resourceRoutes(User));
router.use('/teams', resourceRoutes(Team));
router.use('/activities', resourceRoutes(Activity));
router.use('/workouts', resourceRoutes(Workout));

router.get('/leaderboard', async (_request, response) => {
  try {
    const leaderboard = await Leaderboard.find({}, { points: 1, user: 1, _id: 0 })
      .populate('user', { username: 1, name: 1, _id: 0 })
      .sort({ points: -1 });
    response.json(leaderboard);
  } catch (error) {
    response.status(503).json({ error: 'Database unavailable', details: String(error) });
  }
});

export default router;