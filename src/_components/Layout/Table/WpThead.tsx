import { useWordPressContext } from '../../../context/WordPress/useWordPressContext';
import { type WordPressComponentProps } from '../../../types/htmlTypes';

export const WpThead = ({ children }: WordPressComponentProps) => {
  const { primitives, styles } = useWordPressContext();

  const ViewComponent = primitives.View;

  return <ViewComponent style={styles.WpThead}>{children}</ViewComponent>;
};
