import React from 'react';

interface SelectorProps {
  name: string;
}

const Selector: React.FC<SelectorProps> = ({ name }) => {
  return <button>{name}</button>;
};

export default Selector;
