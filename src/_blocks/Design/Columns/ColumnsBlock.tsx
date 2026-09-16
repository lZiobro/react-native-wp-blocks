import { useWordPressContext } from '../../../context/WordPress/useWordPressContext';
import type { BlockComponentProps } from '../../../types/blockTypes';

export const ColumnsBlock = ({ children }: BlockComponentProps) => {
  const { primitives, styles } = useWordPressContext();

  const ViewComponent = primitives.View;

  return <ViewComponent style={styles.ColumnsBlock}>{children}</ViewComponent>;
};
