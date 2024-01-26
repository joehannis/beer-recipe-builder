import React from 'react';

interface SelectorProps {
  name?: string;
  beer?: object;
  setBeerSelection?: React.Dispatch<React.SetStateAction<string>>;
}

const Selector: React.FC<SelectorProps> = ({
  name,
  beer,
  setBeerSelection,
}) => {
  return (
    <button
      onClick={() => {
        if (setBeerSelection && !name) {
          setBeerSelection((beer as { name: string }).name);
        }
      }}
    >
      {name ? name : (beer as { name: string }).name}
    </button>
  );
};

export default Selector;
