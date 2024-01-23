import { useState } from 'react';

import Selector from './components/Selector';
import beerListLight from './components/beerListLight';
import beerListDark from './components/beerListDark';

function App() {
  const [beerList, setBeerList] = useState<string[]>([]);
  const [malt, setMalt] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [body, setBody] = useState<string>('');

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

 const balanceHandler = (balanceInput: string) => () => {
    if (balanceInput === balance) {
      setBalance('');
    } else {
      setBalance(balanceInput);
    }
  };

 const bodyHandler = (bodyInput: string) => () => {
    if (bodyInput === body) {
      setBody('');
    } else {
      setBodt(bodyInput);
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
            <div onClick={balanceHandler('Hoppy')}>
              <Selector name='Hoppy' />
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
              <div onClick={maltHandler('Malt Light')}>
                <Selector name='Malt Light' />
              </div>
            </div>
            <div onClick={balanceHandler('Balanced')}>
              <Selector name='Balanced' />
            </div>
            <div onClick={bodyHandler('Light-Bodied')}>
              <Selector name='Light-Bodied' />
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
