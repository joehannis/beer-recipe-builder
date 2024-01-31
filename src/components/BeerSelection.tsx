import React from 'react';
import Selector from './Selector';
import fetchRecipe from './fetchRecipe';

interface BeerSelectionProps {
  beerListUpdate: {
    name: string;
    malt: string;
    body: string;
    balance: string;
  }[];
  beerSelection: string;
  setBeerSelection: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setRecipe: React.Dispatch<
    React.SetStateAction<{
      ingredients: { ingredient: string; amount: string }[];
      instructions: string[];
    }>
  >;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

const BeerSelection: React.FC<BeerSelectionProps> = ({
  beerListUpdate,
  beerSelection,
  setBeerSelection,
  setLoading,
  setRecipe,
  setImage,
}) => {
  const unselectedBeer: string =
    'flex p-8 justify-center rounded-none border-2 border-solid border-black bg-white hover:bg-red-600 hover:text-white';
  const selectedBeer: string =
    'flex p-8 justify-center rounded-none border-2 border-solid border-black bg-red-600 hover:bg-white hover:text-red-600';
  const recipeHandler = (beer: string) => () => {
    setLoading(true);
    fetchRecipe(beer).then((data) => {
      setRecipe(data.recipe);
      setImage(data.image);
      setLoading(false);
    });
  };
  return (
    <div className='mx-96 mt-10'>
      <div className='mx-36 flex grow flex-row flex-wrap content-center items-center justify-center gap-1.5'>
        {beerListUpdate.map((beer) => (
          <div
            key={(beer as { name: string }).name}
            onClick={recipeHandler(beer.name)}
            className={
              beer.name === beerSelection ? selectedBeer : unselectedBeer
            }
          >
            <Selector beer={beer} setBeerSelection={setBeerSelection} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeerSelection;
