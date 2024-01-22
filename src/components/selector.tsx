import React from 'react';
import { useState } from 'react';

interface SelectorProps {
  name: string;
}

const Selector: React.FC<SelectorProps> = ({ name }) => {
  const [selected, setSelected] = useState(false);
  return (
    <button
      onClick={() => setSelected(!selected)}
      className={`flex justify-center rounded-none border-2 border-solid border-black ${selected ? 'bg-red-600 hover:bg-white hover:text-red-600' : 'bg-white hover:bg-red-600 hover:text-white'}`}
    >
      {name}
    </button>
  );
};

export default Selector;
