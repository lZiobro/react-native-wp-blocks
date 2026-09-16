import { View } from 'react-native';
import { useWordPressContext } from '../../context/WordPress/useWordPressContext';

export const SpacerBlock = () => {
  const { styles } = useWordPressContext();

  return <View style={styles.SpacerBlock} />;
};
