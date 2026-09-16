import { useContext } from 'react';
import { WordPressContext } from './WordPressContext';

export const useWordPressContext = () => {
  const context = useContext(WordPressContext);

  if (context === undefined) {
    throw new Error('WordpressContext consumed without Provider.');
  }

  return context;
};
