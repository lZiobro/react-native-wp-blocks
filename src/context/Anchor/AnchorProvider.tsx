import type { WordPressComponentProps } from '../../types';
import { AnchorContext } from './AnchorContext';

export const AnchorProvider = ({
  element,
  children,
}: WordPressComponentProps) => {
  const href = element.attribs?.href;
  return (
    <AnchorContext.Provider value={{ href: href ?? '' }}>
      {children}
    </AnchorContext.Provider>
  );
};
