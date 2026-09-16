import { useWordPressContext } from '../../context/WordPress/useWordPressContext';

//uses TextComponent to simulate appropriate height
export const WpBr = () => {
  const { primitives, styles } = useWordPressContext();

  const TextComponent = primitives.Text;

  return <TextComponent style={styles.WpBr}>{'\n'}</TextComponent>;
};
