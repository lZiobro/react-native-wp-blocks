import { Text } from 'react-native';
import { useWordPressContext } from '../../context/WordPress/useWordPressContext';
import { type WordPressComponentProps } from '../../types/htmlTypes';

//caption for pullquote
export const WpCite = ({ children }: WordPressComponentProps) => {
  const { styles } = useWordPressContext();

  return <Text style={styles.WpCite}>{children}</Text>;
};
