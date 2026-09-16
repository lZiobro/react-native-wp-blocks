import { useWordPressContext } from '../../../context/WordPress/useWordPressContext';
import { type WordPressComponentProps } from '../../../types/htmlTypes';

export const WpTbody = ({ children }: WordPressComponentProps) => {
  const { primitives, styles } = useWordPressContext();

  const ViewComponent = primitives.View;

  return <ViewComponent style={styles.WpTbody}>{children}</ViewComponent>;
};
