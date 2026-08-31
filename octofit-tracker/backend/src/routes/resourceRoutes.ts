import { Router, Request, Response } from 'express';
import { Model } from 'mongoose';

export function resourceRoutes(model: Model<unknown>): Router {
  const router = Router();

  router.get('/', async (_request: Request, response: Response) => {
    try {
      response.json(await model.find().sort({ createdAt: -1 }));
    } catch (error) {
      response.status(503).json({ error: 'Database unavailable', details: String(error) });
    }
  });

  router.post('/', async (request: Request, response: Response) => {
    try {
      const resource = await model.create(request.body);
      response.status(201).json(resource);
    } catch (error) {
      response.status(400).json({ error: 'Invalid resource', details: String(error) });
    }
  });

  return router;
}