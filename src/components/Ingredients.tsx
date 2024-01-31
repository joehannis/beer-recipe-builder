interface BeerSelectionProps {
  recipe: {
    ingredients: { ingredient: string; amount: string }[];
    instructions: string[];
  };
  image: string;
}

const BeerSelection: React.FC<BeerSelectionProps> = ({ recipe, image }) => {
  return (
    <>
      <div className='flex max-h-fit max-w-80 flex-col flex-wrap content-center items-center justify-center'>
        <h3 className='font-bold'>Ingredients</h3>
        {recipe.ingredients &&
          recipe.ingredients.map((ingredient, index) => (
            <div key={index} className='text-sm'>
              <span>{ingredient.ingredient}</span>:{' '}
              <span>{ingredient.amount}</span>
            </div>
          ))}
      </div>
      <div className='mt-5 w-36'>
        <img src={image} alt='' />
      </div>
    </>
  );
};

export default BeerSelection;
