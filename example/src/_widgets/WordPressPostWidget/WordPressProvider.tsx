import React, { type ReactNode } from 'react';
import { StyledText } from '../../_common/ui/StyledText';
import {
  type BlockComponentProps,
  WordPressBlockName,
  type WordPressComponentProps,
  type WordPressContextPrimitives,
  type WordPressContextTheme,
  WordPressProvider as Provider,
} from 'react-native-wp-blocks';

const htmlRenderers: Record<
  string,
  React.ComponentType<WordPressComponentProps>
> = {
  bdo: () => <React.Fragment />,
  math: () => <React.Fragment />,
};

const wpBlockComponents: Record<
  string | WordPressBlockName,
  ({ children, wpBlock }: BlockComponentProps) => ReactNode
> = {
  'core/math': () => <React.Fragment />,
};

const wpTheme: WordPressContextTheme = {
  // 'theme.text_color': 'white', // no need to set the color here if you have provided Text primitive
  'theme.border_color': 'white',
  'theme.link_color': 'red',
};

const primitives: Partial<WordPressContextPrimitives> = {
  Text: StyledText,
};

export const WordPressProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider
      primitives={primitives}
      blocks={wpBlockComponents}
      htmlRenderers={htmlRenderers}
      theme={wpTheme}
    >
      {children}
    </Provider>
  );
};
