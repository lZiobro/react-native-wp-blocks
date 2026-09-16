import { type ReactNode } from 'react';
import { type BlockComponentProps } from '../../../types/blockTypes';
import { useWordPressContext } from '../../../context/WordPress/useWordPressContext';
import { useListContext } from '../../../context/List';
import { WordPressHtmlSelector } from '../../../_components/WordPressHtmlSelector';

export const ListItemBlock = ({
  wpBlock,
  children,
  index,
}: BlockComponentProps): ReactNode => {
  const { primitives, styles } = useWordPressContext();

  const ViewComponent = primitives.View;

  const { isOrdered } = useListContext();

  const listItemIndex = index;

  const listItemParams = isOrdered ? { listIndex: listItemIndex } : {};

  return (
    <ViewComponent style={styles.ListItemBlock}>
      {/* This is list items */}
      <WordPressHtmlSelector
        html={wpBlock.innerHTML}
        additionalProps={listItemParams}
      />
      {/* And this is nested lists */}
      {children && (
        <ViewComponent style={styles.ListItemBlockNested}>
          {children}
        </ViewComponent>
      )}
    </ViewComponent>
  );
};
