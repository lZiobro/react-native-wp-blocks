import { type ReactNode, useState } from 'react';
import { type BlockComponentProps } from '../../types/blockTypes';
import { useWordPressContext } from '../../context/WordPress/useWordPressContext';
import { WordPressHtmlSelector } from '../../_components/WordPressHtmlSelector';

export const DetailsBlock = ({
  children,
  wpBlock,
}: BlockComponentProps): ReactNode => {
  const { primitives, styles } = useWordPressContext();

  const TextComponent = primitives.Text;
  const ViewComponent = primitives.View;

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const showDetails = () => {
    setIsExpanded((x) => !x);
  };

  return (
    <ViewComponent style={styles.DetailsBlock}>
      <TextComponent onPress={showDetails}>
        {isExpanded ? '▼' : '▶'}
        <WordPressHtmlSelector html={wpBlock.innerHTML} />
      </TextComponent>
      {isExpanded && (
        <ViewComponent style={styles.DetailsContent}>{children}</ViewComponent>
      )}
    </ViewComponent>
  );
};
