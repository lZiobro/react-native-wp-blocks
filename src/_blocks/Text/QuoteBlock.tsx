import { type ReactNode } from 'react';
import { type BlockComponentProps } from '../../types/blockTypes';
import { useWordPressContext } from '../../context/WordPress/useWordPressContext';
import { WordPressHtmlSelector } from '../../_components/WordPressHtmlSelector';

export const QuoteBlock = ({
  children,
  wpBlock,
}: BlockComponentProps): ReactNode => {
  const { primitives, styles } = useWordPressContext();

  const ViewComponent = primitives.View;

  if (children) {
    return <ViewComponent style={styles.QuoteBlock}>{children}</ViewComponent>;
  } else {
    return (
      <ViewComponent style={styles.QuoteBlock}>
        <WordPressHtmlSelector html={wpBlock.innerHTML} />
      </ViewComponent>
    );
  }
};
