import { useContext } from 'react';
import { ListContext } from './ListContext';

export const useListContext = () => {
  const context = useContext(ListContext);

  if (context === undefined) {
    throw new Error('ListContext consumed without Provider.');
  }

  return context;
};
