import { View } from 'react-native';
import { useWordPressContext } from '../../context/WordPress/useWordPressContext';

export const SeparatorBlock = () => {
  const { styles } = useWordPressContext();

  return <View style={styles.SeparatorBlock} />;
};
