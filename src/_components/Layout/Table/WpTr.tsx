import { useWordPressContext } from '../../../context/WordPress/useWordPressContext';
import { type WordPressComponentProps } from '../../../types/htmlTypes';

export const WpTr = ({ children }: WordPressComponentProps) => {
  const { primitives, styles } = useWordPressContext();

  const ViewComponent = primitives.View;

  return <ViewComponent style={styles.WpTr}>{children}</ViewComponent>;
};
