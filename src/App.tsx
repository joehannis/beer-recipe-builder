import { useState } from 'react';
import { useEffect } from 'react';

import Selector from './components/Selector';
import beerListLight from './components/beerListLight';
import beerListDark from './components/beerListDark';
import beerListMalt from './components/beerListMalt';
import beerListYeast from './components/beerListYeast';
import beerListHoppy from './components/beerListHoppy';

function App() {
  const [beerList, setBeerList] = useState<string[]>([]);
  const [malt, setMalt] = useState<string>('');
  const [body, setBody] = useState<string>('');
  console.log(malt);

  const beerListHandler = (beerListArray: string[]) => () => {
    if (beerListArray === beerList) {
      setBeerList([]);
    } else {
      setBeerList(beerListArray);
    }
  };

  const maltHandler = (maltInput: string) => () => {
    if (maltInput === malt) {
      setMalt('');
    } else {
      setMalt(maltInput);
    }
  };

  useEffect(() => {
    if (malt === 'Malt Forward') {
      const updatedBeerList = beerList.filter((beer) => {
        return beerListMalt.includes(beer);
      });
      setBeerList(updatedBeerList);
    } else if (malt === 'Hop Forward') {
      const updatedBeerList = beerList.filter((beer) => {
        return beerListHoppy.includes(beer);
      });
      setBeerList(updatedBeerList);
    } else if (malt === 'Yeast Forward') {
      const updatedBeerList = beerList.filter((beer) => {
        return beerListYeast.includes(beer);
      });
      setBeerList(updatedBeerList);
    }
  }, [malt]);

  const bodyHandler = (bodyInput: string) => () => {
    if (bodyInput === body) {
      setBody('');
    } else {
      setBody(bodyInput);
    }
  };

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
            <div onClick={beerListHandler(beerListDark)}>
              <Selector name='Dark' />
            </div>
            <div>
              <div onClick={maltHandler('Malt Forward')}>
                <Selector name='Malt Forward' />
              </div>
            </div>
            <div onClick={bodyHandler('Full-Bodied')}>
              <Selector name='Full-Bodied' />
            </div>
          </div>
          {/* Malt character 2 */}
          <div className='flex flex-col'>
            <div onClick={beerListHandler(beerListLight)}>
              <Selector name='Light' />
            </div>
            <div>
              <div onClick={maltHandler('Hop Forward')}>
                <Selector name='Hop Forward' />
              </div>
            </div>
            <div onClick={bodyHandler('Light-Bodied')}>
              <Selector name='Light-Bodied' />
            </div>
          </div>
          <div className='flex flex-col'>
            <div></div>
            <div>
              <div onClick={maltHandler('Yeast Forward')}>
                <Selector name='Yeast Forward' />
              </div>
            </div>
          </div>

          <div className='flex flex-row items-center'>
            {/* Possible Styles */}
            <div className='flex flex-col'>
              {beerList.map((beer) => (
                <div key={beer}>
                  <Selector name={beer} />
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
