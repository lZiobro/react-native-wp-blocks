import { useContext } from 'react';
import { AccordionContext } from './AccordionContext';

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);

  if (context === undefined) {
    throw new Error('AccordionContext consumed without Provider.');
  }

  return context;
};
