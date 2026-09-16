import { type ReactNode } from 'react';
import { type BlockComponentProps } from '../../types/blockTypes';
import { useWordPressContext } from '../../context/WordPress/useWordPressContext';
import { WordPressHtmlSelector } from '../../_components/WordPressHtmlSelector';

export const StandardHtmlBlock = ({
  wpBlock,
}: BlockComponentProps): ReactNode => {
  const { primitives, styles } = useWordPressContext();

  const ViewComponent = primitives.View;

  return (
    <ViewComponent style={styles.StandardHTMLBlock}>
      <WordPressHtmlSelector html={wpBlock.innerHTML} />
    </ViewComponent>
  );
};
