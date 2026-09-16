import { createContext } from 'react';

export type ListContextType = {
  isOrdered: boolean;
  startNumber: number;
  total: number;
  //  possible values:
  //  undefined
  //  upper-alpha
  //  lower-alpha
  //  upper-roman
  //  lower-roman
  type?: string;
  className?: string;
  isReversed?: boolean;
};

export const ListContext = createContext<ListContextType | undefined>(
  undefined
);
