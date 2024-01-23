import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

import Selector from './components/Selector';
import beerList from './components/beerList';

function App() {
  interface Beer {
    name: string;
    malt: string;
    body: string;
    balance: string;
  }
  const [beerListUpdate, setBeerListUpdate] = useState<Beer[]>(beerList);
  console.log(beerListUpdate);
  const [malt, setMalt] = useState<string>('');
  console.log(malt);
  const [body, setBody] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const unselected: string =
    'flex justify-center rounded-none border-2 border-solid border-black bg-white hover:bg-red-600 hover:text-white';
  const selected: string =
    'flex justify-center rounded-none border-2 border-solid border-black bg-red-600 hover:bg-white hover:text-red-600';

  let transformDark = useRef(unselected).current;
  let transformLight = useRef(unselected).current;
  let transformFullBodied = useRef(unselected).current;
  let transformLightBodied = useRef(unselected).current;
  let transformMaltForward = useRef(unselected).current;
  let transformHopForward = useRef(unselected).current;
  let transformYeastForward = useRef(unselected).current;

  const maltHandler = (maltInput: string) => () => {
    setMalt(maltInput);
  };

  const bodyHandler = (bodyInput: string) => () => {
    setBody(bodyInput);
  };

  const balanceHandler = (balanceInput: string) => () => {
    setBalance(balanceInput);
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

  if (malt === 'Dark') {
    transformDark = selected;
    transformLight = unselected;
  } else if (malt === 'Light') {
    transformLight = selected;
    transformDark = unselected;
  }

  if (body === 'Full-Bodied') {
    transformFullBodied = selected;
    transformLightBodied = unselected;
  } else if (body === 'Light-Bodied') {
    transformLightBodied = selected;
    transformFullBodied = unselected;
  }

  if (balance === 'Malt Forward') {
    transformMaltForward = selected;
    transformHopForward = unselected;
    transformYeastForward = unselected;
  } else if (balance === 'Hop Forward') {
    transformHopForward = selected;
    transformMaltForward = unselected;
    transformYeastForward = unselected;
  } else if (balance === 'Yeast Forward') {
    transformYeastForward = selected;
    transformMaltForward = unselected;
    transformHopForward = unselected;
  }

  return (
    // Main App Container
    <div className='size-full flex-col '>
      {/* Header */}
      <h1 className='flex h-20 flex-row items-center justify-center text-3xl font-bold text-red-600 underline'>
        Beer Recipe Creator
      </h1>
      {/* Body */}
      <div>
        <div className='flex flex-row items-center justify-start'>
          {/* Malt character 1 */}
          <div className='flex flex-col'>
            <div className={transformDark} onClick={maltHandler('Dark')}>
              <Selector name='Dark' />
            </div>
            <div>
              <div
                className={
                  transformMaltForward === selected ? selected : unselected
                }
                onClick={balanceHandler('Malt Forward')}
              >
                <Selector name='Malt Forward' />
              </div>
            </div>
            <div
              className={transformFullBodied}
              onClick={bodyHandler('Full-Bodied')}
            >
              <Selector name='Full-Bodied' />
            </div>
          </div>
          {/* Malt character 2 */}
          <div className='flex flex-col'>
            <div className={transformLight} onClick={maltHandler('Light')}>
              <Selector name='Light' />
            </div>
            <div>
              <div
                className={transformHopForward}
                onClick={balanceHandler('Hop Forward')}
              >
                <Selector name='Hop Forward' />
              </div>
            </div>
            <div
              className={transformLightBodied}
              onClick={bodyHandler('Light-Bodied')}
            >
              <Selector name='Light-Bodied' />
            </div>
          </div>
          <div className='flex flex-col'>
            <div></div>
            <div>
              <div
                className={transformYeastForward}
                onClick={balanceHandler('Yeast Forward')}
              >
                <Selector name='Yeast Forward' />
              </div>
            </div>
          </div>

          <div className='flex flex-row items-center'>
            {/* Possible Styles */}
            <div className='flex flex-col'>
              {beerListUpdate.map((beer) => (
                <div key={(beer as { name: string }).name}>
                  <Selector beer={beer} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
