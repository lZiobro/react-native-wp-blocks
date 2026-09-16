import { useWordPressContext } from '../../context/WordPress/useWordPressContext';

export const WpHr = () => {
  const { primitives, styles } = useWordPressContext();

  const ViewComponent = primitives.View;

  return <ViewComponent style={styles.WpHr} />;
};
