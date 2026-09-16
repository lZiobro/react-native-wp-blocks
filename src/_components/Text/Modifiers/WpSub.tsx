import { type WordPressComponentProps } from '../../../types/htmlTypes';
import { View } from 'react-native';
import { useWordPressContext } from '../../../context/WordPress/useWordPressContext';

export const WpSub = ({ children }: WordPressComponentProps) => {
  const { primitives, styles } = useWordPressContext();

  const TextComponent = primitives.Text;

  return (
    <View style={styles.WpSub}>
      <TextComponent style={styles.WpSubText}>{children}</TextComponent>
    </View>
  );
};
