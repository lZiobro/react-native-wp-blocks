import { useWordPressContext } from '../../context/WordPress/useWordPressContext';
import { type WordPressComponentProps } from '../../types/htmlTypes';

export const WpText = ({ children, element }: WordPressComponentProps) => {
  const { primitives, styles, parseStyles } = useWordPressContext();

  const TextComponent = primitives.Text;
  const htmlStyles = parseStyles(element);

  return (
    <TextComponent style={[styles.WpText, htmlStyles]}>
      {children}
    </TextComponent>
  );
};
