import { useWordPressContext } from '../../context/WordPress/useWordPressContext';
import { type WordPressComponentProps } from '../../types/htmlTypes';

export const WpFigcaption = ({ children }: WordPressComponentProps) => {
  const { primitives, styles } = useWordPressContext();

  const TextComponent = primitives.Text;

  return <TextComponent style={styles.WpFigcaption}>{children}</TextComponent>;
};
