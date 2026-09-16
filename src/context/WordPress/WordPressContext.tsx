import { createContext } from 'react';
import {
  type ImageProps,
  type TextProps,
  type TextStyle,
  type ViewProps,
  type ViewStyle,
} from 'react-native';
import { type WordPressComponentProps } from '../../types/htmlTypes';
import { type BlockComponentProps } from '../../types/blockTypes';
import { WordPressBlockName } from '../../types/blockTypes';
import type { ColorValue, DimensionValue } from 'react-native';
import type {
  ReactNativeStyles,
  ThemeStyle,
} from '../../styles/parseThemeStyles';
import type { Element } from 'domhandler';

export type WordPressContextPrimitives = {
  Text: React.ComponentType<TextProps>;
  View: React.ComponentType<ViewProps>;
  Image: React.ComponentType<ImageProps>;
};

export const ThemeKeys = [
  'theme.text_color',
  'theme.link_color',
  'theme.border_color',
  'theme.background_accent_1',
  'theme.background_accent_2',
  'theme.border_small',
  'theme.border_medium',
  'theme.margin_xs',
  'theme.margin_small',
  'theme.margin_medium',
  'theme.margin_large',
  'theme.padding_xxs',
  'theme.padding_xs',
  'theme.font_xs',
  'theme.font_small',
  'theme.font_sm',
  'theme.font_medium',
  'theme.font_large',
  'theme.font_xl',
] as const;

export type ThemeKey = (typeof ThemeKeys)[number];

export type WordPressContextTheme =
  | {
      [K in ThemeKey]?: K extends
        `theme.${string}_color` | `theme.${string}_accent_${string}`
        ? ColorValue
        : K extends `theme.font_${string}`
          ? number // font only allows numbers
          : DimensionValue;
    }
  | { [key: `theme.${string}`]: ColorValue | DimensionValue | number | string };

export type WordPressProviderConfig = {
  /**
   * There is additional singular newlines outside of tags, that gets parsed by htmlparser2 into a tag without name, but with value of `\n`.
   * This flag is used to skip them, but may also cause other side-effects.
   */
  skipSingularNewLines: boolean;
  /** Whether to display error messages for missing blocks or silently dispose of them. */
  showMissingBlockErrors: boolean;
  /** Whether to display error messages for missing html renderers or silently dispose of them. */
  showMissingHtmlRendererErrors: boolean;
  /**
   * extremely rare case where for whatever reason node has no name and no value (most likely wrong object/error within domhandler if even).
   *
   * (leave empty to hide any errors regarding this)
   */
  htmlFallbackErrorMessage: string;
  /** Missing image error message (leave empty to hide any errors). */
  imgErrorMessage: string;
};

export const WP_TEXT_CLASSES = [
  'WpAnchor',
  'WpBlockquote',
  'WpCite',
  'WpCode',
  'WpFigcaption',
  'WpH1',
  'WpH2',
  'WpH3',
  'WpH4',
  'WpH5',
  'WpH6',
  'WpPre',
  'WpText',
  'WpSpan',
  'WpSub',
  'WpSubText',
  'WpSup',
  'WpSupText',
] as const;

export const WP_TEXT_MODIFIERS_CLASSES = [
  'WpEm',
  'WpMark',
  'WpStrike',
  'WpStrong',
] as const;

export const WP_LIST_CLASSES = [
  'WpLi',
  'WpLiInner',
  'WpList',
  'WpStrike',
  'WpStrong',
] as const;

export const WP_LAYOUT_CLASSES = ['WpHr', 'WpCenter', 'WpBr'] as const;

export const WP_TABLE_CLASSES = [
  'WpTable',
  'WpTbody',
  'WpTd',
  'WpTdText',
  'WpTfoot',
  'WpTh',
  'WpThText',
  'WpThead',
  'WpTr',
] as const;

export const WP_COMMON_CLASSES = [
  'WpButton',
  'WpImgError',
  'WpImgWrapper',
  'WpImg',
] as const;

export const WP_CLASSES = [
  ...WP_TEXT_CLASSES,
  ...WP_TEXT_MODIFIERS_CLASSES,
  ...WP_LIST_CLASSES,
  ...WP_LAYOUT_CLASSES,
  ...WP_TABLE_CLASSES,
  ...WP_COMMON_CLASSES,
] as const;

export const BLOCK_COMMON_CLASSES = [
  'StandardHTMLBlock', //common block
  'NestedHTMLBlock', //common block
  'ClassicEditorBlock', //specific? block
  'QuoteBlock',
  'MediaTextBlock',
  'FootnotesBlock',
  'DetailsBlock',
  'DetailsContent',
  'CoverBlock',
  'CoverBlockBackgroundImage',
  'CoverBlockContentWrapper',
  'ButtonsBlock',
  'ButtonBlock',
] as const;

export const BLOCK_LIST_CLASSES = [
  'ListBlock',
  'ListItemBlock',
  'ListItemBlockNested',
] as const;

export const BLOCK_DESIGN_CLASSES = [
  'SpacerBlock',
  'SeparatorBlock',
  'GroupBlock',
  'GroupGridRow',
  'GroupGridColumn',
  'GroupGridPlaceholder',
  'GroupFlexItem',
  'ColumnsBlock',
  'ColumnBlock',
] as const;

export const BLOCK_ACCORDION_CLASSES = [
  'AccordionItemBlock',
  'AccordionItemContent',
  'AccordionHeadingIcon',
  'AccordionHeadingBlock',
] as const;

export const BLOCK_CLASSES = [
  ...BLOCK_COMMON_CLASSES,
  ...BLOCK_LIST_CLASSES,
  ...BLOCK_DESIGN_CLASSES,
  ...BLOCK_ACCORDION_CLASSES,
] as const;

export type WordPressStylesKey =
  (typeof WP_CLASSES)[number] | (typeof BLOCK_CLASSES)[number] | (string & {});

export type WordPressStyles = Record<WordPressStylesKey, ThemeStyle>;

export type WordPressContextType = {
  /** Alternative primitive Components to be used inplace of regular ones. Useful for things like StyledText. */
  primitives: WordPressContextPrimitives;
  /** Optional theme values overrides if you dont like for example paddings widths.
   *
   * **Note:** you will most likely need to adjust `theme.border_color` `theme.link_color` `background_accent_1` and `background_accent_2` according to your app theme.
   */
  theme: WordPressContextTheme;
  /** Lookup table for gutneberg blocks. Docs: {@link https://developer.wordpress.org/block-editor/reference-guides/core-blocks/} */
  blocks: Record<
    string | WordPressBlockName,
    React.ComponentType<BlockComponentProps>
  >;
  /** Lookup table for html elements. */
  htmlRenderers: Record<string, React.ComponentType<WordPressComponentProps>>;
  /** Refer to {@link WordPressProviderConfig} */
  config: WordPressProviderConfig;
  /** Styles overrides if you feel like swapping out whole components is too much. Provides tooltips for classes and theme values. */
  styles: Readonly<
    Record<
      | (typeof WP_CLASSES)[number]
      | (typeof BLOCK_CLASSES)[number]
      | (string & {}),
      ReactNativeStyles
    >
  >;
  parseStyles: (
    node: Pick<Element, 'name' | 'attribs'>
  ) => TextStyle & ViewStyle;
};

export const WordPressContext = createContext<WordPressContextType | undefined>(
  undefined
);
