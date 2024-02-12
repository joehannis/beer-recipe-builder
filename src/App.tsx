import { useState } from 'react';
import BeerSelection from './components/BeerSelection';
import beerList from './components/beerList';
import BeerLoader from './components/beer-loader/BeerLoader';
import OptionsMenu from './components/OptionsMenu';
import Ingredients from './components/Ingredients';
import Instructions from './components/Instructions';

function App() {
  interface Beer {
    name: string;
    malt: string;
    body: string;
    balance: string;
  }

  const [beerListUpdate, setBeerListUpdate] = useState<Beer[]>(beerList);
  const [loading, setLoading] = useState(false);
  const [malt, setMalt] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [beerSelection, setBeerSelection] = useState<string>('');
  const [recipe, setRecipe] = useState<{
    ingredients: { ingredient: string; amount: string }[];
    instructions: string[];
  }>({ ingredients: [], instructions: [] });
  const [image, setImage] = useState<string>('');

  return (
    // Main App Container
    <>
      <div className='flex max-h-fit max-w-full flex-col items-center justify-center'>
        {/* Header */}
        <h1 className='absolute inset-x-0 top-5 mb-6 flex items-center justify-center text-xl font-bold'>
          Beer Recipe Creator
        </h1>

        {/* Body */}
        {loading && (
          <div className='mt-36'>
            <BeerLoader />
          </div>
        )}

        {/* Render beer list */}
        {!loading && recipe.ingredients.length === 0 && (
          <>
            <OptionsMenu
              setBeerListUpdate={setBeerListUpdate}
              malt={malt}
              setMalt={setMalt}
              balance={balance}
              setBalance={setBalance}
              body={body}
              setBody={setBody}
            />
            <BeerSelection
              beerListUpdate={beerListUpdate}
              beerSelection={beerSelection}
              setBeerSelection={setBeerSelection}
              setLoading={setLoading}
              setRecipe={setRecipe}
              setImage={setImage}
            />
          </>
        )}
        {/* Recipe */}
        <div className='flex max-h-80 grow flex-col'>
          {recipe && recipe.ingredients.length > 0 && (
            <>
              <div className='mt-12 flex max-h-fit max-w-80 flex-col flex-wrap'>
                <h3 className='flex content-center items-center justify-center text-xl font-bold text-red-600'>
                  {beerSelection}
                </h3>
              </div>
              <div className='flex max-h-fit max-w-80 flex-col flex-wrap content-center items-center justify-center'>
                <Ingredients recipe={recipe} image={image} />
              </div>

              <div className='mt-5 flex max-h-fit max-w-80 flex-col flex-wrap'>
                <Instructions recipe={recipe} />
              </div>
            </>
          )}

          {recipe && recipe.ingredients.length > 0 && (
            <div className='my-5 flex items-center justify-center'>
              <button
                className={
                  'mb-5 flex justify-center rounded-none border-2 border-solid border-black bg-white px-36 hover:bg-red-600 hover:text-white'
                }
                onClick={() => {
                  setRecipe({ ingredients: [], instructions: [] });
                  setImage('');
                  setBeerSelection('');
                  setMalt('');
                  setBody('');
                  setBalance('');
                  setBeerListUpdate(beerList);
                }}
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
