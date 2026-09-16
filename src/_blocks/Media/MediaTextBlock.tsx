import { type ReactNode } from 'react';
import { type BlockComponentProps } from '../../types/blockTypes';
import { useWordPressContext } from '../../context/WordPress/useWordPressContext';
import { stripNewLines } from '../../utils/stringUtils';
import { WordPressHtmlSelector } from '../../_components/WordPressHtmlSelector';

export const MediaTextBlock = ({
  children,
  wpBlock,
}: BlockComponentProps): ReactNode => {
  const { primitives, styles } = useWordPressContext();

  const ViewComponent = primitives.View;

  return (
    <ViewComponent style={styles.MediaTextBlock}>
      <WordPressHtmlSelector html={stripNewLines(wpBlock.innerHTML)} />
      {children}
    </ViewComponent>
  );
};
