import { type WordPressComponentProps } from '../../../types/htmlTypes';
import { useWordPressContext } from '../../../context/WordPress/useWordPressContext';
import { Text } from 'react-native';

export const WpStrong = ({ children }: WordPressComponentProps) => {
  const { styles } = useWordPressContext();

  return <Text style={styles.WpStrong}>{children}</Text>;
};
