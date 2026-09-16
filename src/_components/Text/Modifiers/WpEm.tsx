import { Text } from 'react-native';
import { useWordPressContext } from '../../../context/WordPress/useWordPressContext';
import { type WordPressComponentProps } from '../../../types/htmlTypes';

export const WpEm = ({ children }: WordPressComponentProps) => {
  const { styles } = useWordPressContext();

  return <Text style={styles.WpEm}>{children}</Text>;
};
