import React from 'react';

interface SelectorProps {
  name?: string;
  beer?: object;
}

const Selector: React.FC<SelectorProps> = ({ name, beer }) => {
  return <button>{name ? name : (beer as { name: string }).name}</button>;
};

export default Selector;
