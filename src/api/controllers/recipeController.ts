import { Request, Response } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI();

const recipeController = {
  async getRecipe(req: Request, res: Response) {
    const beer = req.query.beer;
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Give me a step by step recipe in grams to create a ${beer}`,
        },
      ],
      model: 'gpt-3.5-turbo',
    });
    console.log(response);
    res.json(response);
  },
};

export default recipeController;
