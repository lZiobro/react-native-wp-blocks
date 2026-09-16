import { Text } from 'react-native';
import { type WordPressComponentProps } from '../../types/htmlTypes';
import { useWordPressContext } from '../../context/WordPress';

export const WpButton = ({ children }: WordPressComponentProps) => {
  const { styles } = useWordPressContext();

  return <Text style={styles.WpButton}>{children}</Text>;
};
