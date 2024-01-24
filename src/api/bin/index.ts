import express, { Express } from 'express';
import cors from 'cors';
import 'dotenv/config';
import recipeRoute from '../routes/recipeRoute';

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.get('/', recipeRoute);

app.listen(port, () => {
  console.log(`Server is at http://localhost:${port}`);
});
