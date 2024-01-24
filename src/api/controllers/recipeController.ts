import { Request, Response } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const recipeController = {
  async getRecipe(req: Request, res: Response) {
    const beer = req.query.beer;
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Give me a step by step recipe in grams to create a 20L batch of ${beer} beer. Don't add anything to the response, just the recipe with ingredients, amount and instructions.`,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    const image = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `a ${beer} beer`,
      n: 1,
      size: '1024x1024',
    });
    console.log('this is image');
    console.log(image);

    const data = response.choices[0].message.content;
    console.log(data);
    return res.json({ recipe: data, image: image.data[0].url });
  },
};

export default recipeController;
