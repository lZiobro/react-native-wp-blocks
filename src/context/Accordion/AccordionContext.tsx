import { createContext } from 'react';

export type AccordionContextType = {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);
