import { useRef, useEffect } from 'react';
import Selector from './Selector';
import beerList from './beerList';
import updateBeerList from './updateBeerList';

interface Beer {
  name: string;
  malt: string;
  body: string;
  balance: string;
}

interface OptionsMenuProps {
  setBeerListUpdate: React.Dispatch<React.SetStateAction<Beer[]>>;
  malt: string;
  setMalt: React.Dispatch<React.SetStateAction<string>>;
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  balance: string;
  setBalance: React.Dispatch<React.SetStateAction<string>>;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({
  setBeerListUpdate,
  malt,
  setMalt,
  body,
  setBody,
  balance,
  setBalance,
}) => {
  useEffect(() => {
    updateBeerList(beerList, setBeerListUpdate, malt, balance, body);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [malt, balance, body]);

  const unselected: string =
    'p-8 flex justify-center rounded-none border-2 border-solid border-black bg-white hover:bg-red-600 hover:text-white';
  const selected: string =
    'p-8 flex justify-center rounded-none border-2 border-solid border-black bg-red-600 hover:bg-white hover:text-red-600';

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
    <div className='mt-20 grid grid-cols-6 grid-rows-3 gap-1'>
      <div className='col-span-3 col-start-1 row-start-1'>
        <div className={transformDark} onClick={maltHandler('Dark')}>
          <Selector name='Dark' />
        </div>
      </div>
      <div className='col-span-2 col-start-1 row-start-2'>
        <div
          className={transformMaltForward === selected ? selected : unselected}
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
  );
};
export default OptionsMenu;
