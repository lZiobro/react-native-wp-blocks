import { type ReactNode } from 'react';
import { type BlockComponentProps } from '../../types/blockTypes';
import { useWordPressContext } from '../../context/WordPress/useWordPressContext';

export const FootnotesBlock = ({ wpBlock }: BlockComponentProps): ReactNode => {
  const { primitives, styles } = useWordPressContext();

  const TextComponent = primitives.Text;
  const ViewComponent = primitives.View;

  const items: { content: string; id: string }[] = wpBlock.attrs?.items ?? [];

  return (
    <ViewComponent style={styles.FootnotesBlock}>
      {items.map((item, index) => (
        <TextComponent key={item.id}>
          {index + 1}. {item.content}
        </TextComponent>
      ))}
    </ViewComponent>
  );
};
