import {
  StyleSheet,
  type ImageStyle,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import {
  type ThemeKey,
  type WordPressContextTheme,
} from '../context/WordPress/WordPressContext';

export type ReactNativeStyles = ViewStyle & TextStyle & ImageStyle;

// required to not lose ThemeKeys values
// typescript would fold other types into string and "consume" our ThemeKeys in the process
type LooseString = string & { _?: never };

type RefineStyleValue<T> = string extends T
  ? Exclude<T, string> | ThemeKey | LooseString
  : T | ThemeKey;

export type ThemeStyle = {
  [K in keyof ReactNativeStyles]?: RefineStyleValue<ReactNativeStyles[K]>;
};

const isThemeKey = (key: any): key is ThemeKey => {
  // return typeof key === 'string' && ThemeKeys.some((x) => x === key);
  return typeof key === 'string' && key.startsWith('theme.');
};

/**
 * Parses `styles` using `theme` and return a ready-to-use StyleSheet
 *
 * @param styles
 * @param theme
 * @returns {Readonly<Record<string, Record<string, unknown>>>}
 */
export const parseThemeStyles = <T extends Record<string, ThemeStyle>>(
  styles: T,
  theme: WordPressContextTheme
): Readonly<Record<string, Record<string, unknown>>> => {
  const parsedStyles: Record<string, Record<string, unknown>> = {};

  for (const className of Object.keys(styles)) {
    const styleObject = styles[className];
    if (!styleObject) continue;

    const convertedStyles: Record<string, unknown> = {};

    for (const propertyName of Object.keys(styleObject)) {
      const value = styleObject[propertyName as keyof ReactNativeStyles];

      let newValue = value;

      if (isThemeKey(value)) {
        newValue = theme[value];
      }

      // skip if undefined to avoid overwriting e.g. primitive Text textColor
      if (newValue !== undefined) {
        convertedStyles[propertyName] = newValue;
      }
    }

    parsedStyles[className] = convertedStyles;
  }

  return StyleSheet.create(parsedStyles);
};
