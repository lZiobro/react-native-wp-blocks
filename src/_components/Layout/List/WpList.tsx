import { type ReactNode } from 'react';
import { type WordPressComponentProps } from '../../../types/htmlTypes';
import { ListContext } from '../../../context/List/ListContext';
import { useWordPressContext } from '../../../context/WordPress/useWordPressContext';
import { parseInlineStyle } from '../../../utils/htmlUtils';

export const WpList = ({
  children,
  element,
}: WordPressComponentProps): ReactNode => {
  const { primitives, styles } = useWordPressContext();

  const ViewComponent = primitives.View;

  const inlineStyle = parseInlineStyle(element.attribs.style);

  const isOrdered = element.name === 'ol' ? true : false;
  const startNumber =
    element.attribs.start !== undefined ? Number(element.attribs.start) : 1;
  const listType = inlineStyle['list-style-type'];
  const className = element.attribs.class;
  const reversed = element.attribs.reversed === '';
  const total = element.children.length;
  return (
    <ListContext.Provider
      value={{
        isOrdered: isOrdered,
        startNumber: startNumber,
        type: listType,
        className: className,
        isReversed: reversed,
        total: total,
      }}
    >
      <ViewComponent style={styles.WpList}>{children}</ViewComponent>
    </ListContext.Provider>
  );
};
