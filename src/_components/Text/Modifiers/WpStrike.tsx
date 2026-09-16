import { Text } from 'react-native';
import { useWordPressContext } from '../../../context/WordPress/useWordPressContext';
import { type WordPressComponentProps } from '../../../types/htmlTypes';

export const WpStrike = ({ children }: WordPressComponentProps) => {
  const { styles } = useWordPressContext();

  return <Text style={styles.WpStrike}>{children}</Text>;
};
