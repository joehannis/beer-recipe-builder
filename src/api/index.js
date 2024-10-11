/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import recipeRoute from './routes/recipeRoute.js';

const app = express();
const port = 3000;
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:4173',
      'https://beer-recipe-builder-production.up.railway.app/',
    ],
    methods: ['POST', 'GET'],
    credentials: true,
  })
);

app.get('/', recipeRoute);

app.listen(port, () => {
  console.log(`Server is at http://localhost:${port}`);
});
