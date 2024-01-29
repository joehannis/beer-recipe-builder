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
    <>
      <div className='flex max-h-fit max-w-full flex-col items-center justify-center'>
        {/* Header */}
        <h1 className='absolute inset-x-0 top-5 mb-6 flex items-center justify-center'>
          Beer Recipe Creator
        </h1>

        {/* Body */}
        {loading && (
          <div>
            <BeerLoader />
          </div>
        )}
        {!loading && recipe.ingredients.length === 0 && (
          <div className='mt-20 grid grid-cols-6 grid-rows-3 gap-1'>
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
          <div className='mt-10 flex flex-row flex-wrap content-center items-center justify-center gap-1.5'>
            {beerListUpdate.map((beer) => (
              <div
                key={(beer as { name: string }).name}
                onClick={recipeHandler(beer.name)}
                className={
                  beer.name === beerSelection
                    ? `${selected + 'p-0.5'}`
                    : `${unselected + 'p-0.5'}`
                }
              >
                <Selector beer={beer} setBeerSelection={setBeerSelection} />
              </div>
            ))}
          </div>
        )}

        {/* Recipe */}
        {recipe && recipe.ingredients.length > 0 && (
          <>
            <div className='mt-16 flex max-h-fit max-w-80 flex-col flex-wrap'>
              <h3 className='flex content-center items-center justify-center font-bold'>
                {beerSelection}
              </h3>
            </div>
            <div className='mt-5 flex max-h-fit max-w-80 flex-col flex-wrap content-center items-center justify-center'>
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

            <div className='mt-5 flex max-h-fit max-w-80 flex-col flex-wrap'>
              <h3 className='flex content-center items-center justify-center font-bold'>
                Instructions
              </h3>
              {recipe &&
                recipe.instructions &&
                recipe.instructions.map((instruction, index) => (
                  <div key={index} className='flex-col text-sm'>
                    {`${instruction} \n`}
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
      {recipe && recipe.ingredients.length > 0 && (
        <div className='mt-5 flex items-center justify-center'>
          <button
            className={unselected + ' px-36'}
            onClick={() => {
              setRecipe({ ingredients: [], instructions: [] });
              setImage('');
              setBeerSelection('');
              setMalt('');
              setBody('');
              setBalance('');
            }}
          >
            Clear
          </button>
        </div>
      )}
    </>
  );
}

export default App;
