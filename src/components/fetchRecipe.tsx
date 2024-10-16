// fetchRecipe.tsx
const fetchRecipe = async (beer: string) => {
  try {
    const response = await fetch(
      `https://profound-upliftment-production.up.railway.app/?beer=${beer}`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch recipe');
    }
    const parsedRecipe = JSON.parse(data.recipe);
    return {
      recipe: parsedRecipe,
      image: data.image,
    };
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
};

export default fetchRecipe;
