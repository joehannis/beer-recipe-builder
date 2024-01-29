interface Beer {
  name: string;
  malt: string;
  body: string;
  balance: string;
}

const updateBeerList = (
  beerList: Beer[],
  setBeerListUpdate: React.Dispatch<React.SetStateAction<Beer[]>>,
  malt: string,
  balance: string,
  body: string
) => {
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
};

export default updateBeerList;
