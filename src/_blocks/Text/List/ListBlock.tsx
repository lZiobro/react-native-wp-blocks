import { type ReactNode } from 'react';
import { type BlockComponentProps } from '../../../types/blockTypes';
import { ListContext } from '../../../context/List/ListContext';
import { useWordPressContext } from '../../../context/WordPress/useWordPressContext';
import { isElement } from '../../../utils/htmlUtils';
import { parseDocument } from 'htmlparser2';
import { WordPressHtmlSelector } from '../../../_components/WordPressHtmlSelector';

export const ListBlock = ({
  children,
  wpBlock,
}: BlockComponentProps): ReactNode => {
  const { primitives, styles } = useWordPressContext();

  const ViewComponent = primitives.View;

  //why do we need 2 cases:
  //there was most likely bug with gutenberg and list items where it wouldnt recognize them properly
  //they look identical in visual editor, but you can see missing tags in code editor
  //either way this is valid and needed
  if (children) {
    const isOrdered = wpBlock.attrs.ordered;
    const startNumber = wpBlock.attrs.start ?? 1;
    const listType = wpBlock.attrs.type;
    const className = wpBlock.attrs.className;
    const reversed = wpBlock.attrs.reversed;
    const total = wpBlock.innerBlocks.length;
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
        <ViewComponent style={styles.ListBlock}>{children}</ViewComponent>
      </ListContext.Provider>
    );
  } else {
    const parsed = parseDocument(wpBlock.innerHTML);
    const isOrdered = wpBlock.attrs.ordered === true;
    const startNumber = wpBlock.attrs.start ?? 1;
    const listType = wpBlock.attrs.type;
    const className = wpBlock.attrs.className;
    const reversed = wpBlock.attrs.reversed;
    const total =
      parsed.children[0] &&
      isElement(parsed.children[0]) &&
      parsed.children[0]?.children.length
        ? parsed.children[0]?.children.length
        : 0;
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
        <ViewComponent style={styles.ListBlock}>
          <WordPressHtmlSelector html={wpBlock.innerHTML} />
        </ViewComponent>
      </ListContext.Provider>
    );
  }
};
