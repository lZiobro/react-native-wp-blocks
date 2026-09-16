import { type WordPressComponentProps } from '../../../types/htmlTypes';
import { useWordPressContext } from '../../../context/WordPress/useWordPressContext';

export const WpTh = ({ children }: WordPressComponentProps) => {
  const { primitives, styles } = useWordPressContext();

  const ViewComponent = primitives.View;

  return <ViewComponent style={styles.WpTh}>{children}</ViewComponent>;
};
