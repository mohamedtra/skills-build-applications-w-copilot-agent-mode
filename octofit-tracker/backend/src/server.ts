import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import db, { connectDatabase } from './config/database.js';
import apiRoutes from './routes/index.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: db.readyState === 1 ? 'connected' : 'disconnected', apiBaseUrl });
});

app.get('/api/config', (_request, response) => {
  response.json({ apiBaseUrl });
});

app.use('/api', apiRoutes);

app.use((_request, response) => {
  response.status(404).json({ error: 'Not found' });
});

app.listen(port, () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
  connectDatabase().catch((error) => {
    console.error('MongoDB unavailable:', error instanceof Error ? error.message : error);
  });
});

export default app;