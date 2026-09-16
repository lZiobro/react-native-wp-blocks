import { type WordPressComponentProps } from '../../../types/htmlTypes';
import { View } from 'react-native';
import { useWordPressContext } from '../../../context/WordPress/useWordPressContext';

//TODO: doesnt support scrolling to footnotes component (more like a WpAnchor issue?)
export const WpSup = ({ children }: WordPressComponentProps) => {
  const { primitives, styles } = useWordPressContext();

  const TextComponent = primitives.Text;

  return (
    <View style={styles.WpSup}>
      <TextComponent style={styles.WpSupText}>{children}</TextComponent>
    </View>
  );
};
