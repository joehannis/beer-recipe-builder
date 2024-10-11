import express from 'express';
const router = express.Router();
import recipeController from '../controllers/recipeController';

router.get('/', recipeController.getRecipe);

export default router;
