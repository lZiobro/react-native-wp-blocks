import { createContext } from 'react';

export type AnchorContextType = {
  href: string;
};

export const AnchorContext = createContext<AnchorContextType | undefined>(
  undefined
);
