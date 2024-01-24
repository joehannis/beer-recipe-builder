const fetchRecipe = async (beer: string) => {
  const response = await fetch(`http://localhost:3000?beer=${beer}`);
  console.log('API Response:', response);
  const data = await response.json();
  return data;
};

export default fetchRecipe;
