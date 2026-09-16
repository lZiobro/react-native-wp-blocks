import { useWordPressContext } from '../../context/WordPress/useWordPressContext';
import { type WordPressComponentProps } from '../../types/htmlTypes';
import { Linking, Text } from 'react-native';

export const WpAnchor = ({ children, element }: WordPressComponentProps) => {
  const { styles } = useWordPressContext();

  return (
    <Text
      onPress={() => {
        if (element.attribs.href && element.attribs.href !== '')
          Linking.openURL(element.attribs?.href);
      }}
      accessibilityRole="link"
      style={styles.WpAnchor}
    >
      {children}
    </Text>
  );
};
