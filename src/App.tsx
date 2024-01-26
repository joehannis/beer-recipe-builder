import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

import Selector from './components/Selector';
import beerList from './components/beerList';
import fetchRecipe from './components/fetchRecipe';
import BeerLoader from './components/beer-loader/BeerLoader';

function App() {
  interface Beer {
    name: string;
    malt: string;
    body: string;
    balance: string;
  }

  const [beerListUpdate, setBeerListUpdate] = useState<Beer[]>(beerList);
  const [loading, setLoading] = useState(false);
  console.log(loading);
  const [malt, setMalt] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [beerSelection, setBeerSelection] = useState<string>('');
  const [recipe, setRecipe] = useState<{
    ingredients: { ingredient: string; amount: string }[];
    instructions: string[];
  }>({ ingredients: [], instructions: [] });
  const [image, setImage] = useState<string>('');

  const unselected: string =
    'flex justify-center rounded-none border-2 border-solid border-black bg-white hover:bg-red-600 hover:text-white';
  const selected: string =
    'flex justify-center rounded-none border-2 border-solid border-black bg-red-600 hover:bg-white hover:text-red-600';

  let [
    transformDark,
    transformLight,
    transformFullBodied,
    transformLightBodied,
    transformMaltForward,
    transformHopForward,
    transformYeastForward,
  ] = useRef([
    unselected,
    unselected,
    unselected,
    unselected,
    unselected,
    unselected,
    unselected,
  ]).current;

  const maltHandler = (maltInput: string) => () => {
    setMalt(maltInput);
  };

  const bodyHandler = (bodyInput: string) => () => {
    setBody(bodyInput);
  };

  const balanceHandler = (balanceInput: string) => () => {
    setBalance(balanceInput);
  };

  const recipeHandler = (beer: string) => () => {
    setLoading(true);
    fetchRecipe(beer).then((data) => {
      setRecipe(data.recipe);
      setImage(data.image);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (malt === 'Dark') {
      const updatedBeerList: Beer[] = beerList.filter((beer) => {
        if (balance !== '' && body !== '') {
          if (beer.balance === balance && beer.body === body) {
            return beer.malt === 'Dark';
          }
        } else if (balance !== '') {
          if (beer.balance === balance) {
            return beer.malt === 'Dark';
          }
        } else if (body !== '') {
          if (beer.body === body) {
            return beer.malt === 'Dark';
          }
        } else {
          return beer.malt === 'Dark';
        }
      });
      setBeerListUpdate(updatedBeerList);
    } else if (malt === 'Light') {
      const updatedBeerList: Beer[] = beerList.filter((beer) => {
        if (balance !== '' && body !== '') {
          if (beer.balance === balance && beer.body === body) {
            return beer.malt === 'Light';
          }
        } else if (balance !== '') {
          if (beer.balance === balance) {
            return beer.malt === 'Light';
          }
        } else if (body !== '') {
          if (beer.body === body) {
            return beer.malt === 'Light';
          }
        } else {
          return beer.malt === 'Light';
        }
      });
      setBeerListUpdate(updatedBeerList);
    }
  }, [malt, balance, body]);

  switch (malt) {
    case 'Dark':
      transformDark = selected;
      transformLight = unselected;
      break;
    case 'Light':
      transformLight = selected;
      transformDark = unselected;
      break;
  }

  switch (body) {
    case 'Full-Bodied':
      transformFullBodied = selected;
      transformLightBodied = unselected;
      break;
    case 'Light-Bodied':
      transformLightBodied = selected;
      transformFullBodied = unselected;
      break;
  }

  switch (balance) {
    case 'Malt Forward':
      transformMaltForward = selected;
      transformHopForward = unselected;
      transformYeastForward = unselected;
      break;
    case 'Hop Forward':
      transformHopForward = selected;
      transformMaltForward = unselected;
      transformYeastForward = unselected;
      break;
    case 'Yeast Forward':
      transformYeastForward = selected;
      transformMaltForward = unselected;
      transformHopForward = unselected;
      break;
  }

  return (
    // Main App Container
    <div className='mb-10 size-full flex-col'>
      {/* Header */}
      <div>
        <h1 className='flex h-20 flex-row items-center justify-center text-3xl font-bold text-red-600 underline'>
          Beer Recipe Creator
        </h1>
      </div>

      {/* Body */}
      <div className='flex flex-col'>
        {loading && (
          <div>
            <BeerLoader />
          </div>
        )}
        {!loading && recipe.ingredients.length === 0 && (
          <div className='mb-16 grid grid-cols-6 grid-rows-3'>
            <div className='col-span-3 col-start-1 row-start-1'>
              <div className={transformDark} onClick={maltHandler('Dark')}>
                <Selector name='Dark' />
              </div>
            </div>
            <div className='col-span-2 col-start-1 row-start-2'>
              <div
                className={
                  transformMaltForward === selected ? selected : unselected
                }
                onClick={balanceHandler('Malt Forward')}
              >
                <Selector name='Malt Forward' />
              </div>
            </div>
            <div className='col-span-3 col-start-1 row-start-3'>
              <div
                className={transformFullBodied}
                onClick={bodyHandler('Full-Bodied')}
              >
                <Selector name='Full-Bodied' />
              </div>
            </div>
            <div className='col-span-3 col-start-4 row-start-1'>
              <div className={transformLight} onClick={maltHandler('Light')}>
                <Selector name='Light' />
              </div>
            </div>
            <div className='col-span-2 col-start-3 row-start-2'>
              <div
                className={transformHopForward}
                onClick={balanceHandler('Hop Forward')}
              >
                <Selector name='Hop Forward' />
              </div>
            </div>
            <div className='col-span-3 col-start-4 row-start-3'>
              <div
                className={transformLightBodied}
                onClick={bodyHandler('Light-Bodied')}
              >
                <Selector name='Light-Bodied' />
              </div>
            </div>

            <div className='col-span-2 col-start-5 row-start-2'>
              <div
                className={transformYeastForward}
                onClick={balanceHandler('Yeast Forward')}
              >
                <Selector name='Yeast Forward' />
              </div>
            </div>
          </div>
        )}

        {/* Render beer list */}
        {!loading && recipe.ingredients.length === 0 && malt !== '' && (
          <div className='flex flex-col'>
            {beerListUpdate.map((beer) => (
              <div
                key={(beer as { name: string }).name}
                onClick={recipeHandler(beer.name)}
                className={beer.name === beerSelection ? selected : unselected}
              >
                <Selector beer={beer} setBeerSelection={setBeerSelection} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recipe */}
      {recipe && recipe.ingredients.length > 0 && (
        <div className='flex flex-col'>
          <h3>Ingredients</h3>
          {recipe.instructions &&
            recipe.instructions.map((instruction, index) => (
              <div key={index}>{instruction}</div>
            ))}
          <h3>Instructions</h3>
          {recipe &&
            recipe.instructions &&
            recipe.instructions.map((instruction, index) => (
              <div key={index}>{instruction}</div>
            ))}
        </div>
      )}

      {/* Image */}
      {recipe && recipe.ingredients.length > 0 && (
        <div className='flex flex-row'>
          <div>
            <img src={image} alt='' />
          </div>
          <button
            className={unselected}
            onClick={() => setRecipe({ ingredients: [], instructions: [] })}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
