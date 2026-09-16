import type { WordPressComponentProps } from '../../types/htmlTypes';
import { WP_TEXT_CLASSES } from '../../context/WordPress/WordPressContext';
import { useWordPressContext } from '../../context/WordPress/useWordPressContext';

const HEADERS = {
  h1: 'WpH1',
  h2: 'WpH2',
  h3: 'WpH3',
  h4: 'WpH4',
  h5: 'WpH5',
  h6: 'WpH6',
} satisfies Record<string, (typeof WP_TEXT_CLASSES)[number]>;

export const WpHeader = ({
  children,
  additionalProps,
}: WordPressComponentProps) => {
  const { primitives, styles } = useWordPressContext();

  const TextComponent = primitives.Text;

  const variant =
    typeof additionalProps?.headerVariant === 'string' &&
    additionalProps.headerVariant in HEADERS
      ? HEADERS[additionalProps.headerVariant as keyof typeof HEADERS]
      : HEADERS.h1;

  return <TextComponent style={styles[`${variant}`]}>{children}</TextComponent>;
};
