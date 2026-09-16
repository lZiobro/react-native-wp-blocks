import { type WordPressComponentProps } from '../../../types/htmlTypes';
import { useMemo } from 'react';
import { useWordPressContext } from '../../../context/WordPress/useWordPressContext';
import { parseInlineStyle } from '../../../utils/htmlUtils';
import { Text } from 'react-native';

//uses base Text to not overwrite any styles from parent containers
export const WpMark = ({ element, children }: WordPressComponentProps) => {
  const { styles } = useWordPressContext();

  const foregroundColor = useMemo(() => {
    if (!element.attribs || !element.attribs.style) {
      return undefined;
    }

    const parsedStyles = parseInlineStyle(element.attribs.style);

    return parsedStyles.color || undefined;
  }, [element]);

  return (
    <Text
      style={[foregroundColor ? { color: foregroundColor } : {}, styles.WpMark]}
    >
      {children}
    </Text>
  );
};
