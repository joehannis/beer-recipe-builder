import { Request, Response } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const recipeController = {
  async getRecipe(req: Request, res: Response) {
    const beer = req.query.beer;
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-1106',
      messages: [
        {
          role: 'system',
          content: `Create a new beer object for ${beer} beer.`,
        },
      ],
      functions: [
        {
          name: 'createBeerObject',
          parameters: {
            type: 'object',
            properties: {
              ingredients: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    ingredient: { type: 'string' },
                    amount: { type: 'string' },
                  },
                },
                description:
                  'The ingredients to use in the recipe with the amount in grams. Include the amount of water to use in the mash and sparge in L. Specify the yeast strain',
              },
              instructions: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description:
                  'The instructions to use in the recipe with temperatures in C and F. Include the weight of ingredients needed at each step. Be detailed.',
              },
            },
            required: ['ingredients', 'instructions'],
          },
        },
      ],
      function_call: { name: 'createBeerObject' },
    });

    const image = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `a ${beer} beer`,
      n: 1,
      size: '1024x1024',
    });

    return res.json({
      recipe: response.choices[0].message.function_call?.arguments,
      image: image.data[0].url,
    });
  },
};

export default recipeController;
